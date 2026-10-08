const CategoriasProduto = require("../models/categoriaProdutoModel");

class CategoriaController {
  async listar(req, res) {
    const categorias = await new CategoriasProduto().listar();
    return res.send(
      categorias.map((categoria) => ({
        id: categoria.id,
        nomeCategoria: categoria.nomeCategoria,
        descricao: categoria.descricao,
      })),
    );
  }

  async cadastrar(req, res) {
    const { nome, descricao } = req.body;
    if (typeof nome !== "string" || !nome.trim()) {
      return res.send({ ok: false });
    }

    const categoria = new CategoriasProduto(
      0,
      nome.trim(),
      typeof descricao === "string" ? descricao.trim() : "",
    );
    const okRetornoBanco = await categoria.cadastrar();
    return res.send({ ok: okRetornoBanco });
  }

  async alterar(req, res) {
    const { id, nome, descricao } = req.body;
    const idCategoria = Number(id);

    if (
      !Number.isSafeInteger(idCategoria) ||
      idCategoria <= 0 ||
      typeof nome !== "string" ||
      !nome.trim()
    ) {
      return res.send({ ok: false });
    }

    const categoria = new CategoriasProduto(
      idCategoria,
      nome.trim(),
      typeof descricao === "string" ? descricao.trim() : "",
    );
    const okRetornoBanco = await categoria.alterar();
    return res.send({ ok: okRetornoBanco });
  }

  async excluir(req, res) {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.send({ ok: false });
    }
    const categoria = new CategoriasProduto();
    const okRetornoBanco = await categoria.excluir(id);
    return res.send({ ok: okRetornoBanco });
  }
}

module.exports = CategoriaController;
