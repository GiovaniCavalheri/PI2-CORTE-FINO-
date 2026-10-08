const Cliente = require("../models/clientesModel");

class UsuarioController {
  async cadastrar(req, res) {
    const { cpfCliente, emailCliente, enderecoCliente, telefone, telComercial } =
      req.body;

    if (
      !camposTextoValidos([
        cpfCliente,
        emailCliente,
        enderecoCliente,
        telefone,
        telComercial,
      ])
    ) {
      return res.send({ ok: false });
    }

    const usuario = new Cliente(
      0,
      cpfCliente.trim(),
      emailCliente.trim(),
      enderecoCliente.trim(),
      telefone.trim(),
      telComercial.trim(),
    );
    const id = await usuario.cadastrarComId();
    return res.send({ ok: Number.isSafeInteger(id) && id > 0, id });
  }

  async listar(req, res) {
    const usuarios = await new Cliente().listar();
    return res.send(
      usuarios.map((usuario) => ({
        id: usuario.id,
        cpfCliente: usuario.cpfCliente,
        emailCliente: usuario.emailCliente,
        enderecoCliente: usuario.enderecoCliente,
        telefone: usuario.telefone,
        telComercial: usuario.telComercial,
      })),
    );
  }

  async alterar(req, res) {
    const { id, cpfCliente, emailCliente, enderecoCliente, telefone, telComercial } =
      req.body;
    const idUsuario = Number(id);

    if (
      !Number.isSafeInteger(idUsuario) ||
      idUsuario <= 0 ||
      !camposTextoValidos([
        cpfCliente,
        emailCliente,
        enderecoCliente,
        telefone,
        telComercial,
      ])
    ) {
      return res.send({ ok: false });
    }

    const usuario = new Cliente(
      idUsuario,
      cpfCliente.trim(),
      emailCliente.trim(),
      enderecoCliente.trim(),
      telefone.trim(),
      telComercial.trim(),
    );
    const okRetornoBanco = await usuario.alterar();
    return res.send({ ok: okRetornoBanco });
  }
}

function camposTextoValidos(campos) {
  return campos.every(
    (campo) => typeof campo === "string" && campo.trim().length > 0,
  );
}

module.exports = UsuarioController;
