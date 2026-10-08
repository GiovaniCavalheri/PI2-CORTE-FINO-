const Produtos = require("../models/produtosModel");
const CategoriasProduto = require("../models/categoriaProdutoModel");
const Marca = require("../models/marcaModel");

function lerDadosProduto(body) {
  const categoria = Number(body.categoria);
  const marca = Number(body.marca);
  const preco = Number(body.preco);
  const estoque = Number(body.estoque);

  if (
    typeof body.nome !== "string" ||
    !body.nome.trim() ||
    !Number.isSafeInteger(categoria) ||
    categoria <= 0 ||
    !Number.isSafeInteger(marca) ||
    marca <= 0 ||
    body.preco === "" ||
    !Number.isFinite(preco) ||
    preco < 0 ||
    body.estoque === "" ||
    !Number.isSafeInteger(estoque) ||
    estoque < 0 ||
    (body.descricao !== undefined && typeof body.descricao !== "string")
  ) {
    return null;
  }

  return [
    categoria,
    marca,
    body.nome.trim(),
    typeof body.descricao === "string" ? body.descricao.trim() : "",
    preco,
    estoque,
  ];
}

class ProdutoController {
  async listar(req, res) {
    const produtos = await new Produtos().listarDetalhado();
    return res.send(produtos);
  }

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

  async cadastrar(req, res) {
    const dados = lerDadosProduto(req.body);
    if (!dados) {
      return res.send({ ok: false });
    }
    const produto = new Produtos(0, ...dados);
    const okRetornoBanco = await produto.cadastrar();
    return res.send({ ok: okRetornoBanco });
  }

  async alterar(req, res) {
    const id = Number(req.body.id);
    const dados = lerDadosProduto(req.body);
    if (!Number.isSafeInteger(id) || id <= 0 || !dados) {
      return res.send({ ok: false });
    }
    const produto = new Produtos(id, ...dados);
    const okRetornoBanco = await produto.alterar();
    return res.send({ ok: okRetornoBanco });
  }

  //exclusao via fetch
  async excluir(req, res) {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.send({ ok: false });
    }
    const produto = new Produtos();
    const okRetornoBanco = await produto.excluir(id);
    return res.send({ ok: okRetornoBanco });
  }

}

module.exports = ProdutoController;
