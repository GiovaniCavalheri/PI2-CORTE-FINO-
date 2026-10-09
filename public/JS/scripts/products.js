// BOTÕES DE FILTRO E BUSCA
const botoesFiltro = document.querySelectorAll(".botao-filtro");
const produtos = document.querySelectorAll(".cartao-produto");
const campoBusca = document.getElementById("busca");

let filtroAtual = "todos";

// "Suínos" -> "suino" / "Kits Especiais" -> "kit": tira acento e o plural
// para o botão casar com o nome da categoria vindo do banco
function raizDoTipo(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .split(" ")[0]
    .replace(/s$/, "");
}

function aplicarFiltros() {
  const termo = campoBusca ? campoBusca.value.toLowerCase().trim() : "";
  const raizFiltro = raizDoTipo(filtroAtual);

  produtos.forEach((produto) => {
    const tipo = produto.dataset.tipo || "";
    const nome = produto
      .querySelector(".nome-produto")
      .textContent.toLowerCase();

    const passaCategoria =
      filtroAtual === "todos" || raizDoTipo(tipo) === raizFiltro;
    const passaBusca = nome.includes(termo);

    produto.style.display = passaCategoria && passaBusca ? "block" : "none";
  });
}

botoesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    filtroAtual = btn.dataset.categoria;
    aplicarFiltros();
  });
});

// BUSCA
if (campoBusca) {
  campoBusca.addEventListener("input", aplicarFiltros);
}

// o botão "Adicionar ao Pedido" é tratado em cart.js
