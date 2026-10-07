document.querySelector(".form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  if (document.getElementById("senha").value === "root123") {
    alert("Login feito!");
    window.location.href = "/index.html";
  } else {
    alert("Erro! Senha: root123");
  }
});
