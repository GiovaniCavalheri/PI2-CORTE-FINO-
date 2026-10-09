const CHAVE_CARRINHO = "carrinho_corte_fino";

function lerCarrinho() {
  try {
    const dados = localStorage.getItem(CHAVE_CARRINHO);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    return [];
  }
}

function salvarCarrinho(itens) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
  if (window.atualizarContadorCarrinho) window.atualizarContadorCarrinho();
}

function adicionarAoCarrinho(botao) {
  // 1. Sobe pelo DOM até encontrar o cartão pai
  const cartao = botao.closest(".cartao-produto");

  // 2. Coleta os dados do produto (id, preço e estoque vêm do banco via data-*)
  const idProduto = Number(cartao.dataset.id);
  const preco = Number(cartao.dataset.preco);
  const estoque = Number(cartao.dataset.estoque);
  const nome = cartao.querySelector(".nome-produto").textContent.trim();
  const categoria = cartao
    .querySelector(".categoria-produto")
    .textContent.trim();
  const imagem = cartao.querySelector(".img-produto")?.src || "";

  const id = `produto-${idProduto}`;

  const itens = lerCarrinho();
  const itemExistente = itens.find((item) => item.id === id);
  const quantidadeAtual = itemExistente ? itemExistente.quantidade : 0;

  // não deixa pedir mais do que existe em estoque
  if (quantidadeAtual >= estoque) {
    feedbackBotao(botao, "Sem estoque suficiente", "#a33");
    return;
  }

  if (itemExistente) {
    itemExistente.quantidade += 1;
    itemExistente.estoque = estoque;
  } else {
    itens.push({
      id,
      idProduto,
      nome,
      categoria,
      imagem,
      preco,
      estoque,
      quantidade: 1,
    });
  }

  salvarCarrinho(itens);
  feedbackBotao(botao, "Adicionado!", "#4a9e6f");
}

function feedbackBotao(botao, texto, cor) {
  const textoOriginal = botao.textContent;
  botao.textContent = texto;
  botao.disabled = true;
  botao.style.background = cor;

  setTimeout(() => {
    botao.textContent = textoOriginal;
    botao.disabled = false;
    botao.style.background = "";
  }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".btn-adicionar:not([disabled])");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho(botao);
    });
  });
});
