const Fornecedor = require("../models/fornecedorModel");

const FORMAS_PAGAMENTO = ["debcred", "ted", "pix", "cheque"];

//valida o corpo da requisicao e devolve os campos na ordem do construtor de Fornecedor
//(sem id e sem senha)
function lerDadosFornecedor(body) {
  const {
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
  } = body;

  if (
    !camposTextoValidos([
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
    ]) ||
    !FORMAS_PAGAMENTO.includes(formaPagamento)
  ) {
    return null;
  }

  //CNPJ, CPF do responsavel e CEP no banco guardam somente os digitos
  const cnpj = somenteDigitos(cnpjFornecedor);
  const cpf = somenteDigitos(cpfResponsavel);
  const cepDigitos = somenteDigitos(cep);
  const uf = estado.trim().toUpperCase();
  if (
    cnpj.length !== 14 ||
    cpf.length !== 11 ||
    cepDigitos.length !== 8 ||
    uf.length !== 2
  ) {
    return null;
  }

  return [
    cnpj,
    nomeFornecedor.trim(),
    nomeFantasia.trim(),
    nomeResponsavel.trim(),
    cpf,
    emailFornecedor.trim(),
    telefone.trim(),
    celular.trim(),
    cepDigitos,
    cidade.trim(),
    uf,
    bairro.trim(),
    numero.trim(),
    formaPagamento,
  ];
}

class FornecedorController {
  async cadastrar(req, res) {
    const dados = lerDadosFornecedor(req.body);
    if (!dados) {
      return res.send({ ok: false });
    }

    const { senhaFornecedor } = req.body;
    const fornecedor = new Fornecedor(
      0,
      ...dados,
      typeof senhaFornecedor === "string" ? senhaFornecedor : null,
    );
    const okRetornoBanco = await fornecedor.cadastrar();

    return res.send({ ok: okRetornoBanco });
  }

  async listar(req, res) {
    const fornecedores = await new Fornecedor().listar();
    return res.send(
      fornecedores.map((fornecedor) => ({
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
      })),
    );
  }

  async alterar(req, res) {
    const idFornecedor = Number(req.body.id);
    const dados = lerDadosFornecedor(req.body);

    if (!Number.isSafeInteger(idFornecedor) || idFornecedor <= 0 || !dados) {
      return res.send({ ok: false });
    }

    const fornecedor = new Fornecedor(idFornecedor, ...dados);
    const okRetornoBanco = await fornecedor.alterar();
    return res.send({ ok: okRetornoBanco });
  }
}

function camposTextoValidos(campos) {
  return campos.every(
    (campo) => typeof campo === "string" && campo.trim().length > 0,
  );
}

function somenteDigitos(valor) {
  return valor.replace(/\D/g, "");
}

module.exports = FornecedorController;
