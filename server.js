const express = require("express");
const router = require("./routes/routes");

const server = express();
const PORT = process.env.PORT || 4000;

server.set("view engine", "ejs");
server.set("views", "./views");
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(router);

server.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
