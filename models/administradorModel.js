const Database = require("../database/database");

class Administrador {
  #id;
  #nomeAdm;
  #emailAdm;
  #senhaAdm;

  constructor(id, nomeAdm, emailAdm, senhaAdm) {
    this.#id = id;
    this.#nomeAdm = nomeAdm;
    this.#emailAdm = emailAdm;
    this.#senhaAdm = senhaAdm;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get nomeAdm() {
    return this.#nomeAdm;
  }
  set nomeAdm(valor) {
    this.#nomeAdm = valor;
  }

  get emailAdm() {
    return this.#emailAdm;
  }
  set emailAdm(valor) {
    this.#emailAdm = valor;
  }

  set senhaAdm(valor) {
    this.#senhaAdm = valor;
  }

  verificarSenha(senhaDigitada) {
    return this.#senhaAdm === senhaDigitada;
  }

  async cadastrar() {
    let sql =
      "insert into ADMINISTRADOR (NOME_ADM, EMAIL_ADM, SENHA_ADM) values (?,?,?)";
    let valores = [this.#nomeAdm, this.#emailAdm, this.#senhaAdm];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from ADMINISTRADOR where ID_ADM = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select ID_ADM, NOME_ADM, EMAIL_ADM from ADMINISTRADOR";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let administrador = new Administrador(
        linha["ID_ADM"],
        linha["NOME_ADM"],
        linha["EMAIL_ADM"],
        linha["SENHA_ADM"],
      );

      lista.push(administrador);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update ADMINISTRADOR set NOME_ADM = ?, EMAIL_ADM = ? where ID_ADM = ?";
    let valores = [this.#nomeAdm, this.#emailAdm, this.#id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async alterarSenha() {
    let sql = "update ADMINISTRADOR set SENHA_ADM = ? where ID_ADM = ?";
    let valores = [this.#senhaAdm, this.#id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Administrador;
