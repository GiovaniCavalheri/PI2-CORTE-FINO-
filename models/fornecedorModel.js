const Database = require("../database/database");

class Fornecedor {
  #id;
  #cnpjFornecedor;
  #nomeFornecedor;
  #emailFornecedor;
  #telefone;

  constructor(id, cnpjFornecedor, nomeFornecedor, emailFornecedor, telefone) {
    this.#id = id;
    this.#cnpjFornecedor = cnpjFornecedor;
    this.#nomeFornecedor = nomeFornecedor;
    this.#emailFornecedor = emailFornecedor;
    this.#telefone = telefone;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get cnpjFornecedor() {
    return this.#cnpjFornecedor;
  }
  set cnpjFornecedor(valor) {
    this.#cnpjFornecedor = valor;
  }

  get nomeFornecedor() {
    return this.#nomeFornecedor;
  }
  set nomeFornecedor(valor) {
    this.#nomeFornecedor = valor;
  }

  get emailFornecedor() {
    return this.#emailFornecedor;
  }
  set emailFornecedor(valor) {
    this.#emailFornecedor = valor;
  }

  get telefone() {
    return this.#telefone;
  }
  set telefone(valor) {
    this.#telefone = valor;
  }

  async cadastrar() {
    let sql =
      "insert into FORNECEDOR (CNPJ_FORNECEDOR, NOME_FORNECEDOR, EMAIL_FORNECEDOR, TELEFONE) values (?,?,?,?)";
    let valores = [
      this.#cnpjFornecedor,
      this.#nomeFornecedor,
      this.#emailFornecedor,
      this.#telefone,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from FORNECEDOR where ID_FORNECEDOR = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from FORNECEDOR";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let fornecedor = new Fornecedor(
        linha["ID_FORNECEDOR"],
        linha["CNPJ_FORNECEDOR"],
        linha["NOME_FORNECEDOR"],
        linha["EMAIL_FORNECEDOR"],
        linha["TELEFONE"],
      );

      lista.push(fornecedor);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update FORNECEDOR set CNPJ_FORNECEDOR = ?, NOME_FORNECEDOR = ?, EMAIL_FORNECEDOR = ?, TELEFONE = ? where ID_FORNECEDOR = ?";
    let valores = [
      this.#cnpjFornecedor,
      this.#nomeFornecedor,
      this.#emailFornecedor,
      this.#telefone,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Fornecedor;
