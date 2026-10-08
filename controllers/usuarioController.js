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
    const okRetornoBanco = await usuario.cadastrar();

    return res.send({ ok: okRetornoBanco });
  }
}

function camposTextoValidos(campos) {
  return campos.every(
    (campo) => typeof campo === "string" && campo.trim().length > 0,
  );
}

module.exports = UsuarioController;
