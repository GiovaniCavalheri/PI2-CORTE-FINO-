const Marca = require("../models/marcaModel");

class MarcaController {
  async cadastrar(req, res) {
    if (req.body.nome != "") {
      let marca = new Marca(0, req.body.nome);
      let okRetornoBanco = await marca.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  //exclusao via fetch
  async excluir(req, res) {
    let id = req.params.id;
    let marca = new Marca();
    let okRetornoBanco = await marca.excluir(id);
    res.send({ ok: okRetornoBanco });
  }
}

module.exports = MarcaController;
