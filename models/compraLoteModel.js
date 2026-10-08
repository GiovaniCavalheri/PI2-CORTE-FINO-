const Database = require("../database/database");

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

  async cadastrar() {
    let sql =
      "insert into COMPRA_LOTE (ID_COMPRA, ID_LOTE, QNT_COMPRADA, VALOR_COMPRA) values (?,?,?,?)";
    let valores = [
      this.#idCompra,
      this.#idLote,
      this.#qntComprada,
      this.#valorCompra,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(idCompra, idLote) {
    let sql = "delete from COMPRA_LOTE where ID_COMPRA = ? and ID_LOTE = ?";
    let valores = [idCompra, idLote];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from COMPRA_LOTE";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let compraLote = new CompraLote(
        linha["ID_COMPRA"],
        linha["ID_LOTE"],
        linha["QNT_COMPRADA"],
        linha["VALOR_COMPRA"],
      );

      lista.push(compraLote);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update COMPRA_LOTE set QNT_COMPRADA = ?, VALOR_COMPRA = ? where ID_COMPRA = ? and ID_LOTE = ?";
    let valores = [
      this.#qntComprada,
      this.#valorCompra,
      this.#idCompra,
      this.#idLote,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = CompraLote;
