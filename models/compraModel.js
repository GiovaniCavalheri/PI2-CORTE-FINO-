const Database = require("../database/database");

class Compra {
  #id;
  #idFornecedor;
  #idAdm;
  #dataCompra;

  constructor(id, idFornecedor, idAdm, dataCompra) {
    this.#id = id;
    this.#idFornecedor = idFornecedor;
    this.#idAdm = idAdm;
    this.#dataCompra = dataCompra;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get idFornecedor() {
    return this.#idFornecedor;
  }
  set idFornecedor(valor) {
    this.#idFornecedor = valor;
  }

  get idAdm() {
    return this.#idAdm;
  }
  set idAdm(valor) {
    this.#idAdm = valor;
  }

  get dataCompra() {
    return this.#dataCompra;
  }
  set dataCompra(valor) {
    this.#dataCompra = valor;
  }

  async cadastrar() {
    let sql = "insert into COMPRA (ID_FORNECEDOR, ID_ADM) values (?,?)";
    let valores = [this.#idFornecedor, this.#idAdm];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from COMPRA where ID_COMPRA = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from COMPRA";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let compra = new Compra(
        linha["ID_COMPRA"],
        linha["ID_FORNECEDOR"],
        linha["ID_ADM"],
        linha["DATA_COMPRA"],
      );

      lista.push(compra);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update COMPRA set ID_FORNECEDOR = ?, ID_ADM = ?, DATA_COMPRA = ? where ID_COMPRA = ?";
    let valores = [this.#idFornecedor, this.#idAdm, this.#dataCompra, this.#id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Compra;
