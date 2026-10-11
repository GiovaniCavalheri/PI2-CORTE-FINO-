const Database = require("../database/database");

class Cliente {
  #id;
  #nomeCliente;
  #dataNascimento;
  #cpfCliente;
  #rgCliente;
  #emailCliente;
  #enderecoCliente;
  #telefone;
  #telComercial;
  #cep;
  #cidade;
  #estado;
  #bairro;
  #numero;
  #complemento;
  #senhaCliente;

  constructor(
    id,
    nomeCliente,
    dataNascimento,
    cpfCliente,
    rgCliente,
    emailCliente,
    enderecoCliente,
    telefone,
    telComercial,
    cep,
    cidade,
    estado,
    bairro,
    numero,
    complemento,
    senhaCliente,
  ) {
    this.#id = id;
    this.#nomeCliente = nomeCliente;
    this.#dataNascimento = dataNascimento;
    this.#cpfCliente = cpfCliente;
    this.#rgCliente = rgCliente;
    this.#emailCliente = emailCliente;
    this.#enderecoCliente = enderecoCliente;
    this.#telefone = telefone;
    this.#telComercial = telComercial;
    this.#cep = cep;
    this.#cidade = cidade;
    this.#estado = estado;
    this.#bairro = bairro;
    this.#numero = numero;
    this.#complemento = complemento;
    this.#senhaCliente = senhaCliente;
  }

  get id() {
    return this.#id;
  }
  set id(valor) {
    this.#id = valor;
  }

  get nomeCliente() {
    return this.#nomeCliente;
  }
  set nomeCliente(valor) {
    this.#nomeCliente = valor;
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }
  set dataNascimento(valor) {
    this.#dataNascimento = valor;
  }

  get cpfCliente() {
    return this.#cpfCliente;
  }
  set cpfCliente(valor) {
    this.#cpfCliente = valor;
  }

  get rgCliente() {
    return this.#rgCliente;
  }
  set rgCliente(valor) {
    this.#rgCliente = valor;
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

  get complemento() {
    return this.#complemento;
  }
  set complemento(valor) {
    this.#complemento = valor;
  }

  get senhaCliente() {
    return this.#senhaCliente;
  }
  set senhaCliente(valor) {
    this.#senhaCliente = valor;
  }

  //colunas gravadas no insert, na mesma ordem dos valores
  #valoresCadastro() {
    return [
      this.#nomeCliente,
      this.#dataNascimento,
      this.#cpfCliente,
      this.#rgCliente,
      this.#emailCliente,
      this.#enderecoCliente,
      this.#telefone,
      this.#telComercial,
      this.#cep,
      this.#cidade,
      this.#estado,
      this.#bairro,
      this.#numero,
      this.#complemento,
      this.#senhaCliente,
    ];
  }

  async cadastrar() {
    let sql =
      "insert into CLIENTE (NOME_CLIENTE, DATA_NASCIMENTO, CPF_CLIENTE, RG_CLIENTE, EMAIL_CLIENTE, ENDERECO_CLIENTE, TELEFONE, TEL_COMERCIAL, CEP, CIDADE, ESTADO, BAIRRO, NUMERO, COMPLEMENTO, SENHA_CLIENTE) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let valores = this.#valoresCadastro();

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async cadastrarComId() {
    let sql =
      "insert into CLIENTE (NOME_CLIENTE, DATA_NASCIMENTO, CPF_CLIENTE, RG_CLIENTE, EMAIL_CLIENTE, ENDERECO_CLIENTE, TELEFONE, TEL_COMERCIAL, CEP, CIDADE, ESTADO, BAIRRO, NUMERO, COMPLEMENTO, SENHA_CLIENTE) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let valores = this.#valoresCadastro();

    let banco = new Database();
    return banco.ExecutaComandoLastInserted(sql, valores);
  }

  //exclui o cliente numa transacao, apagando junto o historico de pedidos
  //(o controller so chama aqui se nao houver pedido em aberto)
  async excluir(id) {
    let banco = new Database();
    return await banco.ExecutaTransacao(async function (executar) {
      await executar(
        "delete from ENTREGA_PEDIDO where ID_PEDIDO in (select ID_PEDIDO from PEDIDOS where ID_CLIENTE = ?)",
        [id],
      );
      await executar(
        "delete from ITENS_PEDIDOS where ID_PEDIDO in (select ID_PEDIDO from PEDIDOS where ID_CLIENTE = ?)",
        [id],
      );
      await executar("delete from PEDIDOS where ID_CLIENTE = ?", [id]);
      let cliente = await executar("delete from CLIENTE where ID_CLIENTE = ?", [id]);
      return cliente.affectedRows > 0;
    });
  }

  //usado antes de excluir: o cliente (socio) nao pode ter pedido em aberto.
  //pedido em aberto = qualquer status que nao seja 'Entregue' nem 'Cancelado'
  async possuiPedidosEmAberto(id) {
    let sql =
      "select count(*) as total from PEDIDOS where ID_CLIENTE = ? and STATUS_PEDIDO not in ('Entregue', 'Cancelado')";
    let valores = [id];

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql, valores);

    return linhas[0]["total"] > 0;
  }

  async listar() {
    let sql = "select * from CLIENTE";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql);

    let lista = [];
    for (let i = 0; i < linhas.length; i++) {
      lista.push(Cliente.#deLinha(linhas[i]));
    }
    return lista;
  }

  //usado no login: o e-mail nao e unico em CLIENTE, por isso devolve uma lista
  async buscarPorEmail(email) {
    let sql = "select * from CLIENTE where EMAIL_CLIENTE = ?";

    let banco = new Database();
    let linhas = await banco.ExecutaComando(sql, [email]);

    return linhas.map((linha) => Cliente.#deLinha(linha));
  }

  verificarSenha(senhaDigitada) {
    return this.#senhaCliente === senhaDigitada;
  }

  static #deLinha(linha) {
    return new Cliente(
      linha["ID_CLIENTE"],
      linha["NOME_CLIENTE"],
      linha["DATA_NASCIMENTO"],
      linha["CPF_CLIENTE"],
      linha["RG_CLIENTE"],
      linha["EMAIL_CLIENTE"],
      linha["ENDERECO_CLIENTE"],
      linha["TELEFONE"],
      linha["TEL_COMERCIAL"],
      linha["CEP"],
      linha["CIDADE"],
      linha["ESTADO"],
      linha["BAIRRO"],
      linha["NUMERO"],
      linha["COMPLEMENTO"],
      linha["SENHA_CLIENTE"],
    );
  }

  async alterar() {
    let sql =
      "update CLIENTE set NOME_CLIENTE = ?, DATA_NASCIMENTO = ?, CPF_CLIENTE = ?, RG_CLIENTE = ?, EMAIL_CLIENTE = ?, ENDERECO_CLIENTE = ?, TELEFONE = ?, TEL_COMERCIAL = ?, CEP = ?, CIDADE = ?, ESTADO = ?, BAIRRO = ?, NUMERO = ?, COMPLEMENTO = ? where ID_CLIENTE = ?";
    let valores = [
      this.#nomeCliente,
      this.#dataNascimento,
      this.#cpfCliente,
      this.#rgCliente,
      this.#emailCliente,
      this.#enderecoCliente,
      this.#telefone,
      this.#telComercial,
      this.#cep,
      this.#cidade,
      this.#estado,
      this.#bairro,
      this.#numero,
      this.#complemento,
      this.#id,
    ];

    let banco = new Database();
    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}

module.exports = Cliente;
