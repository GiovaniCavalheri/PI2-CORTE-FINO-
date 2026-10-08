const Administrador = require("../models/administradorModel");

class AdministradorController {
  async cadastrar(req, res) {
    const { nomeAdm, emailAdm, senhaAdm } = req.body;

    if (
      !camposTextoValidos([nomeAdm, emailAdm, senhaAdm])
    ) {
      return res.send({ ok: false });
    }

    const administrador = new Administrador(
      0,
      nomeAdm.trim(),
      emailAdm.trim(),
      senhaAdm,
    );
    const okRetornoBanco = await administrador.cadastrar();

    return res.send({ ok: okRetornoBanco });
  }
}

function camposTextoValidos(campos) {
  return campos.every(
    (campo) => typeof campo === "string" && campo.trim().length > 0,
  );
}

module.exports = AdministradorController;
