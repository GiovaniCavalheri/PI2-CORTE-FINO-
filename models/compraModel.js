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
}
