const Fornecedor = require("../models/fornecedorModel");

//valores aceitos pela coluna FORMA_PAGAMENTO (enum do banco)
const FORMAS_PAGAMENTO = ["debcred", "ted", "pix", "cheque"];

//true se o valor for um texto que nao esta vazio
function textoPreenchido(valor) {
  return typeof valor == "string" && valor.trim() != "";
}

//campo opcional: devolve o texto sem espacos nas pontas, ou null se veio vazio
function textoOuNulo(valor) {
  if (textoPreenchido(valor)) {
    return valor.trim();
  }
  return null;
}

//tira tudo que nao for numero: "12.345.678/0001-00" -> "12345678000100"
function somenteDigitos(valor) {
  return valor.replace(/\D/g, "");
}

//confere os campos do formulario e monta o fornecedor.
//devolve null se algum campo estiver errado
//obrigatorios: CNPJ, razao social, e-mail, celular e forma de pagamento
//opcionais: nome fantasia, responsavel, CPF do responsavel, telefone e endereco
function montarFornecedor(id, body, senha) {
  if (
    !textoPreenchido(body.cnpjFornecedor) ||
    !textoPreenchido(body.nomeFornecedor) ||
    !textoPreenchido(body.emailFornecedor) ||
    !textoPreenchido(body.celular)
  ) {
    return null;
  }

  if (!FORMAS_PAGAMENTO.includes(body.formaPagamento)) {
    return null;
  }

  //CNPJ no banco guarda somente os digitos
  let cnpj = somenteDigitos(body.cnpjFornecedor);
  if (cnpj.length != 14) {
    return null;
  }

  //CPF do responsavel, CEP e UF sao opcionais, mas se vierem tem que estar completos
  let cpf = textoOuNulo(body.cpfResponsavel);
  if (cpf != null) {
    cpf = somenteDigitos(cpf);
    if (cpf.length != 11) {
      return null;
    }
  }
  let cep = textoOuNulo(body.cep);
  if (cep != null) {
    cep = somenteDigitos(cep);
    if (cep.length != 8) {
      return null;
    }
  }
  let uf = textoOuNulo(body.estado);
  if (uf != null) {
    uf = uf.toUpperCase();
    if (uf.length != 2) {
      return null;
    }
  }

  return new Fornecedor(
    id,
    cnpj,
    body.nomeFornecedor.trim(),
    textoOuNulo(body.nomeFantasia),
    textoOuNulo(body.nomeResponsavel),
    cpf,
    body.emailFornecedor.trim(),
    textoOuNulo(body.telefone),
    body.celular.trim(),
    cep,
    textoOuNulo(body.cidade),
    uf,
    textoOuNulo(body.bairro),
    textoOuNulo(body.numero),
    body.formaPagamento,
    senha,
  );
}

class FornecedorController {
  async cadastrar(req, res) {
    let senha = null;
    if (typeof req.body.senhaFornecedor == "string") {
      senha = req.body.senhaFornecedor;
    }

    let fornecedor = montarFornecedor(0, req.body, senha);
    if (fornecedor != null) {
      let okRetornoBanco = await fornecedor.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  async listar(req, res) {
    let fornecedores = await new Fornecedor().listar();

    //monta a lista sem a senha
    let lista = [];
    for (let i = 0; i < fornecedores.length; i++) {
      let fornecedor = fornecedores[i];
      lista.push({
        id: fornecedor.id,
        cnpjFornecedor: fornecedor.cnpjFornecedor,
        nomeFornecedor: fornecedor.nomeFornecedor,
        nomeFantasia: fornecedor.nomeFantasia,
        nomeResponsavel: fornecedor.nomeResponsavel,
        cpfResponsavel: fornecedor.cpfResponsavel,
        emailFornecedor: fornecedor.emailFornecedor,
        telefone: fornecedor.telefone,
        celular: fornecedor.celular,
        cep: fornecedor.cep,
        cidade: fornecedor.cidade,
        estado: fornecedor.estado,
        bairro: fornecedor.bairro,
        numero: fornecedor.numero,
        formaPagamento: fornecedor.formaPagamento,
      });
    }
    res.send(lista);
  }

  async alterar(req, res) {
    let id = req.body.id;
    //na alteracao a senha nao muda
    let fornecedor = montarFornecedor(id, req.body, undefined);
    if (id && id > 0 && fornecedor != null) {
      let okRetornoBanco = await fornecedor.alterar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }
}

module.exports = FornecedorController;
