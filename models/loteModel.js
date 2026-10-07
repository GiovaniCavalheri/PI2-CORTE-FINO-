class Lote {
  #id;
  #idProduto;
  #dataValidade;
  #qntLote;

  constructor(id, idProduto, dataValidade, qntLote) {
    this.#id = id;
    this.#idProduto = idProduto;
    this.#dataValidade = dataValidade;
    this.#qntLote = qntLote;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get idProduto() {
    return this.#idProduto;
  }
  set idProduto(valor) {
    this.#idProduto = valor;
  }

  get dataValidade() {
    return this.#dataValidade;
  }
  set dataValidade(valor) {
    this.#dataValidade = valor;
  }

  get qntLote() {
    return this.#qntLote;
  }
  set qntLote(valor) {
    this.#qntLote = valor;
  }
}
