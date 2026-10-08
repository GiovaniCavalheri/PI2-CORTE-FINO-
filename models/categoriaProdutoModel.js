class CategoriasProduto {
  #id;
  #nomeCategoria;
  #descricao;

  constructor(id, nomeCategoria, descricao) {
    this.#id = id;
    this.#nomeCategoria = nomeCategoria;
    this.#descricao = descricao;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get nomeCategoria() {
    return this.#nomeCategoria;
  }
  set nomeCategoria(valor) {
    this.#nomeCategoria = valor;
  }

  get descricao() {
    return this.#descricao;
  }
  set descricao(valor) {
    this.#descricao = valor;
  }
}

module.exports = CategoriasProduto