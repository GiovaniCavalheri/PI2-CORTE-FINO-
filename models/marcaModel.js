const Database = require("../database/database");

class Marca {
  #id;
  #nomeMarca;

  constructor(id, nomeMarca) {
    this.#id = id;
    this.#nomeMarca = nomeMarca;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get nomeMarca() {
    return this.#nomeMarca;
  }
  set nomeMarca(valor) {
    this.#nomeMarca = valor;
  }

  async cadastrar() {
    let sql = "insert into MARCA (NOME_MARCA) values (?)";
    let valores = [this.#nomeMarca];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from MARCA where ID_MARCA = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from MARCA";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let marca = new Marca(linha["ID_MARCA"], linha["NOME_MARCA"]);

      lista.push(marca);
    }
    return lista;
  }

  async alterar() {
    let sql = "update MARCA set NOME_MARCA = ? where ID_MARCA = ?";
    let valores = [this.#nomeMarca, this.#id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Marca;
