const Pedidos = require("../models/classPedidos");

class PedidoController {
  //recebe os itens do carrinho, baixa o estoque e grava PEDIDOS + ITENS_PEDIDOS
  async finalizar(req, res) {
    //o pedido e do socio logado (cookie gravado no login do site)
    const usuario = res.locals.usuarioLogado;
    if (!usuario || usuario.tipo !== "socio" || !Number.isSafeInteger(usuario.id)) {
      return res.send({
        ok: false,
        precisaLogin: true,
        erro: "Entre com sua conta de sócio para finalizar o pedido.",
      });
    }

    const { itens } = req.body;
    if (!Array.isArray(itens) || itens.length === 0) {
      return res.send({ ok: false, erro: "O carrinho está vazio." });
    }

    //junta itens repetidos do mesmo produto
    const quantidades = new Map();
    for (const item of itens) {
      const idProduto = Number(item && item.idProduto);
      const quantidade = Number(item && item.quantidade);
      if (
        !Number.isSafeInteger(idProduto) ||
        idProduto <= 0 ||
        !Number.isSafeInteger(quantidade) ||
        quantidade <= 0
      ) {
        return res.send({ ok: false, erro: "Item inválido no carrinho." });
      }
      quantidades.set(idProduto, (quantidades.get(idProduto) || 0) + quantidade);
    }

    const lista = [...quantidades].map(([idProduto, quantidade]) => ({
      idProduto,
      quantidade,
    }));
    const resultado = await new Pedidos().finalizar(usuario.id, lista);

    if (!resultado.ok) {
      return res.send({
        ok: false,
        idProduto: resultado.idProduto,
        erro: "Estoque insuficiente para um dos produtos.",
      });
    }

    const totalItens = lista.reduce((soma, item) => soma + item.quantidade, 0);
    return res.send({
      ok: true,
      idPedido: resultado.idPedido,
      valor: resultado.valor,
      totalItens,
    });
  }

  async listar(req, res) {
    const pedidos = await new Pedidos().listarDetalhado();
    return res.send(pedidos);
  }
}

module.exports = PedidoController;
