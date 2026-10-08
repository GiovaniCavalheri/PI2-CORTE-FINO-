class Pedidos {
  #id;
  #idCliente;
  #valorPedido;
  #dataPedido;
  #tipoPedido;
  #statusPedido;

  constructor(
    id,
    idCliente,
    valorPedido,
    dataPedido,
    tipoPedido,
    statusPedido,
  ) {
    this.#id = id;
    this.#idCliente = idCliente;
    this.#valorPedido = valorPedido;
    this.#dataPedido = dataPedido;
    this.#tipoPedido = tipoPedido;
    this.#statusPedido = statusPedido;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get idCliente() {
    return this.#idCliente;
  }
  set idCliente(valor) {
    this.#idCliente = valor;
  }

  get valorPedido() {
    return this.#valorPedido;
  }
  set valorPedido(valor) {
    this.#valorPedido = valor;
  }

  get dataPedido() {
    return this.#dataPedido;
  }
  set dataPedido(valor) {
    this.#dataPedido = valor;
  }

  get tipoPedido() {
    return this.#tipoPedido;
  }
  set tipoPedido(valor) {
    this.#tipoPedido = valor;
  }

  get statusPedido() {
    return this.#statusPedido;
  }
  set statusPedido(valor) {
    this.#statusPedido = valor;
  }
}

module.exports = Pedidos