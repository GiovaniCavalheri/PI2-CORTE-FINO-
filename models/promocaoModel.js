class Promocao {
  #id;
  #descontoPorc;
  #dataInicio;
  #dataFim;

  constructor(id, descontoPorc, dataInicio, dataFim) {
    this.#id = id;
    this.#descontoPorc = descontoPorc;
    this.#dataInicio = dataInicio;
    this.#dataFim = dataFim;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get descontoPorc() {
    return this.#descontoPorc;
  }
  set descontoPorc(valor) {
    this.#descontoPorc = valor;
  }

  get dataInicio() {
    return this.#dataInicio;
  }
  set dataInicio(valor) {
    this.#dataInicio = valor;
  }

  get dataFim() {
    return this.#dataFim;
  }
  set dataFim(valor) {
    this.#dataFim = valor;
  }
}

module.exports = Promocao