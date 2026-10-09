const Database = require("../database/database");

class Fornecedor {
  #id;
  #cnpjFornecedor;
  #nomeFornecedor;
  #nomeFantasia;
  #nomeResponsavel;
  #cpfResponsavel;
  #emailFornecedor;
  #telefone;
  #celular;
  #cep;
  #cidade;
  #estado;
  #bairro;
  #numero;
  #formaPagamento;
  #senhaFornecedor;

  constructor(
    id,
    cnpjFornecedor,
    nomeFornecedor,
    nomeFantasia,
    nomeResponsavel,
    cpfResponsavel,
    emailFornecedor,
    telefone,
    celular,
    cep,
    cidade,
    estado,
    bairro,
    numero,
    formaPagamento,
    senhaFornecedor,
  ) {
    this.#id = id;
    this.#cnpjFornecedor = cnpjFornecedor;
    this.#nomeFornecedor = nomeFornecedor;
    this.#nomeFantasia = nomeFantasia;
    this.#nomeResponsavel = nomeResponsavel;
    this.#cpfResponsavel = cpfResponsavel;
    this.#emailFornecedor = emailFornecedor;
    this.#telefone = telefone;
    this.#celular = celular;
    this.#cep = cep;
    this.#cidade = cidade;
    this.#estado = estado;
    this.#bairro = bairro;
    this.#numero = numero;
    this.#formaPagamento = formaPagamento;
    this.#senhaFornecedor = senhaFornecedor;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get cnpjFornecedor() {
    return this.#cnpjFornecedor;
  }
  set cnpjFornecedor(valor) {
    this.#cnpjFornecedor = valor;
  }

  get nomeFornecedor() {
    return this.#nomeFornecedor;
  }
  set nomeFornecedor(valor) {
    this.#nomeFornecedor = valor;
  }

  get nomeFantasia() {
    return this.#nomeFantasia;
  }
  set nomeFantasia(valor) {
    this.#nomeFantasia = valor;
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

  get emailFornecedor() {
    return this.#emailFornecedor;
  }
  set emailFornecedor(valor) {
    this.#emailFornecedor = valor;
  }

  get telefone() {
    return this.#telefone;
  }
  set telefone(valor) {
    this.#telefone = valor;
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

  get numero() {
    return this.#numero;
  }
  set numero(valor) {
    this.#numero = valor;
  }

  get formaPagamento() {
    return this.#formaPagamento;
  }
  set formaPagamento(valor) {
    this.#formaPagamento = valor;
  }

  get senhaFornecedor() {
    return this.#senhaFornecedor;
  }
  set senhaFornecedor(valor) {
    this.#senhaFornecedor = valor;
  }

  async cadastrar() {
    let sql =
      "insert into FORNECEDOR (CNPJ_FORNECEDOR, NOME_FORNECEDOR, NOME_FANTASIA, NOME_RESPONSAVEL, CPF_RESPONSAVEL, EMAIL_FORNECEDOR, TELEFONE, CELULAR, CEP, CIDADE, ESTADO, BAIRRO, NUMERO, FORMA_PAGAMENTO, SENHA_FORNECEDOR) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let valores = [
      this.#cnpjFornecedor,
      this.#nomeFornecedor,
      this.#nomeFantasia,
      this.#nomeResponsavel,
      this.#cpfResponsavel,
      this.#emailFornecedor,
      this.#telefone,
      this.#celular,
      this.#cep,
      this.#cidade,
      this.#estado,
      this.#bairro,
      this.#numero,
      this.#formaPagamento,
      this.#senhaFornecedor,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async excluir(id) {
    let sql = "delete from FORNECEDOR where ID_FORNECEDOR = ?";
    let valores = [id];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async listar() {
    let sql = "select * from FORNECEDOR";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      lista.push(Fornecedor.#deLinha(linhas[i]));
    }
    return lista;
  }

  //usado no login: o e-mail nao e unico em FORNECEDOR, por isso devolve uma lista
  async buscarPorEmail(email) {
    let sql = "select * from FORNECEDOR where EMAIL_FORNECEDOR = ?";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql, [email]);

    return linhas.map((linha) => Fornecedor.#deLinha(linha));
  }

  verificarSenha(senhaDigitada) {
    return this.#senhaFornecedor === senhaDigitada;
  }

  static #deLinha(linha) {
    return new Fornecedor(
      linha["ID_FORNECEDOR"],
      linha["CNPJ_FORNECEDOR"],
      linha["NOME_FORNECEDOR"],
      linha["NOME_FANTASIA"],
      linha["NOME_RESPONSAVEL"],
      linha["CPF_RESPONSAVEL"],
      linha["EMAIL_FORNECEDOR"],
      linha["TELEFONE"],
      linha["CELULAR"],
      linha["CEP"],
      linha["CIDADE"],
      linha["ESTADO"],
      linha["BAIRRO"],
      linha["NUMERO"],
      linha["FORMA_PAGAMENTO"],
      linha["SENHA_FORNECEDOR"],
    );
  }

  async alterar() {
    let sql =
      "update FORNECEDOR set CNPJ_FORNECEDOR = ?, NOME_FORNECEDOR = ?, NOME_FANTASIA = ?, NOME_RESPONSAVEL = ?, CPF_RESPONSAVEL = ?, EMAIL_FORNECEDOR = ?, TELEFONE = ?, CELULAR = ?, CEP = ?, CIDADE = ?, ESTADO = ?, BAIRRO = ?, NUMERO = ?, FORMA_PAGAMENTO = ? where ID_FORNECEDOR = ?";
    let valores = [
      this.#cnpjFornecedor,
      this.#nomeFornecedor,
      this.#nomeFantasia,
      this.#nomeResponsavel,
      this.#cpfResponsavel,
      this.#emailFornecedor,
      this.#telefone,
      this.#celular,
      this.#cep,
      this.#cidade,
      this.#estado,
      this.#bairro,
      this.#numero,
      this.#formaPagamento,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Fornecedor;
