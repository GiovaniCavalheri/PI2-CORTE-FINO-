document.querySelector(".form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  if (document.getElementById("senha").value === "root123") {
    alert("Login feito!");
    window.location.href = "../Interface/pag-adm.html";
  } else {
    alert("Erro! Senha: root123");
  }
});
