const Cliente = require("../models/clientesModel");
const Administrador = require("../models/administradorModel");
const Fornecedor = require("../models/fornecedorModel");
const Socio = require("../models/socioModel");

function obterIdValido(id) {
  const idNumerico = Number(id);
  return Number.isSafeInteger(idNumerico) && idNumerico > 0
    ? idNumerico
    : null;
}

async function excluir(req, res, Modelo) {
  const id = obterIdValido(req.params.id);
  if (id === null) {
    return res.send({ ok: false });
  }

  const entidade = new Modelo();
  const okRetornoBanco = await entidade.excluir(id);

  return res.send({ ok: okRetornoBanco });
}

class ExclusaoController {
  async excluirUsuario(req, res) {
    return excluir(req, res, Cliente);
  }

  async excluirAdministrador(req, res) {
    return excluir(req, res, Administrador);
  }

  async excluirFornecedor(req, res) {
    return excluir(req, res, Fornecedor);
  }

  async excluirSocio(req, res) {
    return excluir(req, res, Socio);
  }
}

module.exports = ExclusaoController;
