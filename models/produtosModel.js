const Database = require("../database/database");

class Produtos {
  #id;
  #idCategoria;
  #idMarca;
  #nomeProduto;
  #descricaoProduto;
  #precoVenda;
  #qntEstoque;

  constructor(
    id,
    idCategoria,
    idMarca,
    nomeProduto,
    descricaoProduto,
    precoVenda,
    qntEstoque,
  ) {
    this.#id = id;
    this.#idCategoria = idCategoria;
    this.#idMarca = idMarca;
    this.#nomeProduto = nomeProduto;
    this.#descricaoProduto = descricaoProduto;
    this.#precoVenda = precoVenda;
    this.#qntEstoque = qntEstoque;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get idCategoria() {
    return this.#idCategoria;
  }
  set idCategoria(valor) {
    this.#idCategoria = valor;
  }

  get idMarca() {
    return this.#idMarca;
  }
  set idMarca(valor) {
    this.#idMarca = valor;
  }

  get nomeProduto() {
    return this.#nomeProduto;
  }
  set nomeProduto(valor) {
    this.#nomeProduto = valor;
  }

  get descricaoProduto() {
    return this.#descricaoProduto;
  }
  set descricaoProduto(valor) {
    this.#descricaoProduto = valor;
  }

  get precoVenda() {
    return this.#precoVenda;
  }
  set precoVenda(valor) {
    this.#precoVenda = valor;
  }

  get qntEstoque() {
    return this.#qntEstoque;
  }
  set qntEstoque(valor) {
    this.#qntEstoque = valor;
  }

  async cadastrar() {
    let sql =
      "insert into PRODUTOS (ID_CATEGORIA, ID_MARCA, NOME_PRODUTO, DESCRICAO, PRECO_VENDA, QNT_ESTOQUE) values (?,?,?,?,?,?)";
    let valores = [
      this.#idCategoria,
      this.#idMarca,
      this.#nomeProduto,
      this.#descricaoProduto,
      this.#precoVenda,
      this.#qntEstoque,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from PRODUTOS where ID_PRODUTO = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from PRODUTOS";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let produto = new Produtos(
        linha["ID_PRODUTO"],
        linha["ID_CATEGORIA"],
        linha["ID_MARCA"],
        linha["NOME_PRODUTO"],
        linha["DESCRICAO"],
        linha["PRECO_VENDA"],
        linha["QNT_ESTOQUE"],
      );

      lista.push(produto);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update PRODUTOS set ID_CATEGORIA = ?, ID_MARCA = ?, NOME_PRODUTO = ?, DESCRICAO = ?, PRECO_VENDA = ?, QNT_ESTOQUE = ? where ID_PRODUTO = ?";
    let valores = [
      this.#idCategoria,
      this.#idMarca,
      this.#nomeProduto,
      this.#descricaoProduto,
      this.#precoVenda,
      this.#qntEstoque,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  //listagem com JOIN para trazer o nome da categoria e da marca
  async listarDetalhado() {
    let sql =
      "select p.ID_PRODUTO, p.NOME_PRODUTO, p.DESCRICAO, p.PRECO_VENDA, p.QNT_ESTOQUE, " +
      "p.ID_CATEGORIA, p.ID_MARCA, c.NOME_CATEGORIA, m.NOME_MARCA " +
      "from PRODUTOS p " +
      "inner join CATEGORIAS_PRODUTO c on p.ID_CATEGORIA = c.ID_CATEGORIA " +
      "inner join MARCA m on p.ID_MARCA = m.ID_MARCA";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    return linhas;
  }
}

module.exports = Produtos;
