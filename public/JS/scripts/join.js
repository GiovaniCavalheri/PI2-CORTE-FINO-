document.addEventListener("DOMContentLoaded", function() {

    //faz a leitura do formulario de login
    let form = document.querySelector(".form-login");

    form.addEventListener("submit", entrar);

    function entrar(e) {
        //impede o formulario de recarregar a pagina
        e.preventDefault();

        let email = document.querySelector("#email");
        let senha = document.querySelector("#senha");
        let botao = document.querySelector(".form-login button[type='submit']");

        //desabilita o botao para nao enviar duas vezes
        botao.disabled = true;

        //monta o objeto que deve ser enviado ao backend
        let obj = {
            email: email.value.trim(),
            senha: senha.value
        };

        //escrita do FetchAPI
        fetch("/login", {
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
                //CorpoResposta.tipo diz de qual tabela veio o login: "socio" ou "fornecedor"
                alert("Bem-vindo, " + CorpoResposta.nome + "!");
                window.location.href = paginaDeDestino();
            }
            else {
                alert("E-mail ou senha inválidos.");
            }
        }).catch(function() {
            //servidor fora do ar ou resposta invalida
            botao.disabled = false;
            alert("Não foi possível fazer o login. Tente novamente.");
        })
    }

    //?voltar=/cart: volta para a pagina de onde veio
    function paginaDeDestino() {
        let parametros = new URLSearchParams(window.location.search);
        let voltar = parametros.get("voltar");

        //so aceita caminhos do proprio site: comeca com "/" mas nao com "//" nem "/\"
        if(voltar != null && voltar.charAt(0) == "/" &&
            voltar.charAt(1) != "/" && voltar.charAt(1) != "\\") {
                return voltar;
        }
        return "/";
    }

})
