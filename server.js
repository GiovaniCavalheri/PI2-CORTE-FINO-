const express = require("express");
// const cookieParser = require("cookie-parser");
const router = require("./routes/routes");

const server = express();
const PORT = process.env.PORT || 5000;
server.set("view engine", "ejs");
server.set("views", "./views");
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//server.use(router) tem que ficar depois do JSON, pois se caso ficar antes
//o "req.body" ainda não recebe nada do JSON, e causando o erro de requisição

server.use(router);
// server.use(cookieParser());

server.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
