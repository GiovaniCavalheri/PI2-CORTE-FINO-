const Fornecedor = require("../models/fornecedorModel");

class FornecedorController {
  async cadastrar(req, res) {
    const { cnpjFornecedor, nomeFornecedor, emailFornecedor, telefone } =
      req.body;

    if (
      !camposTextoValidos([
        cnpjFornecedor,
        nomeFornecedor,
        emailFornecedor,
        telefone,
      ])
    ) {
      return res.send({ ok: false });
    }

    const fornecedor = new Fornecedor(
      0,
      cnpjFornecedor.trim(),
      nomeFornecedor.trim(),
      emailFornecedor.trim(),
      telefone.trim(),
    );
    const okRetornoBanco = await fornecedor.cadastrar();

    return res.send({ ok: okRetornoBanco });
  }

  async listar(req, res) {
    const fornecedores = await new Fornecedor().listar();
    return res.send(
      fornecedores.map((fornecedor) => ({
        id: fornecedor.id,
        cnpjFornecedor: fornecedor.cnpjFornecedor,
        nomeFornecedor: fornecedor.nomeFornecedor,
        emailFornecedor: fornecedor.emailFornecedor,
        telefone: fornecedor.telefone,
      })),
    );
  }

  async alterar(req, res) {
    const { id, cnpjFornecedor, nomeFornecedor, emailFornecedor, telefone } =
      req.body;
    const idFornecedor = Number(id);

    if (
      !Number.isSafeInteger(idFornecedor) ||
      idFornecedor <= 0 ||
      !camposTextoValidos([
        cnpjFornecedor,
        nomeFornecedor,
        emailFornecedor,
        telefone,
      ])
    ) {
      return res.send({ ok: false });
    }

    const fornecedor = new Fornecedor(
      idFornecedor,
      cnpjFornecedor.trim(),
      nomeFornecedor.trim(),
      emailFornecedor.trim(),
      telefone.trim(),
    );
    const okRetornoBanco = await fornecedor.alterar();
    return res.send({ ok: okRetornoBanco });
  }
}

function camposTextoValidos(campos) {
  return campos.every(
    (campo) => typeof campo === "string" && campo.trim().length > 0,
  );
}

module.exports = FornecedorController;
