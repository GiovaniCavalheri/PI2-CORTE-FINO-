const Database = require("../database/database");

class Descarte {
  #id;
  #idLote;
  #idAdm;
  #dataDescarte;
  #qntDescartada;
  #motivoDescarte;

  constructor(id, idLote, idAdm, dataDescarte, qntDescartada, motivoDescarte) {
    this.#id = id;
    this.#idLote = idLote;
    this.#idAdm = idAdm;
    this.#dataDescarte = dataDescarte;
    this.#qntDescartada = qntDescartada;
    this.#motivoDescarte = motivoDescarte;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get idLote() {
    return this.#idLote;
  }
  set idLote(valor) {
    this.#idLote = valor;
  }

  get idAdm() {
    return this.#idAdm;
  }
  set idAdm(valor) {
    this.#idAdm = valor;
  }

  get dataDescarte() {
    return this.#dataDescarte;
  }
  set dataDescarte(valor) {
    this.#dataDescarte = valor;
  }

  get qntDescartada() {
    return this.#qntDescartada;
  }
  set qntDescartada(valor) {
    this.#qntDescartada = valor;
  }

  get motivoDescarte() {
    return this.#motivoDescarte;
  }
  set motivoDescarte(valor) {
    this.#motivoDescarte = valor;
  }

  async cadastrar() {
    let sql =
      "insert into DESCARTE (ID_LOTE, ID_ADM, QNT_DESCARTADA, MOTIVO_DESCARTE) values (?,?,?,?)";
    let valores = [
      this.#idLote,
      this.#idAdm,
      this.#qntDescartada,
      this.#motivoDescarte,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from DESCARTE where ID_DESCARTE = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from DESCARTE";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let descarte = new Descarte(
        linha["ID_DESCARTE"],
        linha["ID_LOTE"],
        linha["ID_ADM"],
        linha["DATA_DESCARTE"],
        linha["QNT_DESCARTADA"],
        linha["MOTIVO_DESCARTE"],
      );

      lista.push(descarte);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update DESCARTE set ID_LOTE = ?, ID_ADM = ?, DATA_DESCARTE = ?, QNT_DESCARTADA = ?, MOTIVO_DESCARTE = ? where ID_DESCARTE = ?";
    let valores = [
      this.#idLote,
      this.#idAdm,
      this.#dataDescarte,
      this.#qntDescartada,
      this.#motivoDescarte,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Descarte;
