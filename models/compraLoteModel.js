class CompraLote {
  #idCompra;
  #idLote;
  #qntComprada;
  #valorCompra;

  constructor(idCompra, idLote, qntComprada, valorCompra) {
    this.#idCompra = idCompra;
    this.#idLote = idLote;
    this.#qntComprada = qntComprada;
    this.#valorCompra = valorCompra;
  }

  get idCompra() {
    return this.#idCompra;
  }
  set idCompra(valor) {
    this.#idCompra = valor;
  }

  get idLote() {
    return this.#idLote;
  }
  set idLote(valor) {
    this.#idLote = valor;
  }

  get qntComprada() {
    return this.#qntComprada;
  }
  set qntComprada(valor) {
    this.#qntComprada = valor;
  }

  get valorCompra() {
    return this.#valorCompra;
  }
  set valorCompra(valor) {
    this.#valorCompra = valor;
  }
}

module.exports = CompraLote