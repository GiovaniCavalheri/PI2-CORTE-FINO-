class Socio {
  #id;
  #nome;
  #dataNasc;
  #cpf;
  #rg;
  #estadoCivil;
  #email;
  #celular;
  #telComercial;
  #cep;
  #cidade;
  #estado;
  #bairro;
  #numResidencia;
  #complemento;
  #senha;

  constructor(
    id,
    nome,
    dataNasc,
    cpf,
    rg,
    estadoCivil,
    email,
    celular,
    telComercial,
    cep,
    cidade,
    estado,
    bairro,
    numResidencia,
    complemento,
    senha,
  ) {
    this.#id = id;
    this.#nome = nome;
    this.#dataNasc = dataNasc;
    this.#cpf = cpf;
    this.#rg = rg;
    this.#estadoCivil = estadoCivil;
    this.#email = email;
    this.#celular = celular;
    this.#telComercial = telComercial;
    this.#cep = cep;
    this.#cidade = cidade;
    this.#estado = estado;
    this.#bairro = bairro;
    this.#numResidencia = numResidencia;
    this.#complemento = complemento;
    this.#senha = senha;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get nome() {
    return this.#nome;
  }
  set nome(valor) {
    this.#nome = valor;
  }

  get dataNasc() {
    return this.#dataNasc;
  }
  set dataNasc(valor) {
    this.#dataNasc = valor;
  }

  get cpf() {
    return this.#cpf;
  }
  set cpf(valor) {
    this.#cpf = valor;
  }

  get rg() {
    return this.#rg;
  }
  set rg(valor) {
    this.#rg = valor;
  }

  get estadoCivil() {
    return this.#estadoCivil;
  }
  set estadoCivil(valor) {
    this.#estadoCivil = valor;
  }

  get email() {
    return this.#email;
  }
  set email(valor) {
    this.#email = valor;
  }

  get celular() {
    return this.#celular;
  }
  set celular(valor) {
    this.#celular = valor;
  }

  get telComercial() {
    return this.#telComercial;
  }
  set telComercial(valor) {
    this.#telComercial = valor;
  }

  get cep() {
    return this.#cep;
  }
  set cep(valor) {
    this.#cep = valor;
  }

  get cidade() {
    return this.#cidade;
  }
  set cidade(valor) {
    this.#cidade = valor;
  }

  get estado() {
    return this.#estado;
  }
  set estado(valor) {
    this.#estado = valor;
  }

  get bairro() {
    return this.#bairro;
  }
  set bairro(valor) {
    this.#bairro = valor;
  }

  get numResidencia() {
    return this.#numResidencia;
  }
  set numResidencia(valor) {
    this.#numResidencia = valor;
  }

  get complemento() {
    return this.#complemento;
  }
  set complemento(valor) {
    this.#complemento = valor;
  }

  set senha(valor) {
    this.#senha = valor;
  }

  verificarSenha(senhaDigitada) {
    return this.#senha === senhaDigitada;
  }
}
