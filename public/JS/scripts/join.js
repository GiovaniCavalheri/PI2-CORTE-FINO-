document.querySelector(".form-login").addEventListener("submit", async function (e) {
  e.preventDefault();

  const botao = this.querySelector("button[type='submit']");
  botao.disabled = true;

  try {
    const resposta = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value.trim(),
        senha: document.getElementById("senha").value,
      }),
    });
    const resultado = await resposta.json();

    if (resposta.ok && resultado.ok) {
      //resultado.tipo diz de qual tabela veio o login: "socio" ou "fornecedor"
      alert("Bem-vindo, " + resultado.nome + "!");
      //?voltar=/cart: volta para a pagina de onde veio (so caminhos do proprio site)
      var voltar = new URLSearchParams(window.location.search).get("voltar");
      var destinoSeguro = voltar && /^\/(?![\/\\])/.test(voltar);
      window.location.href = destinoSeguro ? voltar : "/";
    } else {
      alert("E-mail ou senha inválidos.");
    }
  } catch (erro) {
    alert("Não foi possível fazer o login. Tente novamente.");
  } finally {
    botao.disabled = false;
  }
});
