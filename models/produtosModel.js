class Produtos {
  #id;
  #idCategoria;
  #idMarca;
  #nomeProduto;
  #descricaoProduto;
  #precoVenda;
  #qntEstoque;

  constructor(
    id,
    idCategoria,
    idMarca,
    nomeProduto,
    descricaoProduto,
    precoVenda,
    qntEstoque,
  ) {
    this.#id = id;
    this.#idCategoria = idCategoria;
    this.#idMarca = idMarca;
    this.#nomeProduto = nomeProduto;
    this.#descricaoProduto = descricaoProduto;
    this.#precoVenda = precoVenda;
    this.#qntEstoque = qntEstoque;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get idCategoria() {
    return this.#idCategoria;
  }
  set idCategoria(valor) {
    this.#idCategoria = valor;
  }

  get idMarca() {
    return this.#idMarca;
  }
  set idMarca(valor) {
    this.#idMarca = valor;
  }

  get nomeProduto() {
    return this.#nomeProduto;
  }
  set nomeProduto(valor) {
    this.#nomeProduto = valor;
  }

  get descricaoProduto() {
    return this.#descricaoProduto;
  }
  set descricaoProduto(valor) {
    this.#descricaoProduto = valor;
  }

  get precoVenda() {
    return this.#precoVenda;
  }
  set precoVenda(valor) {
    this.#precoVenda = valor;
  }

  get qntEstoque() {
    return this.#qntEstoque;
  }
  set qntEstoque(valor) {
    this.#qntEstoque = valor;
  }
}


module.exports = Produtos