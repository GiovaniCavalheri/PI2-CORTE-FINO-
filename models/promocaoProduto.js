const Database = require("../database/database");

class PromocaoProduto {
  #idPromocao;
  #idProduto;

  constructor(idPromocao, idProduto) {
    this.#idPromocao = idPromocao;
    this.#idProduto = idProduto;
  }

  get idPromocao() {
    return this.#idPromocao;
  }
  set idPromocao(valor) {
    this.#idPromocao = valor;
  }

  get idProduto() {
    return this.#idProduto;
  }
  set idProduto(valor) {
    this.#idProduto = valor;
  }

  async cadastrar() {
    let sql =
      "insert into PROMOCAO_PRODUTO (ID_PROMOCAO, ID_PRODUTO) values (?,?)";
    let valores = [this.#idPromocao, this.#idProduto];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(idPromocao, idProduto) {
    let sql =
      "delete from PROMOCAO_PRODUTO where ID_PROMOCAO = ? and ID_PRODUTO = ?";
    let valores = [idPromocao, idProduto];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from PROMOCAO_PRODUTO";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let promocaoProduto = new PromocaoProduto(
        linha["ID_PROMOCAO"],
        linha["ID_PRODUTO"],
      );

      lista.push(promocaoProduto);
    }
    return lista;
  }
}

module.exports = PromocaoProduto;
