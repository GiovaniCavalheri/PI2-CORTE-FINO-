const CategoriasProduto = require("../models/categoriaProdutoModel");

class CategoriaController {
  async listar(req, res) {
    let categorias = await new CategoriasProduto().listar();

    //monta a lista so com os campos que a tela usa
    let lista = [];
    for (let i = 0; i < categorias.length; i++) {
      lista.push({
        id: categorias[i].id,
        nomeCategoria: categorias[i].nomeCategoria,
        descricao: categorias[i].descricao,
      });
    }
    res.send(lista);
  }

  async cadastrar(req, res) {
    let nome = req.body.nome;
    let descricao = req.body.descricao;

    if (typeof nome == "string" && nome.trim() != "") {
      if (typeof descricao == "string") {
        descricao = descricao.trim();
      } else {
        descricao = "";
      }

      let categoria = new CategoriasProduto(0, nome.trim(), descricao);
      let okRetornoBanco = await categoria.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  async alterar(req, res) {
    let id = req.body.id;
    let nome = req.body.nome;
    let descricao = req.body.descricao;

    if (id && id > 0 && typeof nome == "string" && nome.trim() != "") {
      if (typeof descricao == "string") {
        descricao = descricao.trim();
      } else {
        descricao = "";
      }

      let categoria = new CategoriasProduto(id, nome.trim(), descricao);
      let okRetornoBanco = await categoria.alterar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  async excluir(req, res) {
    let idExclusao = req.params.id;
    if (idExclusao && idExclusao > 0) {
      let categoria = new CategoriasProduto();
      let temProdutos = await categoria.possuiProdutos(idExclusao);
      if (temProdutos) {
        res.send({
          ok: false,
          erro: "Esta categoria possui produtos vinculados e não pode ser excluída.",
        });
      } else {
        let result = await categoria.excluir(idExclusao);
        res.send({ ok: result });
      }
    } else {
      res.send({ ok: false });
    }
  }
}

module.exports = CategoriaController;
