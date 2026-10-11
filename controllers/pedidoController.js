const Pedidos = require("../models/classPedidos");

//valores aceitos pela coluna STATUS_PEDIDO (enum do banco)
const STATUS_PEDIDO = [
  "Aguardando Separação",
  "Em Andamento",
  "Aguardando Pagamento",
  "Aguardando Retirada",
  "Em Rota de Entrega",
  "Entregue",
  "Cancelado",
];

class PedidoController {
  async finalizar(req, res) {

    let usuario = res.locals.usuarioLogado;
    if (usuario == null || usuario.tipo != "socio" || !Number.isInteger(usuario.id)) {
      res.send({
        ok: false,
        precisaLogin: true,
        erro: "Entre com sua conta de sócio para finalizar o pedido.",
      });
      return;
    }

    let itens = req.body.itens;
    if (!Array.isArray(itens) || itens.length == 0) {
      res.send({ ok: false, erro: "O carrinho está vazio." });
      return;
    }

    let lista = [];
    let totalItens = 0;
    for (let i = 0; i < itens.length; i++) {
      let item = itens[i];
      if (item == null) {
        res.send({ ok: false, erro: "Item inválido no carrinho." });
        return;
      }

      let idProduto = Number(item.idProduto);
      let quantidade = Number(item.quantidade);
      if (!Number.isInteger(idProduto) || idProduto <= 0 ||
          !Number.isInteger(quantidade) || quantidade <= 0) {
        res.send({ ok: false, erro: "Item inválido no carrinho." });
        return;
      }

      let itemExistente = null;
      for (let j = 0; j < lista.length; j++) {
        if (lista[j].idProduto == idProduto) {
          itemExistente = lista[j];
        }
      }

      if (itemExistente != null) {
        itemExistente.quantidade = itemExistente.quantidade + quantidade;
      } else {
        lista.push({ idProduto: idProduto, quantidade: quantidade });
      }
      totalItens = totalItens + quantidade;
    }

    let resultado = await new Pedidos().finalizar(usuario.id, lista);

    if (resultado.ok) {
      res.send({
        ok: true,
        idPedido: resultado.idPedido,
        valor: resultado.valor,
        totalItens: totalItens,
      });
    } else {
      res.send({
        ok: false,
        idProduto: resultado.idProduto,
        erro: "Estoque insuficiente para um dos produtos.",
      });
    }
  }

  async listar(req, res) {
    let pedidos = await new Pedidos().listarDetalhado();
    res.send(pedidos);
  }

  //tela de Pedidos do admin: muda o status de um pedido
  async alterarStatus(req, res) {
    let id = req.body.id;
    let status = req.body.status;

    if (id && id > 0 && STATUS_PEDIDO.includes(status)) {
      let pedido = new Pedidos();
      let resultado = await pedido.alterarStatus(id, status);
      res.send(resultado);
    } else {
      res.send({ ok: false, erro: "Status inválido." });
    }
  }
}

module.exports = PedidoController;
