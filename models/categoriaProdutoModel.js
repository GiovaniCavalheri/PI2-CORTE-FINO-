const Database = require("../database/database");

class CategoriasProduto {
  #id;
  #nomeCategoria;
  #descricao;

  constructor(id, nomeCategoria, descricao) {
    this.#id = id;
    this.#nomeCategoria = nomeCategoria;
    this.#descricao = descricao;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get nomeCategoria() {
    return this.#nomeCategoria;
  }
  set nomeCategoria(valor) {
    this.#nomeCategoria = valor;
  }

  get descricao() {
    return this.#descricao;
  }
  set descricao(valor) {
    this.#descricao = valor;
  }

  async cadastrar() {
    let sql =
      "insert into CATEGORIAS_PRODUTO (NOME_CATEGORIA, DESCRICAO) values (?,?)";
    let valores = [this.#nomeCategoria, this.#descricao];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from CATEGORIAS_PRODUTO where ID_CATEGORIA = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from CATEGORIAS_PRODUTO";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let categoria = new CategoriasProduto(
        linha["ID_CATEGORIA"],
        linha["NOME_CATEGORIA"],
        linha["DESCRICAO"],
      );

      lista.push(categoria);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update CATEGORIAS_PRODUTO set NOME_CATEGORIA = ?, DESCRICAO = ? where ID_CATEGORIA = ?";
    let valores = [this.#nomeCategoria, this.#descricao, this.#id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = CategoriasProduto;
