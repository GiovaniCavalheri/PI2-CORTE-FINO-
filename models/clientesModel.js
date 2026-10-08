const Database = require("../database/database");

class Cliente {
  #id;
  #cpfCliente;
  #emailCliente;
  #enderecoCliente;
  #telefone;
  #telComercial;
  #senhaCliente;

  constructor(
    id,
    cpfCliente,
    emailCliente,
    enderecoCliente,
    telefone,
    telComercial,
    senhaCliente,
  ) {
    this.#id = id;
    this.#cpfCliente = cpfCliente;
    this.#emailCliente = emailCliente;
    this.#enderecoCliente = enderecoCliente;
    this.#telefone = telefone;
    this.#telComercial = telComercial;
    this.#senhaCliente = senhaCliente;
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

  get senhaCliente() {
    return this.#senhaCliente;
  }
  set senhaCliente(valor) {
    this.#senhaCliente = valor;
  }

  async cadastrar() {
    let sql =
      "insert into CLIENTE (CPF_CLIENTE, EMAIL_CLIENTE, ENDERECO_CLIENTE, TELEFONE, TEL_COMERCIAL) values (?,?,?,?,?)";
    let valores = [
      this.#cpfCliente,
      this.#emailCliente,
      this.#enderecoCliente,
      this.#telefone,
      this.#telComercial,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async cadastrarComId() {
    let sql =
      "insert into CLIENTE (CPF_CLIENTE, EMAIL_CLIENTE, ENDERECO_CLIENTE, TELEFONE, TEL_COMERCIAL) values (?,?,?,?,?)";
    let valores = [
      this.#cpfCliente,
      this.#emailCliente,
      this.#enderecoCliente,
      this.#telefone,
      this.#telComercial,
    ];

    let banco = new Database();
    return banco.ExecutaComandoLastInserted(sql, valores);
  }

  async excluir(id) {
    let sql = "delete from CLIENTE where ID_CLIENTE = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from CLIENTE";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      let linha = linhas[i];
      let cliente = new Cliente(
        linha["ID_CLIENTE"],
        linha["CPF_CLIENTE"],
        linha["EMAIL_CLIENTE"],
        linha["ENDERECO_CLIENTE"],
        linha["TELEFONE"],
        linha["TEL_COMERCIAL"],
        linha["SENHA_CLIENTE"],
      );

      lista.push(cliente);
    }
    return lista;
  }

  async alterar() {
    let sql =
      "update CLIENTE set CPF_CLIENTE = ?, EMAIL_CLIENTE = ?, ENDERECO_CLIENTE = ?, TELEFONE = ?, TEL_COMERCIAL = ? where ID_CLIENTE = ?";
    let valores = [
      this.#cpfCliente,
      this.#emailCliente,
      this.#enderecoCliente,
      this.#telefone,
      this.#telComercial,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Cliente;
