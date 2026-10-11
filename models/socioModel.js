const Database = require("../database/database");

class Socio {
  #id;
  #dataAdesao;
  #dataVencimento;

  //a senha do socio fica em CLIENTE.SENHA_CLIENTE (ID_SOCIO = ID_CLIENTE)
  constructor(id, dataAdesao, dataVencimento) {
    this.#id = id;
    this.#dataAdesao = dataAdesao;
    this.#dataVencimento = dataVencimento;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get dataAdesao() {
    return this.#dataAdesao;
  }
  set dataAdesao(valor) {
    this.#dataAdesao = valor;
  }

  get dataVencimento() {
    return this.#dataVencimento;
  }
  set dataVencimento(valor) {
    this.#dataVencimento = valor;
  }

  async cadastrar() {
    let sql =
      "insert into SOCIO (ID_SOCIO, DATA_ADESAO, DATA_VENCIMENTO) values (?,?,?)";
    let valores = [this.#id, this.#dataAdesao, this.#dataVencimento];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  //exclui o socio e os dados dele em CLIENTE (ID_SOCIO = ID_CLIENTE) numa transacao.
  //o controller so chama aqui se nao houver pedido em aberto: o historico
  //(pedidos Entregues/Cancelados, itens e entregas) e apagado junto.
  //se algo der errado no meio, nada e apagado
  async excluir(id) {
    let banco = new Database();
    return await banco.ExecutaTransacao(async function (executar) {
      let socio = await executar("delete from SOCIO where ID_SOCIO = ?", [id]);
      if (socio.affectedRows == 0) {
        return false;
      }
      await executar(
        "delete from ENTREGA_PEDIDO where ID_PEDIDO in (select ID_PEDIDO from PEDIDOS where ID_CLIENTE = ?)",
        [id],
      );
      await executar(
        "delete from ITENS_PEDIDOS where ID_PEDIDO in (select ID_PEDIDO from PEDIDOS where ID_CLIENTE = ?)",
        [id],
      );
      await executar("delete from PEDIDOS where ID_CLIENTE = ?", [id]);
      await executar("delete from CLIENTE where ID_CLIENTE = ?", [id]);
      return true;
    });
  }

  async listar() {
    let sql = "select * from SOCIO";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let socio = new Socio(
        linha["ID_SOCIO"],
        linha["DATA_ADESAO"],
        linha["DATA_VENCIMENTO"],
      );

      lista.push(socio);
    }
    return lista;
  }

  //listagem com JOIN para trazer os dados do cliente (ID_SOCIO = ID_CLIENTE)
  async listarDetalhado() {
    let sql =
      "select c.ID_CLIENTE, c.NOME_CLIENTE, c.DATA_NASCIMENTO, c.CPF_CLIENTE, c.RG_CLIENTE, " +
      "c.EMAIL_CLIENTE, c.TELEFONE, c.TEL_COMERCIAL, c.CEP, c.CIDADE, c.ESTADO, c.BAIRRO, " +
      "c.NUMERO, c.COMPLEMENTO, s.DATA_ADESAO, s.DATA_VENCIMENTO " +
      "from SOCIO s " +
      "inner join CLIENTE c on c.ID_CLIENTE = s.ID_SOCIO " +
      "order by c.NOME_CLIENTE";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    return linhas;
  }

  async alterar() {
    let sql =
      "update SOCIO set DATA_ADESAO = ?, DATA_VENCIMENTO = ? where ID_SOCIO = ?";
    let valores = [this.#dataAdesao, this.#dataVencimento, this.#id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Socio;
