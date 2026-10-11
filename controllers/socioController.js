const Socio = require("../models/socioModel");

class SocioController {
  async cadastrar(req, res) {
    let id = req.body.id;
    let dataAdesao = req.body.dataAdesao;
    let dataVencimento = req.body.dataVencimento;

    if (
      id && id > 0 &&
      typeof dataAdesao == "string" && dataAdesao.trim() != "" &&
      typeof dataVencimento == "string" && dataVencimento.trim() != ""
    ) {
      let socio = new Socio(id, dataAdesao, dataVencimento);
      let okRetornoBanco = await socio.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  async listar(req, res) {
    //traz os dados do cliente junto, para o gerenciamento no pageAdm
    let socios = await new Socio().listarDetalhado();

    let lista = [];
    for (let i = 0; i < socios.length; i++) {
      let socio = socios[i];
      lista.push({
        id: socio.ID_CLIENTE,
        nomeCliente: socio.NOME_CLIENTE,
        dataNascimento: socio.DATA_NASCIMENTO,
        cpfCliente: socio.CPF_CLIENTE,
        rgCliente: socio.RG_CLIENTE,
        emailCliente: socio.EMAIL_CLIENTE,
        telefone: socio.TELEFONE,
        telComercial: socio.TEL_COMERCIAL,
        cep: socio.CEP,
        cidade: socio.CIDADE,
        estado: socio.ESTADO,
        bairro: socio.BAIRRO,
        numero: socio.NUMERO,
        complemento: socio.COMPLEMENTO,
        dataAdesao: socio.DATA_ADESAO,
        dataVencimento: socio.DATA_VENCIMENTO,
      });
    }
    res.send(lista);
  }

  async alterar(req, res) {
    let id = req.body.id;
    let dataAdesao = req.body.dataAdesao;
    let dataVencimento = req.body.dataVencimento;

    if (
      id && id > 0 &&
      typeof dataAdesao == "string" && dataAdesao.trim() != "" &&
      typeof dataVencimento == "string" && dataVencimento.trim() != ""
    ) {
      let socio = new Socio(id, dataAdesao, dataVencimento);
      let okRetornoBanco = await socio.alterar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }
}

module.exports = SocioController;
