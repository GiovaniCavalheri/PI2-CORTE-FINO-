class Cliente {
  #id;
  #cpfCliente;
  #emailCliente;
  #enderecoCliente;
  #telefone;
  #telComercial;

  constructor(
    id,
    cpfCliente,
    emailCliente,
    enderecoCliente,
    telefone,
    telComercial,
  ) {
    this.#id = id;
    this.#cpfCliente = cpfCliente;
    this.#emailCliente = emailCliente;
    this.#enderecoCliente = enderecoCliente;
    this.#telefone = telefone;
    this.#telComercial = telComercial;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get cpfCliente() {
    return this.#cpfCliente;
  }
  set cpfCliente(valor) {
    this.#cpfCliente = valor;
  }

  get emailCliente() {
    return this.#emailCliente;
  }
  set emailCliente(valor) {
    this.#emailCliente = valor;
  }

  get enderecoCliente() {
    return this.#enderecoCliente;
  }
  set enderecoCliente(valor) {
    this.#enderecoCliente = valor;
  }

  get telefone() {
    return this.#telefone;
  }
  set telefone(valor) {
    this.#telefone = valor;
  }

  get telComercial() {
    return this.#telComercial;
  }
  set telComercial(valor) {
    this.#telComercial = valor;
  }
}

module.exports = Cliente