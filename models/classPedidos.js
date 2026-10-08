const Database = require("../database/database");

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

  async cadastrar() {
    let sql =
      "insert into PEDIDOS (ID_CLIENTE, VALOR_PEDIDO, TIPO_PEDIDO, STATUS_PEDIDO) values (?,?,?,?)";
    let valores = [
      this.#idCliente,
      this.#valorPedido,
      this.#tipoPedido,
      this.#statusPedido,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from PEDIDOS where ID_PEDIDO = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from PEDIDOS";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let pedido = new Pedidos(
        linha["ID_PEDIDO"],
        linha["ID_CLIENTE"],
        linha["VALOR_PEDIDO"],
        linha["DATA_PEDIDO"],
        linha["TIPO_PEDIDO"],
        linha["STATUS_PEDIDO"],
      );

      lista.push(pedido);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update PEDIDOS set ID_CLIENTE = ?, VALOR_PEDIDO = ?, DATA_PEDIDO = ?, TIPO_PEDIDO = ?, STATUS_PEDIDO = ? where ID_PEDIDO = ?";
    let valores = [
      this.#idCliente,
      this.#valorPedido,
      this.#dataPedido,
      this.#tipoPedido,
      this.#statusPedido,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Pedidos;
