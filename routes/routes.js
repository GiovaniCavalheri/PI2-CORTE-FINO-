const express = require("express");
const HomeController = require("../controllers/homeController");
const ProdutoController = require("../controllers/produtoController");
const CategoriaController = require("../controllers/categoriaController");
const MarcaController = require("../controllers/marcaController");
const UsuarioController = require("../controllers/usuarioController");
const AdministradorController = require("../controllers/administradorController");
const FornecedorController = require("../controllers/fornecedorController");
const SocioController = require("../controllers/socioController");
const ExclusaoController = require("../controllers/exclusaoController");

const router = express.Router();

let home = new HomeController();
let produto = new ProdutoController();
let categoria = new CategoriaController();
let marca = new MarcaController();
let usuario = new UsuarioController();
let administrador = new AdministradorController();
let fornecedor = new FornecedorController();
let socio = new SocioController();
let exclusao = new ExclusaoController();

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
router.get("/usuario/cadastrar", home.cadastroView);
router.get("/adm", home.admView);

//produtos
router.get("/products", produto.produtosView);
router.get("/pageAdm", produto.painelView);
router.get("/produto/listar", produto.listar);
router.post("/produto/cadastrar", produto.cadastrar);
router.post("/produto/alterar", produto.alterar);
router.delete("/produto/excluir/:id", produto.excluir);

//categorias
router.get("/categoria/listar", categoria.listar);
router.post("/categoria/cadastrar", categoria.cadastrar);
router.post("/categoria/alterar", categoria.alterar);
router.delete("/categoria/excluir/:id", categoria.excluir);

//marcas
router.get("/marca/listar", marca.listar);
router.post("/marca/cadastrar", marca.cadastrar);
router.post("/marca/alterar", marca.alterar);
router.delete("/marca/excluir/:id", marca.excluir);

//usuarios, administradores, fornecedores e socios
router.get("/usuario/listar", usuario.listar);
router.post("/usuario/cadastrar", usuario.cadastrar);
router.post("/usuario/alterar", usuario.alterar);
router.get("/administrador/listar", administrador.listar);
router.post("/administrador/cadastrar", administrador.cadastrar);
router.post("/administrador/alterar", administrador.alterar);
router.get("/fornecedor/listar", fornecedor.listar);
router.post("/fornecedor/cadastrar", fornecedor.cadastrar);
router.post("/fornecedor/alterar", fornecedor.alterar);
router.get("/socio/listar", socio.listar);
router.post("/socio/cadastrar", socio.cadastrar);

router.delete("/usuario/excluir/:id", exclusao.excluirUsuario);
router.delete("/administrador/excluir/:id", exclusao.excluirAdministrador);
router.delete("/fornecedor/excluir/:id", exclusao.excluirFornecedor);
router.delete("/socio/excluir/:id", exclusao.excluirSocio);

module.exports = router;
