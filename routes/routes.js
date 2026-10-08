const express = require("express");
const HomeController = require("../controllers/homeController");
const ProdutoController = require("../controllers/produtoController");
const CategoriaController = require("../controllers/categoriaController");
const MarcaController = require("../controllers/marcaController");

const router = express.Router();

let home = new HomeController();
let produto = new ProdutoController();
let categoria = new CategoriaController();
let marca = new MarcaController();

//paginas do site
router.get("/", home.indexView);
router.get("/about", home.aboutView);
router.get("/services", home.servicesView);
router.get("/contact", home.contactView);
router.get("/offers", home.offersView);
router.get("/signatures", home.signaturesView);
router.get("/join", home.joinView);
router.get("/cart", home.cartView);
router.get("/cadastro", home.cadastroView);
router.get("/adm", home.admView);

//produtos
router.get("/products", produto.produtosView);
router.get("/pageAdm", produto.painelView);
router.post("/produto/cadastrar", produto.cadastrar);
router.post("/produto/alterar", produto.alterar);
router.delete("/produto/excluir/:id", produto.excluir);

//categorias
router.post("/categoria/cadastrar", categoria.cadastrar);
router.delete("/categoria/excluir/:id", categoria.excluir);

//marcas
router.post("/marca/cadastrar", marca.cadastrar);
router.delete("/marca/excluir/:id", marca.excluir);

module.exports = router;
