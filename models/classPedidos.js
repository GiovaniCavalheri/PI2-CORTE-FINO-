const Database = require("../database/database");

//status inicial: o pagamento e feito na entrega
const STATUS_INICIAL = "Aguardando Separação";

//TIPO_PEDIDO e um enum ('Bovino','Suino','Ave','Kit'): converte o nome da categoria
function tipoDaCategoria(nomeCategoria) {
  const nome = String(nomeCategoria || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (nome.startsWith("bovin")) return "Bovino";
  if (nome.startsWith("suin")) return "Suino";
  if (nome.startsWith("ave")) return "Ave";
  return "Kit";
}

function erroEstoque(idProduto) {
  const erro = new Error("Estoque insuficiente");
  erro.code = "ESTOQUE_INSUFICIENTE";
  erro.idProduto = idProduto;
  return erro;
}

class Pedidos {
  #id;
  #idCliente;
  #valorPedido;
  #dataPedido;
  #tipoPedido;
  #statusPedido;

  constructor(
    id,
    idCliente,
    valorPedido,
    dataPedido,
    tipoPedido,
    statusPedido,
  ) {
    this.#id = id;
    this.#idCliente = idCliente;
    this.#valorPedido = valorPedido;
    this.#dataPedido = dataPedido;
    this.#tipoPedido = tipoPedido;
    this.#statusPedido = statusPedido;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get idCliente() {
    return this.#idCliente;
  }
  set idCliente(valor) {
    this.#idCliente = valor;
  }

  get valorPedido() {
    return this.#valorPedido;
  }
  set valorPedido(valor) {
    this.#valorPedido = valor;
  }

  get dataPedido() {
    return this.#dataPedido;
  }
  set dataPedido(valor) {
    this.#dataPedido = valor;
  }

  get tipoPedido() {
    return this.#tipoPedido;
  }
  set tipoPedido(valor) {
    this.#tipoPedido = valor;
  }

  get statusPedido() {
    return this.#statusPedido;
  }
  set statusPedido(valor) {
    this.#statusPedido = valor;
  }

  async cadastrar() {
    let sql =
      "insert into PEDIDOS (ID_CLIENTE, VALOR_PEDIDO, TIPO_PEDIDO, STATUS_PEDIDO) values (?,?,?,?)";
    let valores = [
      this.#idCliente,
      this.#valorPedido,
      this.#tipoPedido,
      this.#statusPedido,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  //finaliza o pedido do carrinho numa transacao (tudo ou nada):
  //confere e baixa o estoque, grava PEDIDOS e ITENS_PEDIDOS.
  //itens: [{ idProduto, quantidade }] (sem produto repetido)
  async finalizar(idCliente, itens) {
    let banco = new Database();
    try {
      return await banco.ExecutaTransacao(async (executar) => {
        //"for update" trava as linhas dos produtos ate o fim da transacao
        let produtos = await executar(
          "select p.ID_PRODUTO, p.PRECO_VENDA, p.QNT_ESTOQUE, c.NOME_CATEGORIA " +
            "from PRODUTOS p inner join CATEGORIAS_PRODUTO c on c.ID_CATEGORIA = p.ID_CATEGORIA " +
            "where p.ID_PRODUTO in (?) for update",
          [itens.map((item) => item.idProduto)],
        );
        let porId = new Map(produtos.map((p) => [p.ID_PRODUTO, p]));

        //valor calculado com o preco do banco (em centavos para nao perder precisao)
        let centavos = 0;
        let tipos = new Set();
        for (let item of itens) {
          let produto = porId.get(item.idProduto);
          if (!produto || produto.QNT_ESTOQUE < item.quantidade) {
            throw erroEstoque(item.idProduto);
          }
          centavos += Math.round(Number(produto.PRECO_VENDA) * 100) * item.quantidade;
          tipos.add(tipoDaCategoria(produto.NOME_CATEGORIA));
        }
        //pedido com tipos diferentes de carne e registrado como Kit
        let tipo = tipos.size === 1 ? [...tipos][0] : "Kit";
        let valor = centavos / 100;

        for (let item of itens) {
          await executar(
            "update PRODUTOS set QNT_ESTOQUE = QNT_ESTOQUE - ? where ID_PRODUTO = ?",
            [item.quantidade, item.idProduto],
          );
        }

        let pedido = await executar(
          "insert into PEDIDOS (ID_CLIENTE, VALOR_PEDIDO, TIPO_PEDIDO, STATUS_PEDIDO) values (?,?,?,?)",
          [idCliente, valor, tipo, STATUS_INICIAL],
        );
        for (let item of itens) {
          await executar(
            "insert into ITENS_PEDIDOS (ID_PRODUTO, ID_PEDIDO, QNT_PEDIDO) values (?,?,?)",
            [item.idProduto, pedido.insertId, item.quantidade],
          );
        }

        return { ok: true, idPedido: pedido.insertId, valor, tipo };
      });
    } catch (erro) {
      if (erro.code === "ESTOQUE_INSUFICIENTE") {
        return { ok: false, idProduto: erro.idProduto };
      }
      throw erro;
    }
  }

  //pedidos com o nome do cliente e os itens (nome do produto e quantidade)
  async listarDetalhado() {
    let banco = new Database();
    let pedidos = await banco.ExecutaComando(
      "select p.ID_PEDIDO, p.ID_CLIENTE, c.NOME_CLIENTE, p.VALOR_PEDIDO, p.DATA_PEDIDO, " +
        "p.TIPO_PEDIDO, p.STATUS_PEDIDO " +
        "from PEDIDOS p inner join CLIENTE c on c.ID_CLIENTE = p.ID_CLIENTE " +
        "order by p.ID_PEDIDO desc",
    );
    let itens = await banco.ExecutaComando(
      "select i.ID_PEDIDO, i.ID_PRODUTO, pr.NOME_PRODUTO, i.QNT_PEDIDO " +
        "from ITENS_PEDIDOS i inner join PRODUTOS pr on pr.ID_PRODUTO = i.ID_PRODUTO",
    );

    return pedidos.map((pedido) => ({
      ...pedido,
      ITENS: itens.filter((item) => item.ID_PEDIDO === pedido.ID_PEDIDO),
    }));
  }

  async excluir(id) {
    let sql = "delete from PEDIDOS where ID_PEDIDO = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from PEDIDOS";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let pedido = new Pedidos(
        linha["ID_PEDIDO"],
        linha["ID_CLIENTE"],
        linha["VALOR_PEDIDO"],
        linha["DATA_PEDIDO"],
        linha["TIPO_PEDIDO"],
        linha["STATUS_PEDIDO"],
      );

      lista.push(pedido);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update PEDIDOS set ID_CLIENTE = ?, VALOR_PEDIDO = ?, DATA_PEDIDO = ?, TIPO_PEDIDO = ?, STATUS_PEDIDO = ? where ID_PEDIDO = ?";
    let valores = [
      this.#idCliente,
      this.#valorPedido,
      this.#dataPedido,
      this.#tipoPedido,
      this.#statusPedido,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Pedidos;
