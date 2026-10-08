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
}

module.exports = Fornecedor