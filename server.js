const express = require("express");
// const cookieParser = require("cookie-parser");
const router = require("./routes/routes");

const server = express();
const PORT = process.env.PORT || 5000;
server.use(router);
server.set("view engine", "ejs");
server.set("views", "./views");
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// server.use(cookieParser());

server.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
