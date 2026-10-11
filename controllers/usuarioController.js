const Cliente = require("../models/clientesModel");

//true se o valor for um texto que nao esta vazio
function textoPreenchido(valor) {
  return typeof valor == "string" && valor.trim() != "";
}

//campo opcional: devolve o texto sem espacos nas pontas, ou null se veio vazio
function textoOuNulo(valor) {
  if (textoPreenchido(valor)) {
    return valor.trim();
  }
  return null;
}

//tira tudo que nao for numero: "123.456.789-00" -> "12345678900"
function somenteDigitos(valor) {
  return valor.replace(/\D/g, "");
}

//confere os campos do formulario e monta o cliente.
//devolve null se algum campo estiver errado
//obrigatorios: nome, data de nascimento, CPF, e-mail e celular (telefone)
//opcionais: RG, telefone comercial e endereco (CEP, cidade, UF, bairro, numero, complemento)
function montarCliente(id, body, senha) {
  if (
    !textoPreenchido(body.nomeCliente) ||
    !textoPreenchido(body.dataNascimento) ||
    !textoPreenchido(body.cpfCliente) ||
    !textoPreenchido(body.emailCliente) ||
    !textoPreenchido(body.telefone)
  ) {
    return null;
  }

  //data no formato do banco: 2000-12-31
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.dataNascimento)) {
    return null;
  }

  //CPF_CLIENTE no banco guarda somente os digitos
  let cpf = somenteDigitos(body.cpfCliente);
  if (cpf.length != 11) {
    return null;
  }

  let rg = textoOuNulo(body.rgCliente);
  let telComercial = textoOuNulo(body.telComercial);
  let cidade = textoOuNulo(body.cidade);
  let bairro = textoOuNulo(body.bairro);
  let numero = textoOuNulo(body.numero);
  let complemento = textoOuNulo(body.complemento);

  //CEP e UF sao opcionais, mas se vierem tem que estar completos
  let cep = textoOuNulo(body.cep);
  if (cep != null) {
    cep = somenteDigitos(cep);
    if (cep.length != 8) {
      return null;
    }
  }
  let uf = textoOuNulo(body.estado);
  if (uf != null) {
    uf = uf.toUpperCase();
    if (uf.length != 2) {
      return null;
    }
  }

  //ENDERECO_CLIENTE: junta as partes preenchidas ("Centro, 100, Sao Paulo, SP, 01001000")
  let partes = [bairro, numero, complemento, cidade, uf, cep];
  let endereco = null;
  for (let i = 0; i < partes.length; i++) {
    if (partes[i] != null) {
      if (endereco == null) {
        endereco = partes[i];
      } else {
        endereco = endereco + ", " + partes[i];
      }
    }
  }

  return new Cliente(
    id,
    body.nomeCliente.trim(),
    body.dataNascimento,
    cpf,
    rg,
    body.emailCliente.trim(),
    endereco,
    body.telefone.trim(),
    telComercial,
    cep,
    cidade,
    uf,
    bairro,
    numero,
    complemento,
    senha,
  );
}

class UsuarioController {
  async cadastrar(req, res) {
    let senha = null;
    if (typeof req.body.senhaCliente == "string") {
      senha = req.body.senhaCliente;
    }

    let usuario = montarCliente(0, req.body, senha);
    if (usuario != null) {
      //devolve o id gerado: o cadastro de socio usa esse id
      let id = await usuario.cadastrarComId();
      res.send({ ok: id > 0, id: id });
    } else {
      res.send({ ok: false });
    }
  }

  async listar(req, res) {
    let usuarios = await new Cliente().listar();

    //monta a lista sem a senha
    let lista = [];
    for (let i = 0; i < usuarios.length; i++) {
      let usuario = usuarios[i];
      lista.push({
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
      });
    }
    res.send(lista);
  }

  async alterar(req, res) {
    let id = req.body.id;
    //na alteracao a senha nao muda
    let usuario = montarCliente(id, req.body, undefined);
    if (id && id > 0 && usuario != null) {
      let okRetornoBanco = await usuario.alterar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }
}

module.exports = UsuarioController;
