const Administrador = require("../models/administradorModel");
const Cliente = require("../models/clientesModel");
const Fornecedor = require("../models/fornecedorModel");

//TEMPORARIO: compara a senha em texto puro; o login do site so grava um
//cookie com id/nome/tipo para o header mostrar o nome (nao e uma sessao segura)
const DURACAO_COOKIE = 1000 * 60 * 60 * 8; //8 horas

//true se e-mail e senha vieram preenchidos
function credenciaisValidas(email, senha) {
  return (
    typeof email == "string" && email.trim() != "" &&
    typeof senha == "string" && senha != ""
  );
}

class LoginController {
  async loginAdministrador(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;

    if (!credenciaisValidas(email, senha)) {
      res.send({ ok: false });
      return;
    }

    let administrador = await new Administrador().buscarPorEmail(email.trim());
    if (administrador != null && administrador.verificarSenha(senha)) {
      res.send({
        ok: true,
        id: administrador.id,
        nome: administrador.nomeAdm,
      });
    } else {
      res.send({ ok: false });
    }
  }

  //login do site: procura o e-mail em CLIENTE (socio) e depois em FORNECEDOR
  async login(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;

    if (!credenciaisValidas(email, senha)) {
      res.send({ ok: false });
      return;
    }
    email = email.trim();

    //o e-mail pode se repetir: procura o cliente que tem essa senha
    let clientes = await new Cliente().buscarPorEmail(email);
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].verificarSenha(senha)) {
        let usuario = {
          id: clientes[i].id,
          nome: clientes[i].nomeCliente,
          tipo: "socio",
        };
        res.cookie("usuario", usuario, { maxAge: DURACAO_COOKIE, sameSite: "lax" });
        res.send({ ok: true, id: usuario.id, nome: usuario.nome, tipo: usuario.tipo });
        return;
      }
    }

    //nao achou em CLIENTE: procura em FORNECEDOR
    let fornecedores = await new Fornecedor().buscarPorEmail(email);
    for (let i = 0; i < fornecedores.length; i++) {
      if (fornecedores[i].verificarSenha(senha)) {
        let usuario = {
          id: fornecedores[i].id,
          nome: fornecedores[i].nomeFornecedor,
          tipo: "fornecedor",
        };
        res.cookie("usuario", usuario, { maxAge: DURACAO_COOKIE, sameSite: "lax" });
        res.send({ ok: true, id: usuario.id, nome: usuario.nome, tipo: usuario.tipo });
        return;
      }
    }

    res.send({ ok: false });
  }

  logout(req, res) {
    res.clearCookie("usuario");
    res.redirect("/");
  }
}

module.exports = LoginController;
