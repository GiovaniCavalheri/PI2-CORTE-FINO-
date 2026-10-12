const Administrador = require("../models/administradorModel");

function textoPreenchido(valor) {
  return typeof valor == "string" && valor.trim() != "";
}

class AdministradorController {
  async cadastrar(req, res) {
    let nomeAdm = req.body.nomeAdm;
    let emailAdm = req.body.emailAdm;
    let senhaAdm = req.body.senhaAdm;

    if (
      textoPreenchido(nomeAdm) &&
      textoPreenchido(emailAdm) &&
      textoPreenchido(senhaAdm)
    ) {
      let administrador = new Administrador(
        0,
        nomeAdm.trim(),
        emailAdm.trim(),
        senhaAdm,
      );
      let okRetornoBanco = await administrador.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  async listar(req, res) {
    let administradores = await new Administrador().listar();

    //monta a lista sem a senha
    let lista = [];
    for (let i = 0; i < administradores.length; i++) {
      lista.push({
        id: administradores[i].id,
        nomeAdm: administradores[i].nomeAdm,
        emailAdm: administradores[i].emailAdm,
      });
    }
    res.send(lista);
  }

  //altera nome/e-mail, a senha, ou os dois (depende do que vier no body)
  async alterar(req, res) {
    let id = req.body.id;
    let nomeAdm = req.body.nomeAdm;
    let emailAdm = req.body.emailAdm;
    let senhaAdm = req.body.senhaAdm;

    let alterarDados = nomeAdm !== undefined || emailAdm !== undefined;
    let alterarSenha = textoPreenchido(senhaAdm);

    //precisa de um id valido e de alguma coisa para alterar
    if (!(id && id > 0) || (!alterarDados && !alterarSenha)) {
      res.send({ ok: false });
      return;
    }
    //se for alterar os dados, nome e e-mail sao obrigatorios
    if (alterarDados && (!textoPreenchido(nomeAdm) || !textoPreenchido(emailAdm))) {
      res.send({ ok: false });
      return;
    }

    let administrador = new Administrador(id, undefined, undefined, senhaAdm);
    if (alterarDados) {
      administrador.nomeAdm = nomeAdm.trim();
      administrador.emailAdm = emailAdm.trim();
    }

    let okDados = true;
    if (alterarDados) {
      okDados = await administrador.alterar();
    }
    let okSenha = true;
    if (alterarSenha) {
      okSenha = await administrador.alterarSenha();
    }

    res.send({ ok: okDados && okSenha });
  }
}

module.exports = AdministradorController;
