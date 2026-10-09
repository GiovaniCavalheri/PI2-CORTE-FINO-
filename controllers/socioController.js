const Socio = require("../models/socioModel");

class SocioController {
  async cadastrar(req, res) {
    const { id, dataAdesao, dataVencimento } = req.body;
    const idSocio = Number(id);

    if (
      !Number.isSafeInteger(idSocio) ||
      idSocio <= 0 ||
      typeof dataAdesao !== "string" ||
      !dataAdesao.trim() ||
      typeof dataVencimento !== "string" ||
      !dataVencimento.trim()
    ) {
      return res.send({ ok: false });
    }

    const socio = new Socio(idSocio, dataAdesao, dataVencimento);
    const okRetornoBanco = await socio.cadastrar();

    return res.send({ ok: okRetornoBanco });
  }

  async listar(req, res) {
    //traz os dados do cliente junto, para o gerenciamento no pageAdm
    const socios = await new Socio().listarDetalhado();
    return res.send(
      socios.map((socio) => ({
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
      })),
    );
  }

  async alterar(req, res) {
    const { id, dataAdesao, dataVencimento } = req.body;
    const idSocio = Number(id);

    if (
      !Number.isSafeInteger(idSocio) ||
      idSocio <= 0 ||
      typeof dataAdesao !== "string" ||
      !dataAdesao.trim() ||
      typeof dataVencimento !== "string" ||
      !dataVencimento.trim()
    ) {
      return res.send({ ok: false });
    }

    const socio = new Socio(idSocio, dataAdesao, dataVencimento);
    const okRetornoBanco = await socio.alterar();
    return res.send({ ok: okRetornoBanco });
  }
}

module.exports = SocioController;
