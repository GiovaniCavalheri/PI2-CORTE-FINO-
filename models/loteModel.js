const Database = require("../database/database");

class Lote {
  #id;
  #idProduto;
  #dataValidade;
  #qntLote;

  constructor(id, idProduto, dataValidade, qntLote) {
    this.#id = id;
    this.#idProduto = idProduto;
    this.#dataValidade = dataValidade;
    this.#qntLote = qntLote;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get idProduto() {
    return this.#idProduto;
  }
  set idProduto(valor) {
    this.#idProduto = valor;
  }

  get dataValidade() {
    return this.#dataValidade;
  }
  set dataValidade(valor) {
    this.#dataValidade = valor;
  }

  get qntLote() {
    return this.#qntLote;
  }
  set qntLote(valor) {
    this.#qntLote = valor;
  }

  async cadastrar() {
    let sql =
      "insert into LOTE (ID_PRODUTO, DATA_VALIDADE, QNT_LOTE) values (?,?,?)";
    let valores = [this.#idProduto, this.#dataValidade, this.#qntLote];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from LOTE where ID_LOTE = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from LOTE";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let lote = new Lote(
        linha["ID_LOTE"],
        linha["ID_PRODUTO"],
        linha["DATA_VALIDADE"],
        linha["QNT_LOTE"],
      );

      lista.push(lote);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update LOTE set ID_PRODUTO = ?, DATA_VALIDADE = ?, QNT_LOTE = ? where ID_LOTE = ?";
    let valores = [
      this.#idProduto,
      this.#dataValidade,
      this.#qntLote,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Lote;
