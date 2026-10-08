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
}
