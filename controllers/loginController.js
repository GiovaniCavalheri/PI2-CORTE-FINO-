const Administrador = require("../models/administradorModel");
const Cliente = require("../models/clientesModel");
const Fornecedor = require("../models/fornecedorModel");

//TEMPORARIO: compara a senha em texto puro; o login do site so grava um
//cookie com id/nome/tipo para o header mostrar o nome (nao e uma sessao segura)
const DURACAO_COOKIE = 1000 * 60 * 60 * 8; //8 horas

function gravarUsuarioLogado(res, usuario) {
  res.cookie("usuario", usuario, { maxAge: DURACAO_COOKIE, sameSite: "lax" });
}

function lerCredenciais(body) {
  const { email, senha } = body;
  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof senha !== "string" ||
    !senha
  ) {
    return null;
  }
  return { email: email.trim(), senha };
}

class LoginController {
  async loginAdministrador(req, res) {
    const credenciais = lerCredenciais(req.body);
    if (!credenciais) {
      return res.send({ ok: false });
    }

    const administrador = await new Administrador().buscarPorEmail(
      credenciais.email,
    );
    if (!administrador || !administrador.verificarSenha(credenciais.senha)) {
      return res.send({ ok: false });
    }

    return res.send({
      ok: true,
      id: administrador.id,
      nome: administrador.nomeAdm,
    });
  }

  //login do site: procura o e-mail em CLIENTE (socio) e depois em FORNECEDOR
  async login(req, res) {
    const credenciais = lerCredenciais(req.body);
    if (!credenciais) {
      return res.send({ ok: false });
    }

    const clientes = await new Cliente().buscarPorEmail(credenciais.email);
    const cliente = clientes.find((c) => c.verificarSenha(credenciais.senha));
    if (cliente) {
      const usuario = { id: cliente.id, nome: cliente.nomeCliente, tipo: "socio" };
      gravarUsuarioLogado(res, usuario);
      return res.send({ ok: true, ...usuario });
    }

    const fornecedores = await new Fornecedor().buscarPorEmail(
      credenciais.email,
    );
    const fornecedor = fornecedores.find((f) =>
      f.verificarSenha(credenciais.senha),
    );
    if (fornecedor) {
      const usuario = {
        id: fornecedor.id,
        nome: fornecedor.nomeFornecedor,
        tipo: "fornecedor",
      };
      gravarUsuarioLogado(res, usuario);
      return res.send({ ok: true, ...usuario });
    }

    return res.send({ ok: false });
  }

  logout(req, res) {
    res.clearCookie("usuario");
    return res.redirect("/");
  }
}

module.exports = LoginController;
