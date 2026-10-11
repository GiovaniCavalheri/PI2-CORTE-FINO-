document.addEventListener("DOMContentLoaded", function() {

    // BOTÕES DE FILTRO E BUSCA
    let botoesFiltro = document.querySelectorAll(".botao-filtro");
    let produtos = document.querySelectorAll(".cartao-produto");
    let campoBusca = document.querySelector("#busca");

    let filtroAtual = "todos";

    for(let i=0; i<botoesFiltro.length; i++) {
        botoesFiltro[i].addEventListener("click", filtrar);
    }

    // BUSCA
    if(campoBusca != null) {
        campoBusca.addEventListener("input", aplicarFiltros);
    }

    //clique em um botao de filtro: marca ele como ativo e filtra os produtos
    function filtrar() {
        for(let i=0; i<botoesFiltro.length; i++) {
            botoesFiltro[i].classList.remove("ativo");
        }
        this.classList.add("ativo");

        filtroAtual = this.dataset.categoria;
        aplicarFiltros();
    }

    // "Suínos" -> "suino" / "Kits Especiais" -> "kit": tira acento e o plural
    // para o botão casar com o nome da categoria vindo do banco
    function raizDoTipo(texto) {
        //tira os acentos (á -> a, í -> i)
        texto = texto.normalize("NFD").replace(/[̀-ͯ]/g, "");
        //minusculo, sem espacos nas pontas e so a primeira palavra
        texto = texto.toLowerCase().trim().split(" ")[0];
        //tira o "s" do final (plural)
        if(texto.charAt(texto.length - 1) == "s") {
            texto = texto.substring(0, texto.length - 1);
        }
        return texto;
    }

    function aplicarFiltros() {
        let termo = "";
        if(campoBusca != null) {
            termo = campoBusca.value.toLowerCase().trim();
        }
        let raizFiltro = raizDoTipo(filtroAtual);

        for(let i=0; i<produtos.length; i++) {
            let produto = produtos[i];
            let tipo = produto.dataset.tipo || "";
            let nome = produto.querySelector(".nome-produto").textContent.toLowerCase();

            let passaCategoria = filtroAtual == "todos" || raizDoTipo(tipo) == raizFiltro;
            let passaBusca = nome.includes(termo);

            if(passaCategoria && passaBusca) {
                produto.style.display = "block";
            }
            else {
                produto.style.display = "none";
            }
        }
    }

    // o botão "Adicionar ao Pedido" é tratado em cart.js

})
