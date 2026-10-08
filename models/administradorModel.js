class Administrador {
  #id;
  #nomeAdm;
  #emailAdm;
  #senhaAdm;

  constructor(id, nomeAdm, emailAdm, senhaAdm) {
    this.#id = id;
    this.#nomeAdm = nomeAdm;
    this.#emailAdm = emailAdm;
    this.#senhaAdm = senhaAdm;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get nomeAdm() {
    return this.#nomeAdm;
  }
  set nomeAdm(valor) {
    this.#nomeAdm = valor;
  }

  get emailAdm() {
    return this.#emailAdm;
  }
  set emailAdm(valor) {
    this.#emailAdm = valor;
  }

  set senhaAdm(valor) {
    this.#senhaAdm = valor;
  }

  verificarSenha(senhaDigitada) {
    return this.#senhaAdm === senhaDigitada;
  }
}

module.exports = Administrador
