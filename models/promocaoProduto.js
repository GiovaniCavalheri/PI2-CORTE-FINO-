class PromocaoProduto {
  #idPromocao;
  #idProduto;

  constructor(idPromocao, idProduto) {
    this.#idPromocao = idPromocao;
    this.#idProduto = idProduto;
  }

  get idPromocao() {
    return this.#idPromocao;
  }
  set idPromocao(valor) {
    this.#idPromocao = valor;
  }

  get idProduto() {
    return this.#idProduto;
  }
  set idProduto(valor) {
    this.#idProduto = valor;
  }
}
