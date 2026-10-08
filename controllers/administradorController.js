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

  async listar(req, res) {
    const administradores = await new Administrador().listar();
    return res.send(
      administradores.map((administrador) => ({
        id: administrador.id,
        nomeAdm: administrador.nomeAdm,
        emailAdm: administrador.emailAdm,
      })),
    );
  }

  async alterar(req, res) {
    const { id, nomeAdm, emailAdm, senhaAdm } = req.body;
    const idAdministrador = Number(id);
    const deveAlterarDados =
      nomeAdm !== undefined || emailAdm !== undefined;
    const deveAlterarSenha =
      typeof senhaAdm === "string" && senhaAdm.trim().length > 0;

    if (
      !Number.isSafeInteger(idAdministrador) ||
      idAdministrador <= 0 ||
      (deveAlterarDados && !camposTextoValidos([nomeAdm, emailAdm])) ||
      (!deveAlterarDados && !deveAlterarSenha)
    ) {
      return res.send({ ok: false });
    }

    const administrador = new Administrador(
      idAdministrador,
      deveAlterarDados ? nomeAdm.trim() : undefined,
      deveAlterarDados ? emailAdm.trim() : undefined,
      senhaAdm,
    );
    const okDados = deveAlterarDados ? await administrador.alterar() : true;
    const okSenha = deveAlterarSenha
      ? await administrador.alterarSenha()
      : true;

    return res.send({ ok: okDados && okSenha });
  }
}

function camposTextoValidos(campos) {
  return campos.every(
    (campo) => typeof campo === "string" && campo.trim().length > 0,
  );
}

module.exports = AdministradorController;
