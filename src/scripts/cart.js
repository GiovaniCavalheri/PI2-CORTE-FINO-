const CHAVE_CARRINHO = "carrinho_corte_fino";

function lerCarrinho() {
  const dados = localStorage.getItem(CHAVE_CARRINHO);
  return dados ? JSON.parse(dados) : [];
}

function salvarCarrinho(itens) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
}

function adicionarAoCarrinho(botao) {
  // 1. Sobe pelo DOM até encontrar o cartão pai
  const cartao = botao.closest(".cartao-produto");

  // 2. Coleta os dados do produto diretamente do HTML
  const nome = cartao.querySelector(".nome-produto").textContent.trim();
  const categoria = cartao
    .querySelector(".categoria-produto")
    .textContent.trim();
  const imagem = cartao.querySelector(".img-produto")?.src || "";
  const tipo = cartao.dataset.tipo; 
  const precoTexto = cartao.querySelector(".preco-atual").textContent;
  const preco = parseFloat(
    precoTexto
      .replace("R$", "") 
      .replace(".", "") 
      .replace(",", ".") 
      .trim(),
  );

  const id = `${tipo}-${nome.toLowerCase().replace(/\s+/g, "-")}`;

  const itens = lerCarrinho();
  const itemExistente = itens.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    itens.push({
      id,
      nome,
      categoria,
      imagem,
      preco,
      quantidade: 1,
    });
  }

  salvarCarrinho(itens);
  feedbackBotao(botao);
}

function feedbackBotao(botao) {
  const textoOriginal = botao.textContent;
  botao.textContent = "✓ Adicionado!";
  botao.disabled = true;
  botao.style.background = "#4a9e6f"; 

  setTimeout(() => {
    botao.textContent = textoOriginal;
    botao.disabled = false;
    botao.style.background = ""; 
  }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".btn-adicionar");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho(botao);
    });
  });
});
