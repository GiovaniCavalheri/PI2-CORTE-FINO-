const Produtos = require("../models/produtosModel");
const CategoriasProduto = require("../models/categoriaProdutoModel");
const Marca = require("../models/marcaModel");

//confere os campos do formulario e monta o produto.
//devolve null se algum campo estiver errado
function montarProduto(id, body) {
  let categoria = Number(body.categoria);
  let marca = Number(body.marca);
  let preco = Number(body.preco);
  let estoque = Number(body.estoque);

  //nome obrigatorio
  if (typeof body.nome != "string" || body.nome.trim() == "") {
    return null;
  }
  //categoria e marca: id inteiro maior que zero
  if (!Number.isInteger(categoria) || categoria <= 0) {
    return null;
  }
  if (!Number.isInteger(marca) || marca <= 0) {
    return null;
  }
  //preco: numero maior ou igual a zero
  if (body.preco === "" || !Number.isFinite(preco) || preco < 0) {
    return null;
  }
  //estoque: inteiro maior ou igual a zero
  if (body.estoque === "" || !Number.isInteger(estoque) || estoque < 0) {
    return null;
  }
  //descricao e opcional, mas se vier tem que ser texto
  let descricao = "";
  if (body.descricao !== undefined) {
    if (typeof body.descricao != "string") {
      return null;
    }
    descricao = body.descricao.trim();
  }

  return new Produtos(
    id,
    categoria,
    marca,
    body.nome.trim(),
    descricao,
    preco,
    estoque,
  );
}

class ProdutoController {
  async listar(req, res) {
    let produtos = await new Produtos().listarDetalhado();
    res.send(produtos);
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
    let produto = montarProduto(0, req.body);
    if (produto != null) {
      let okRetornoBanco = await produto.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  async alterar(req, res) {
    let id = req.body.id;
    let produto = montarProduto(id, req.body);
    if (id && id > 0 && produto != null) {
      let okRetornoBanco = await produto.alterar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  //exclusao via fetch
  async excluir(req, res) {
    let idExclusao = req.params.id;
    if (idExclusao && idExclusao > 0) {
      let produto = new Produtos();
      if (await produto.possuiPedidos(idExclusao)) {
        res.send({
          ok: false,
          erro: "Este produto está em pedidos e não pode ser excluído.",
        });
      } else if (await produto.possuiLotes(idExclusao)) {
        res.send({
          ok: false,
          erro: "Este produto possui lotes no estoque e não pode ser excluído.",
        });
      } else if (await produto.possuiPromocoes(idExclusao)) {
        res.send({
          ok: false,
          erro: "Este produto está em uma promoção e não pode ser excluído.",
        });
      } else {
        let result = await produto.excluir(idExclusao);
        res.send({ ok: result });
      }
    } else {
      res.send({ ok: false });
    }
  }
}

module.exports = ProdutoController;
