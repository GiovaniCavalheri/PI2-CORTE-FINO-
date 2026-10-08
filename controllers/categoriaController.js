const CategoriasProduto = require("../models/categoriaProdutoModel");

class CategoriaController {
  //gravacao via fetch
  async cadastrar(req, res) {
    if (req.body.nome != "") {
      let categoria = new CategoriasProduto(0, req.body.nome, req.body.descricao);
      let okRetornoBanco = await categoria.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  //exclusao via fetch
  async excluir(req, res) {
    let id = req.params.id;
    let categoria = new CategoriasProduto();
    let okRetornoBanco = await categoria.excluir(id);
    res.send({ ok: okRetornoBanco });
  }
}

module.exports = CategoriaController;
