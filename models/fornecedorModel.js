class Fornecedor {
  #id;
  #razaoSocial;
  #nomeFantasia;
  #cnpj;
  #nomeResponsavel;
  #cpfResponsavel;
  #email;
  #telefoneComercial;
  #celular;
  #cep;
  #cidade;
  #estado;
  #bairro;
  #numeroEndereco;
  #formaPagamento;
  #senha;

  constructor(
    id,
    razaoSocial,
    nomeFantasia,
    cnpj,
    nomeResponsavel,
    cpfResponsavel,
    email,
    telefoneComercial,
    celular,
    cep,
    cidade,
    estado,
    bairro,
    numeroEndereco,
    formaPagamento,
    senha,
  ) {
    this.#id = id;
    this.#razaoSocial = razaoSocial;
    this.#nomeFantasia = nomeFantasia;
    this.#cnpj = cnpj;
    this.#nomeResponsavel = nomeResponsavel;
    this.#cpfResponsavel = cpfResponsavel;
    this.#email = email;
    this.#telefoneComercial = telefoneComercial;
    this.#celular = celular;
    this.#cep = cep;
    this.#cidade = cidade;
    this.#estado = estado;
    this.#bairro = bairro;
    this.#numeroEndereco = numeroEndereco;
    this.#formaPagamento = formaPagamento;
    this.#senha = senha;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get razaoSocial() {
    return this.#razaoSocial;
  }
  set razaoSocial(valor) {
    this.#razaoSocial = valor;
  }

  get nomeFantasia() {
    return this.#nomeFantasia;
  }
  set nomeFantasia(valor) {
    this.#nomeFantasia = valor;
  }

  get cnpj() {
    return this.#cnpj;
  }
  set cnpj(valor) {
    this.#cnpj = valor;
  }

  get nomeResponsavel() {
    return this.#nomeResponsavel;
  }
  set nomeResponsavel(valor) {
    this.#nomeResponsavel = valor;
  }

  get cpfResponsavel() {
    return this.#cpfResponsavel;
  }
  set cpfResponsavel(valor) {
    this.#cpfResponsavel = valor;
  }

  get email() {
    return this.#email;
  }
  set email(valor) {
    this.#email = valor;
  }

  get telefoneComercial() {
    return this.#telefoneComercial;
  }
  set telefoneComercial(valor) {
    this.#telefoneComercial = valor;
  }

  get celular() {
    return this.#celular;
  }
  set celular(valor) {
    this.#celular = valor;
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

  get numeroEndereco() {
    return this.#numeroEndereco;
  }
  set numeroEndereco(valor) {
    this.#numeroEndereco = valor;
  }

  get formaPagamento() {
    return this.#formaPagamento;
  }
  set formaPagamento(valor) {
    this.#formaPagamento = valor;
  }
  
  set senha(valor) {
    this.#senha = valor;
  }

  verificarSenha(senhaDigitada) {
    return this.#senha === senhaDigitada;
  }
}
