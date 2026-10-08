const Database = require("../database/database");

class Socio {
  #id;
  #dataAdesao;
  #dataVencimento;

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

  async excluir(id) {
    let sql = "delete from SOCIO where ID_SOCIO = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
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
