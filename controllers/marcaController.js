const Marca = require("../models/marcaModel");

class MarcaController {
  async listar(req, res) {
    const marcas = await new Marca().listar();
    return res.send(
      marcas.map((marca) => ({
        id: marca.id,
        nomeMarca: marca.nomeMarca,
      })),
    );
  }

  async cadastrar(req, res) {
    const { nome } = req.body;
    if (typeof nome !== "string" || !nome.trim()) {
      return res.send({ ok: false });
    }

    const marca = new Marca(0, nome.trim());
    const okRetornoBanco = await marca.cadastrar();
    return res.send({ ok: okRetornoBanco });
  }

  async alterar(req, res) {
    const { id, nome } = req.body;
    const idMarca = Number(id);

    if (
      !Number.isSafeInteger(idMarca) ||
      idMarca <= 0 ||
      typeof nome !== "string" ||
      !nome.trim()
    ) {
      return res.send({ ok: false });
    }

    const marca = new Marca(idMarca, nome.trim());
    const okRetornoBanco = await marca.alterar();
    return res.send({ ok: okRetornoBanco });
  }

  //exclusao via fetch
  async excluir(req, res) {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.send({ ok: false });
    }
    const marca = new Marca();
    const okRetornoBanco = await marca.excluir(id);
    return res.send({ ok: okRetornoBanco });
  }
}

module.exports = MarcaController;
