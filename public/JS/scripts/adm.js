document.querySelector(".form-login").addEventListener("submit", async function (e) {
  e.preventDefault();

  const botao = this.querySelector("button[type='submit']");
  botao.disabled = true;

  try {
    const resposta = await fetch("/administrador/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value.trim(),
        senha: document.getElementById("senha").value,
      }),
    });
    const resultado = await resposta.json();

    if (resposta.ok && resultado.ok) {
      alert("Bem-vindo, " + resultado.nome + "!");
      window.location.href = "/pageAdm";
    } else {
      alert("E-mail ou senha inválidos.");
    }
  } catch (erro) {
    alert("Não foi possível fazer o login. Tente novamente.");
  } finally {
    botao.disabled = false;
  }
});
