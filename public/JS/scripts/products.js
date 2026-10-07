// BOTÕES DE FILTRO
const botoesFiltro = document.querySelectorAll(".botao-filtro");
const produtos = document.querySelectorAll(".cartao-produto");

botoesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    const categoria = btn.dataset.categoria;

    produtos.forEach((produto) => {
      const tipo = produto.dataset.tipo;

      if (categoria === "todos" || tipo === categoria) {
        produto.style.display = "block";
      } else {
        produto.style.display = "none";
      }
    });
  });
});

// BUSCA
const campoBusca = document.getElementById("busca");

campoBusca.addEventListener("input", () => {
  const termo = campoBusca.value.toLowerCase();

  produtos.forEach((produto) => {
    const nome = produto
      .querySelector(".nome-produto")
      .textContent.toLowerCase();

    produto.style.display = nome.includes(termo) ? "block" : "none";
  });
});

// BOTÃO "ADICIONAR AO PEDIDO"
const botoesAdicionar = document.querySelectorAll(".btn-adicionar");

botoesAdicionar.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = "✓ Adicionado!";
    btn.style.backgroundColor = "#2ecc71";

    setTimeout(() => {
      btn.textContent = "Adicionar ao Pedido";
      btn.style.backgroundColor = "#853439";
    }, 1600);
  });
});
