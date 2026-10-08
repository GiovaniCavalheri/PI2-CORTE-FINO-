const express = require("express");
const router = require("./routes/routes");

const server = express();
const PORT = process.env.PORT || 4000;

//configurando o EJS como template engine
server.set("view engine", "ejs");
server.set("views", "./views");

//configurando o caminho para a pasta public (css, js, imagens)
server.use(express.static("public"));

//configurando a desserializacao para submissao de formulario (req.body)
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//chamada das nossas rotas
server.use(router);

server.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
