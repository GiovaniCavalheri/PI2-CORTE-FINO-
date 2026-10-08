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
}


module.exports = Marca