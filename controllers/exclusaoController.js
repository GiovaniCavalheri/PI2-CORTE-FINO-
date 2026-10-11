const Cliente = require("../models/clientesModel");
const Administrador = require("../models/administradorModel");
const Fornecedor = require("../models/fornecedorModel");
const Socio = require("../models/socioModel");

class ExclusaoController {
  async excluirUsuario(req, res) {
    let idExclusao = req.params.id;
    if (idExclusao && idExclusao > 0) {
      let cliente = new Cliente();
      let temPedidos = await cliente.possuiPedidosEmAberto(idExclusao);
      if (temPedidos) {
        res.send({
          ok: false,
          erro: "Este cliente possui pedidos em aberto e não pode ser excluído.",
        });
      } else {
        let result = await cliente.excluir(idExclusao);
        res.send({ ok: result });
      }
    } else {
      res.send({ ok: false });
    }
  }

  async excluirAdministrador(req, res) {
    let idExclusao = req.params.id;
    if (idExclusao && idExclusao > 0) {
      let administrador = new Administrador();
      let result = await administrador.excluir(idExclusao);
      res.send({ ok: result });
    } else {
      res.send({ ok: false });
    }
  }

  async excluirFornecedor(req, res) {
    let idExclusao = req.params.id;
    if (idExclusao && idExclusao > 0) {
      let fornecedor = new Fornecedor();
      let temCompras = await fornecedor.possuiCompras(idExclusao);
      if (temCompras) {
        res.send({
          ok: false,
          erro: "Este fornecedor possui compras registradas e não pode ser excluído.",
        });
      } else {
        let result = await fornecedor.excluir(idExclusao);
        res.send({ ok: result });
      }
    } else {
      res.send({ ok: false });
    }
  }

  async excluirSocio(req, res) {
    let idExclusao = req.params.id;
    if (idExclusao && idExclusao > 0) {
      //o socio e um CLIENTE (ID_SOCIO = ID_CLIENTE): os pedidos ficam no cliente
      let cliente = new Cliente();
      let temPedidos = await cliente.possuiPedidosEmAberto(idExclusao);
      if (temPedidos) {
        res.send({
          ok: false,
          erro: "Este sócio possui pedidos em aberto e não pode ser excluído.",
        });
      } else {
        let socio = new Socio();
        let result = await socio.excluir(idExclusao);
        res.send({ ok: result });
      }
    } else {
      res.send({ ok: false });
    }
  }
}

module.exports = ExclusaoController;
