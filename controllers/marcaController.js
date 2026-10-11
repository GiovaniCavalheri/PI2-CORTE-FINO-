const Marca = require("../models/marcaModel");

class MarcaController {
  async listar(req, res) {
    let marcas = await new Marca().listar();

    //monta a lista so com os campos que a tela usa
    let lista = [];
    for (let i = 0; i < marcas.length; i++) {
      lista.push({
        id: marcas[i].id,
        nomeMarca: marcas[i].nomeMarca,
      });
    }
    res.send(lista);
  }

  async cadastrar(req, res) {
    let nome = req.body.nome;

    if (typeof nome == "string" && nome.trim() != "") {
      let marca = new Marca(0, nome.trim());
      let okRetornoBanco = await marca.cadastrar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  async alterar(req, res) {
    let id = req.body.id;
    let nome = req.body.nome;

    if (id && id > 0 && typeof nome == "string" && nome.trim() != "") {
      let marca = new Marca(id, nome.trim());
      let okRetornoBanco = await marca.alterar();
      res.send({ ok: okRetornoBanco });
    } else {
      res.send({ ok: false });
    }
  }

  //exclusao via fetch
  async excluir(req, res) {
    let idExclusao = req.params.id;
    if (idExclusao && idExclusao > 0) {
      let marca = new Marca();
      let temProdutos = await marca.possuiProdutos(idExclusao);
      if (temProdutos) {
        res.send({
          ok: false,
          erro: "Esta marca possui produtos vinculados e não pode ser excluída.",
        });
      } else {
        let result = await marca.excluir(idExclusao);
        res.send({ ok: result });
      }
    } else {
      res.send({ ok: false });
    }
  }
}

module.exports = MarcaController;
