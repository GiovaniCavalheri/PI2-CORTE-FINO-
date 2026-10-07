function aoEntrar(entry) {
  const delay = entry.target.getAttribute("data-delay") || 0;

  setTimeout(function () {
    entry.target.classList.add("show");
  }, delay);

  observer.unobserve(entry.target);
}

function verificarEntradas(entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      aoEntrar(entry);
    }
  });
}
const observer = new IntersectionObserver(verificarEntradas, {
  threshold: 0.2,
});

document.querySelectorAll(".cf-anim").forEach(function (el) {
  observer.observe(el);
});
function mCpf(input) {
  let cpf = input.value;

  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  input.value = cpf;
}
function mTel(input) {
  let tel = input.value;
  tel = tel.replace(/\D/g, "");
  tel = tel.replace(/^(\d{2})(\d)/g, "($1)$2");
  tel = tel.replace(/(\d{5})(\d)/, "$1-$2");

  input.value = tel;
}
function mCEP(input) {
  let cep = input.value;
  cep = cep.replace(/\D/g, "");
  cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
  input.value = cep;
}
function mTexto(input) {
  input.value = input.value.replace(
    /[0-9!@#$%^&*()_+=\[\]{};':",./<>?~`|\\-]/g,
    "",
  );
}

function validarContato(event) {
  event.preventDefault();

  limparTodosErros();

  let valido = true;

  let inputNome = document.querySelector("#contatoNome");
  let inputEmail = document.querySelector("#contatoEmail");
  let inputTelefone = document.querySelector("#contatoTelefone");
  let inputCPF = document.querySelector("#CPF");
  let inputCEP = document.querySelector("#CEP");
  let selectCategoria = document.querySelector("#categoria");
  let inputMensagem = document.querySelector("#contatoMensagem");

  if (inputNome.value.trim() === "") {
    marcarErro(inputNome, "Informe seu nome.");
    valido = false;
  } else {
    let partesNome = inputNome.value
      .trim()
      .split(" ")
      .filter(function (p) {
        return p;
      });

    if (partesNome.length < 2) {
      marcarErro(inputNome, "Informe nome e sobrenome.");
      valido = false;
    }
  }

  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (inputEmail.value.trim() === "") {
    marcarErro(inputEmail, "Informe seu e-mail.");
    valido = false;
  } else if (!regexEmail.test(inputEmail.value)) {
    marcarErro(inputEmail, "E-mail inválido.");
    valido = false;
  }
  let regexTelefone = /^\(\d{2}\)\d{5}-\d{4}$/;
  if (inputTelefone.value.trim() === "") {
    marcarErro(inputTelefone, "Informe seu telefone.");
    valido = false;
  } else if (!regexTelefone.test(inputTelefone.value)) {
    marcarErro(inputTelefone, "Telefone inválido. Use (99)99999-9999.");

    valido = false;
  }

  if (inputCPF.value.trim() === "") {
    marcarErro(inputCPF, "Informe seu CPF.");
    valido = false;
  } else if (inputCPF.value.length < 14) {
    marcarErro(inputCPF, "CPF incompleto.");
    valido = false;
  }

  if (inputCEP.value.trim() === "") {
    marcarErro(inputCEP, "Informe seu CEP.");
    valido = false;
  } else if (inputCEP.value.length < 9) {
    marcarErro(inputCEP, "CEP incompleto.");
    valido = false;
  }

  if (selectCategoria.selectedIndex === 0) {
    marcarErro(selectCategoria, "Selecione uma categoria.");
    valido = false;
  }
  if (inputMensagem.value.trim() === "") {
    marcarErro(inputMensagem, "Digite sua mensagem.");
    valido = false;
  } else if (inputMensagem.value.trim().length < 10) {
    marcarErro(
      inputMensagem,
      "A mensagem deve conter pelo menos 10 caracteres.",
    );

    valido = false;
  }
  if (valido) {
    mostrarSucessoContato();
  }
}
function marcarErro(input, mensagem) {

  limparErro(input);

  input.style.border = "2px solid #dc3545";
  input.style.backgroundColor = "#fff5f5";
  input.style.boxShadow = "0 0 0 4px rgba(220, 53, 69, 0.12)";

  let span = document.createElement("span");

  span.classList.add("msg-erro");

  span.innerHTML = "Algo deu errado: " + mensagem;

  span.style.color = "#dc3545";
  span.style.fontSize = "13px";
  span.style.fontWeight = "600";
  span.style.display = "block";
  span.style.marginTop = "6px";

  input.insertAdjacentElement("afterend", span);
}

function limparErro(input) {

  input.style.border = "";
  input.style.backgroundColor = "";
  input.style.boxShadow = "";

  let erro = input.nextElementSibling;

  if (erro && erro.classList.contains("msg-erro")) {
    erro.remove();
  }
}

function limparTodosErros() {
  document.querySelectorAll(".msg-erro").forEach(function (erro) {
    erro.remove();
  });
  document
    .querySelectorAll(
      "#formContato input, #formContato select, #formContato textarea",
    )
    .forEach(function (campo) {
      campo.classList.remove("erro");
    });
}

function mostrarSucessoContato() {
  let div = document.createElement("div");

  div.textContent =
    "Mensagem enviada! Nossa equipe entrará em contato em breve.";

  div.style.cssText = `
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #d1e7dd;
    color: #0f5132;
    border: 1px solid #a3cfbb;
    border-radius: 8px;
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;

  document.body.appendChild(div);

  document.querySelector("#formContato").reset();

  setTimeout(function () {
    div.remove();
  }, 3000);
}

async function verificarCEP() {
  let inputCEP = document.querySelector("#CEP");
  let mensagem = document.querySelector("#mensagemCEP");

  let cep = inputCEP.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    mensagem.innerHTML = "CEP inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  try {
    let resposta = await fetch(
      `https://viacep.com.br/ws/${cep}/json/`,
    );

    let dados = await resposta.json();

    if (dados.erro) {
      mensagem.innerHTML = "CEP não encontrado.";
      mensagem.style.color = "#dc3545";
    } else {
      mensagem.innerHTML =
        `CEP válido: ${dados.localidade} - ${dados.uf}`;

      mensagem.style.color = "#198754";
    }
  } catch (erro) {
    mensagem.innerHTML = "Erro ao consultar CEP.";
    mensagem.style.color = "#ffc107";
  }
}
function verificarCPF() {
  let inputCPF = document.querySelector("#CPF");
  let mensagem = document.querySelector("#mensagemCPF");

  let cpf = inputCPF.value.replace(/\D/g, "");

  if (cpf.length !== 11) {
    mensagem.innerHTML = "CPF inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    mensagem.innerHTML = "CPF inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10))) {
    mensagem.innerHTML = "CPF inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
    mensagem.innerHTML = "CPF inválido.";
    mensagem.style.color = "#dc3545";
  } else {
    mensagem.innerHTML = "CPF válido.";
    mensagem.style.color = "#198754";
  }
}
