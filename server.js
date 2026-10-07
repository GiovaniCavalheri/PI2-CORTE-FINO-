const express = require("express");

const server = express();
const PORT = process.env || 4000;

server.set("view engine", "ejs");
server.use(express.urlencoded());

server.use(router);

server.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
