document.addEventListener("DOMContentLoaded", function() {

    let form = document.querySelector(".form-login");

    form.addEventListener("submit", entrar);

    function entrar(e) {
        e.preventDefault();

        let email = document.querySelector("#email");
        let senha = document.querySelector("#senha");
        let botao = document.querySelector(".form-login button[type='submit']");

        botao.disabled = true;

        let obj = {
            email: email.value.trim(),
            senha: senha.value
        };

        fetch("/administrador/login", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(resposta) {
            return resposta.json();
        }).then(function(CorpoResposta) {
            botao.disabled = false;
            if(CorpoResposta.ok) {
                alert("Bem-vindo, " + CorpoResposta.nome + "!");
                window.location.href = "/pageAdm";
            }
            else {
                alert("E-mail ou senha inválidos.");
            }
        }).catch(function() {
            botao.disabled = false;
            alert("Não foi possível fazer o login. Tente novamente.");
        })
    }

})
