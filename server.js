const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");

const server = express();
const PORT = process.env.PORT || 5000;

server.set("view engine", "ejs");
server.set("views", "./views");
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

//usuario logado (cookie gravado no login) disponivel em todas as views
server.use((req, res, next) => {
  const usuario = req.cookies.usuario;
  res.locals.usuarioLogado =
    usuario && typeof usuario === "object" && usuario.nome ? usuario : null;
  next();
});

server.use(router);

//erros do banco (ex.: CPF/CNPJ duplicado) voltam como JSON em vez de pagina 500
server.use((err, req, res, next) => {
  console.error(err);
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).send({ ok: false, erro: "Registro já cadastrado." });
  }
  //exclusao bloqueada por chave estrangeira (ex.: marca usada por um produto)
  if (err.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(409).send({
      ok: false,
      erro: "Este registro está sendo usado em outro cadastro e não pode ser excluído.",
    });
  }
  return res
    .status(err.status || 500)
    .send({ ok: false, erro: err.sqlMessage || err.message });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
