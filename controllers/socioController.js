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
}

module.exports = SocioController;
