document.addEventListener("DOMContentLoaded", function() {

    let CHAVE_CARRINHO = "carrinho_corte_fino";

    let botoes = document.querySelectorAll(".btn-adicionar:not([disabled])");
    for(let i=0; i<botoes.length; i++) {
        botoes[i].addEventListener("click", adicionarAoCarrinho);
    }

    function lerCarrinho() {
        let dados = localStorage.getItem(CHAVE_CARRINHO);
        if(dados == null) {
            return [];
        }
        try {
            return JSON.parse(dados);
        }
        catch(erro) {
            return [];
        }
    }

    function salvarCarrinho(itens) {
        localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));

        if(window.atualizarContadorCarrinho) {
            window.atualizarContadorCarrinho();
        }
    }

    function adicionarAoCarrinho() {
        let botao = this;

        let cartao = botao.closest(".cartao-produto");

        let idProduto = Number(cartao.dataset.id);
        let preco = Number(cartao.dataset.preco);
        let estoque = Number(cartao.dataset.estoque);
        let nome = cartao.querySelector(".nome-produto").textContent.trim();
        let categoria = cartao.querySelector(".categoria-produto").textContent.trim();
        let imagem = "";
        let img = cartao.querySelector(".img-produto");
        if(img != null) {
            imagem = img.src;
        }

        let id = "produto-" + idProduto;

        let itens = lerCarrinho();
        let itemExistente = null;
        for(let i=0; i<itens.length; i++) {
            if(itens[i].id == id) {
                itemExistente = itens[i];
            }
        }

        let quantidadeAtual = 0;
        if(itemExistente != null) {
            quantidadeAtual = itemExistente.quantidade;
        }

        if(quantidadeAtual >= estoque) {
            feedbackBotao(botao, "Sem estoque suficiente", "#a33");
            return;
        }

        if(itemExistente != null) {
            itemExistente.quantidade = itemExistente.quantidade + 1;
            itemExistente.estoque = estoque;
        }
        else {
            itens.push({
                id: id,
                idProduto: idProduto,
                nome: nome,
                categoria: categoria,
                imagem: imagem,
                preco: preco,
                estoque: estoque,
                quantidade: 1
            });
        }

        salvarCarrinho(itens);
        feedbackBotao(botao, "Adicionado!", "#4a9e6f");
    }

    function feedbackBotao(botao, texto, cor) {
        let textoOriginal = botao.textContent;
        botao.textContent = texto;
        botao.disabled = true;
        botao.style.background = cor;

        setTimeout(function() {
            botao.textContent = textoOriginal;
            botao.disabled = false;
            botao.style.background = "";
        }, 1500);
    }

})
