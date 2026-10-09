const Cliente = require("../models/clientesModel");

//valida o corpo da requisicao e devolve os campos na ordem do construtor de Cliente
//(sem id e sem senha)
function lerDadosCliente(body) {
  const {
    nomeCliente,
    dataNascimento,
    cpfCliente,
    rgCliente,
    emailCliente,
    telefone,
    telComercial,
    cep,
    cidade,
    estado,
    bairro,
    numero,
    complemento,
  } = body;

  if (
    !camposTextoValidos([
      nomeCliente,
      dataNascimento,
      cpfCliente,
      rgCliente,
      emailCliente,
      telefone,
      telComercial,
      cep,
      cidade,
      estado,
      bairro,
      numero,
    ]) ||
    (complemento !== undefined && typeof complemento !== "string") ||
    !/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)
  ) {
    return null;
  }

  //CPF_CLIENTE e CEP no banco guardam somente os digitos
  const cpf = somenteDigitos(cpfCliente);
  const cepDigitos = somenteDigitos(cep);
  const uf = estado.trim().toUpperCase();
  if (cpf.length !== 11 || cepDigitos.length !== 8 || uf.length !== 2) {
    return null;
  }

  const textoComplemento =
    typeof complemento === "string" && complemento.trim()
      ? complemento.trim()
      : null;

  //ENDERECO_CLIENTE continua obrigatorio no banco: monta o endereco completo
  const endereco = [
    bairro.trim(),
    numero.trim(),
    textoComplemento,
    cidade.trim(),
    uf,
    cepDigitos,
  ]
    .filter(Boolean)
    .join(", ");

  return [
    nomeCliente.trim(),
    dataNascimento,
    cpf,
    rgCliente.trim(),
    emailCliente.trim(),
    endereco,
    telefone.trim(),
    telComercial.trim(),
    cepDigitos,
    cidade.trim(),
    uf,
    bairro.trim(),
    numero.trim(),
    textoComplemento,
  ];
}

class UsuarioController {
  async cadastrar(req, res) {
    const dados = lerDadosCliente(req.body);
    if (!dados) {
      return res.send({ ok: false });
    }

    const { senhaCliente } = req.body;
    const usuario = new Cliente(
      0,
      ...dados,
      typeof senhaCliente === "string" ? senhaCliente : null,
    );
    const id = await usuario.cadastrarComId();
    return res.send({ ok: Number.isSafeInteger(id) && id > 0, id });
  }

  async listar(req, res) {
    const usuarios = await new Cliente().listar();
    return res.send(
      usuarios.map((usuario) => ({
        id: usuario.id,
        nomeCliente: usuario.nomeCliente,
        dataNascimento: usuario.dataNascimento,
        cpfCliente: usuario.cpfCliente,
        rgCliente: usuario.rgCliente,
        emailCliente: usuario.emailCliente,
        enderecoCliente: usuario.enderecoCliente,
        telefone: usuario.telefone,
        telComercial: usuario.telComercial,
        cep: usuario.cep,
        cidade: usuario.cidade,
        estado: usuario.estado,
        bairro: usuario.bairro,
        numero: usuario.numero,
        complemento: usuario.complemento,
      })),
    );
  }

  async alterar(req, res) {
    const idUsuario = Number(req.body.id);
    const dados = lerDadosCliente(req.body);

    if (!Number.isSafeInteger(idUsuario) || idUsuario <= 0 || !dados) {
      return res.send({ ok: false });
    }

    const usuario = new Cliente(idUsuario, ...dados);
    const okRetornoBanco = await usuario.alterar();
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

module.exports = UsuarioController;
