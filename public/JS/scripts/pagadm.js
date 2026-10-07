// ── NAVEGAÇÃO ──
const titles = {
  dashboard: "Dashboard",
  produtos: "Produtos",
  relatorios: "Relatórios",
};

function navigateTo(sectionId) {

  document
    .querySelectorAll(".content-section")
    .forEach((s) => (s.style.display = "none"));
  document.getElementById("section-" + sectionId).style.display = "block";
  document.querySelectorAll(".nav-link-cf[data-section]").forEach((l) => {
    l.classList.toggle("text-white", l.dataset.section === sectionId);
    l.classList.toggle("text-white-50", l.dataset.section !== sectionId);
  });
  document.getElementById("topbarTitle").textContent = titles[sectionId];
}
document.querySelectorAll(".nav-link-cf[data-section]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo(link.dataset.section);
  });
});

document.getElementById("imgProduto").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("imgPreviewEl").src = e.target.result;
    document.getElementById("previewImg").classList.remove("d-none");
  };
  reader.readAsDataURL(file);
});

function cadastrarProduto() {
  const nome = document.getElementById("nomeProduto").value.trim();
  const cat = document.getElementById("categoriaProduto").value;
  const preco = document.getElementById("precoProduto").value;
  const status = document.getElementById("statusProduto").value;

  if (!nome || !cat) {
    alert("Preencha pelo menos o nome e a categoria.");
    return;
  }
  const cor = status === "Inativo" ? "secondary" : "success";
  const tr = document.createElement("tr");
  tr.innerHTML =
    `<td>${nome}</td>` +
    `<td><span class="badge bg-secondary">${cat}</span></td>` +
    `<td>${preco ? "R$ " + parseFloat(preco).toFixed(2) + "/kg" : "—"}</td>` +
    `<td><span class="badge bg-${cor}">${status}</span></td>` +
    `<td><i class="fa-solid fa-trash text-danger" style="cursor:pointer;" onclick="this.closest('tr').remove()"></i></td>`;

  document.getElementById("tabelaProdutos").appendChild(tr);

  // Mostra alerta por 3 segundos
  const alertEl = document.getElementById("alertProduto");
  alertEl.classList.replace("d-none", "d-flex");
  setTimeout(() => alertEl.classList.replace("d-flex", "d-none"), 3000);

  limparFormulario();
}
function limparFormulario() {
  [
    "nomeProduto",
    "categoriaProduto",
    "descProduto",
    "precoProduto",
    "imgProduto",
  ].forEach((id) => {
    document.getElementById(id).value = "";
  });
  document.getElementById("statusProduto").value = "Ativo";
  document.getElementById("previewImg").classList.add("d-none");
}

function adicionarRelatorio(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";
    col.innerHTML =
      `<div class="card border shadow-sm h-100">` +
      `<img src="${e.target.result}" class="card-img-top" style="height:160px;object-fit:cover;">` +
      `<div class="card-body p-3">` +
      `<h6 class="fw-semibold mb-1 small">${file.name}</h6>` +
      `<p class="text-muted mb-0" style="font-size:.75rem;">Adicionado agora</p>` +
      `</div>` +
      `</div>`;
    document.getElementById("reportGrid").appendChild(col);
  };
  reader.readAsDataURL(file);
  input.value = "";
}
