const Produtos = require("../models/produtosModel");
const CategoriasProduto = require("../models/categoriaProdutoModel");
const Marca = require("../models/marcaModel");

class ProdutoController {
  async produtosView(req, res) {
    let produtos = await new Produtos().listarDetalhado();
    res.render("products", { produtos: produtos });
  }

  async painelView(req, res) {
    let produtos = await new Produtos().listarDetalhado();
    let categorias = await new CategoriasProduto().listar();
    let marcas = await new Marca().listar();

    res.render("pageAdm", {
      produtos: produtos,
      categorias: categorias,
      marcas: marcas,
    });
  }

  //gravacao via fetch
  async cadastrar(req, res) {
    if (
      req.body.nome != "" &&
      req.body.categoria != "" &&
      req.body.marca != "" &&
      req.body.preco != "" &&
      req.body.estoque != ""
    ) {
      let produto = new Produtos(
        0,
        req.body.categoria,
        req.body.marca,
        req.body.nome,
        req.body.descricao,
        req.body.preco,
        req.body.estoque,
      );
      let okRetornoBanco = await produto.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  //alteracao via fetch
  async alterar(req, res) {
    if (
      req.body.id != "" &&
      req.body.nome != "" &&
      req.body.categoria != "" &&
      req.body.marca != "" &&
      req.body.preco != "" &&
      req.body.estoque != ""
    ) {
      let produto = new Produtos(
        req.body.id,
        req.body.categoria,
        req.body.marca,
        req.body.nome,
        req.body.descricao,
        req.body.preco,
        req.body.estoque,
      );
      let okRetornoBanco = await produto.alterar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  //exclusao via fetch
  async excluir(req, res) {
    let id = req.params.id;
    let produto = new Produtos();
    let okRetornoBanco = await produto.excluir(id);
    res.send({ ok: okRetornoBanco });
  }
}

module.exports = ProdutoController;
