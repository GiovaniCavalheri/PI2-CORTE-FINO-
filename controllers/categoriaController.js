const CategoriasProduto = require("../models/categoriaProdutoModel");

class CategoriaController {
  async cadastrar(req, res) {
    if (req.body.nome != "") {
      let categoria = new CategoriasProduto(0, req.body.nome, req.body.descricao);
      let okRetornoBanco = await categoria.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  async excluir(req, res) {
    let id = req.params.id;
    let categoria = new CategoriasProduto();
    let okRetornoBanco = await categoria.excluir(id);
    res.send({ ok: okRetornoBanco });
  }
}

module.exports = CategoriaController;
