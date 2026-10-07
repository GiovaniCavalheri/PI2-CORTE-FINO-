// ============================================================
// cadastro.js — Corte Fino
// ============================================================

// ── ALTERNÂNCIA DE FORMULÁRIOS ────────────────────────────────

function mostrarForm(qual) {
  let formSocio = document.querySelector("#formSocio");
  let formFornecedor = document.querySelector("#formFornecedor");
  let btnSocio = document.querySelector("#btnSocio");
  let btnFornecedor = document.querySelector("#btnFornecedor");

  if (qual === "socio") {
    formSocio.style.display = "block";
    formFornecedor.style.display = "none";
  } else {
    formSocio.style.display = "none";
    formFornecedor.style.display = "block";
  }

  btnSocio.style.cssText =
    "background:transparent; color:#8B0000; border:2px solid #8B0000;";
  btnFornecedor.style.cssText =
    "background:transparent; color:#8B0000; border:2px solid #8B0000;";

  if (qual === "socio") {
    btnSocio.style.cssText =
      "background:#8B0000; color:white; border:2px solid #8B0000;";
  } else {
    btnFornecedor.style.cssText =
      "background:#8B0000; color:white; border:2px solid #8B0000;";
  }
}

// ── MÁSCARAS ─────────────────────────────────────────────────

function mCpf(input) {
  let v = input.value.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = v;
}

function mCNPJ(input) {
  let v = input.value.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/, "$1.$2");
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/(\d{3})(\d)/, "$1/$2");
  v = v.replace(/(\d{4})(\d)/, "$1-$2");
  input.value = v;
}

function mRG(input) {
  let v = input.value.replace(/[^0-9xX]/g, "");
  v = v.replace(/(\d{2})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})([0-9xX])$/, "$1-$2");
  input.value = v;
}

function mTel(input) {
  let v = input.value.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1)$2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  input.value = v;
}

function mCEP(input) {
  let v = input.value.replace(/\D/g, "");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  input.value = v;
}

function mTexto(input) {
  input.value = input.value.replace(
    /[0-9!@#$%^&*()_+=\[\]{};':",./<>?~`|\\-]/g,
    "",
  );
}

// ── AUXILIARES DE ERRO (Bootstrap is-invalid) ─────────────────

function marcarErro(input, mensagem) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");

  let feedback = input.parentElement.querySelector(".invalid-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    input.parentElement.appendChild(feedback);
  }
  feedback.textContent = mensagem;
}

function marcarValido(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");

  let feedback = input.parentElement.querySelector(".invalid-feedback");
  if (feedback) feedback.textContent = "";
}

function limparTodosErros(form) {
  form.querySelectorAll(".is-invalid, .is-valid").forEach(function (el) {
    el.classList.remove("is-invalid", "is-valid");
  });
  form.querySelectorAll(".invalid-feedback").forEach(function (el) {
    el.textContent = "";
  });
  // Limpa também os erros dos grupos de radio
  let erroEstadoCivil = document.querySelector("#erroEstadoCivil");
  if (erroEstadoCivil) erroEstadoCivil.textContent = "";

  let erroPagamento = document.querySelector("#erroPagamento");
  if (erroPagamento) erroPagamento.textContent = "";
}

// ── VALIDAÇÕES REUTILIZÁVEIS ──────────────────────────────────

function validaCampoVazio(input, mensagem) {
  if (input.value.trim() === "") {
    marcarErro(input, mensagem);
    return false;
  }
  marcarValido(input);
  return true;
}

function validaEmail(input) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (input.value.trim() === "") {
    marcarErro(input, "Informe o e-mail.");
    return false;
  }
  if (!regex.test(input.value)) {
    marcarErro(input, "E-mail inválido.");
    return false;
  }
  marcarValido(input);
  return true;
}

// Chamada pelo onblur do input de e-mail
function validarEmail(input) {
  validaEmail(input);
}

function validaCPF(input) {
  let cpf = input.value.replace(/\D/g, "");

  if (cpf === "") {
    marcarErro(input, "Informe o CPF.");
    return false;
  }
  if (cpf.length !== 11) {
    marcarErro(input, "CPF incompleto. Use 000.000.000-00.");
    return false;
  }
  if (/^(\d)\1+$/.test(cpf)) {
    marcarErro(input, "CPF inválido.");
    return false;
  }
  // Dígito verificador 1
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) {
    marcarErro(input, "CPF inválido.");
    return false;
  }

  // Dígito verificador 2
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) {
    marcarErro(input, "CPF inválido.");
    return false;
  }

  marcarValido(input);
  return true;
}

function validaCNPJ(input) {
  let cnpj = input.value.replace(/\D/g, "");

  if (cnpj === "") {
    marcarErro(input, "Informe o CNPJ.");
    return false;
  }
  if (cnpj.length !== 14) {
    marcarErro(input, "CNPJ incompleto. Use 00.000.000/0000-00.");
    return false;
  }
  if (/^(\d)\1+$/.test(cnpj)) {
    marcarErro(input, "CNPJ inválido.");
    return false;
  }
  // Dígito verificador 1
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) {
    marcarErro(input, "CNPJ inválido.");
    return false;
  }

  // Dígito verificador 2
  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) {
    marcarErro(input, "CNPJ inválido.");
    return false;
  }

  marcarValido(input);
  return true;
}

function validaTelefone(input) {
  let regex = /^\(\d{2}\)\d{4,5}-\d{4}$/;
  if (input.value.trim() === "") {
    marcarErro(input, "Informe o telefone.");
    return false;
  }
  if (!regex.test(input.value)) {
    marcarErro(input, "Telefone inválido. Use (99)99999-9999.");
    return false;
  }
  marcarValido(input);
  return true;
}

function validaCEP(input) {
  let cep = input.value.replace(/\D/g, "");
  if (cep === "") {
    marcarErro(input, "Informe o CEP.");
    return false;
  }
  if (cep.length !== 8) {
    marcarErro(input, "CEP incompleto. Use 00000-000.");
    return false;
  }
  marcarValido(input);
  return true;
}

function validaSenha(inputSenha, inputConfirma) {
  let valido = true;
  let regexForte = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

  if (inputSenha.value === "") {
    marcarErro(inputSenha, "Informe uma senha.");
    valido = false;
  } else if (!regexForte.test(inputSenha.value)) {
    marcarErro(
      inputSenha,
      "Use: mínimo 8 caracteres, 1 maiúscula, 1 número e 1 especial (!@#$%^&*).",
    );
    valido = false;
  } else {
    marcarValido(inputSenha);
  }

  if (inputConfirma.value === "") {
    marcarErro(inputConfirma, "Confirme sua senha.");
    valido = false;
  } else if (inputSenha.value !== inputConfirma.value) {
    marcarErro(inputConfirma, "As senhas não coincidem.");
    valido = false;
  } else {
    marcarValido(inputConfirma);
  }

  return valido;
}

// ── VALIDAÇÃO PRINCIPAL (chamada pelo onsubmit dos dois forms) ─

function validarCadastro(event, tipoForm) {
  event.preventDefault();

  let form = document.querySelector(
    tipoForm === "socio" ? "#formSocio" : "#formFornecedor",
  );
  let valido = true;

  limparTodosErros(form);

  if (tipoForm === "socio") {
    // Nome: mínimo 2 palavras
    let inputNome = document.querySelector("#nameSocio");
    if (inputNome.value.trim() === "") {
      marcarErro(inputNome, "Informe seu nome completo.");
      valido = false;
    } else if (
      inputNome.value
        .trim()
        .split(" ")
        .filter(function (p) {
          return p;
        }).length < 2
    ) {
      marcarErro(inputNome, "Informe nome e sobrenome.");
      valido = false;
    } else {
      marcarValido(inputNome);
    }
    // Data de nascimento: obrigatória e anterior a hoje
    // Data de nascimento: obrigatória, anterior a hoje e mínimo 18 anos
    let inputData = document.querySelector("#nascimento");

    if (inputData.value === "") {
      marcarErro(inputData, "Informe sua data de nascimento.");
      valido = false;
    } else {
      let dataNascimento = new Date(inputData.value);
      let hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      // Verifica se a data é futura
      if (dataNascimento >= hoje) {
        marcarErro(inputData, "A data deve ser anterior à data atual.");
        valido = false;
      } else {
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        let mesAtual = hoje.getMonth();
        let mesNascimento = dataNascimento.getMonth();
        if (
          mesAtual < mesNascimento ||
          (mesAtual === mesNascimento &&
            hoje.getDate() < dataNascimento.getDate())
        ) {
          idade--;
        }
        // Verifica idade mínima
        if (idade < 18) {
          marcarErro(inputData, "É necessário ter no mínimo 18 anos.");
          valido = false;
        } else {
          marcarValido(inputData);
        }
      }
    }

    if (!validaCPF(document.querySelector("#CPF"))) valido = false;

    // RG: mínimo 8 dígitos
    let inputRG = document.querySelector("#RG");
    if (inputRG.value.replace(/\D/g, "").length < 8) {
      marcarErro(inputRG, "RG incompleto.");
      valido = false;
    } else {
      marcarValido(inputRG);
    }

    // Estado civil: obrigatório
    if (!form.querySelector("input[name='estadoCivil']:checked")) {
      document.querySelector("#erroEstadoCivil").textContent =
        "Selecione o estado civil.";
      valido = false;
    }

    if (!validaEmail(document.querySelector("#emailSocio"))) valido = false;
    if (!validaTelefone(document.querySelector("#CelularSocio")))
      valido = false;
    if (!validaTelefone(document.querySelector("#TelefoneSocio")))
      valido = false;
    if (!validaCEP(document.querySelector("#CEPSocio"))) valido = false;

    if (
      !validaCampoVazio(
        document.querySelector("#CidadeSocio"),
        "Informe a cidade.",
      )
    )
      valido = false;
    if (
      !validaCampoVazio(
        document.querySelector("#EstadoSocio"),
        "Informe o estado.",
      )
    )
      valido = false;
    if (
      !validaCampoVazio(
        document.querySelector("#BairroSocio"),
        "Informe o bairro.",
      )
    )
      valido = false;
    if (
      !validaCampoVazio(
        document.querySelector("#numberRedSocio"),
        "Informe o número.",
      )
    )
      valido = false;

    if (
      !validaSenha(
        document.querySelector("#senhaSocio"),
        document.querySelector("#senhaConfirmaSocio"),
      )
    )
      valido = false;
  } else {
    // Razão Social: mínimo 2 palavras
    let inputRazao = document.querySelector("#razaosocial");
    if (inputRazao.value.trim() === "") {
      marcarErro(inputRazao, "Informe a razão social.");
      valido = false;
    } else if (
      inputRazao.value
        .trim()
        .split(" ")
        .filter(function (p) {
          return p;
        }).length < 2
    ) {
      marcarErro(inputRazao, "Informe a razão social completa.");
      valido = false;
    } else {
      marcarValido(inputRazao);
    }

    if (
      !validaCampoVazio(
        document.querySelector("#fantasyname"),
        "Informe o nome fantasia.",
      )
    )
      valido = false;
    if (!validaCNPJ(document.querySelector("#CNPJ"))) valido = false;

    // Nome do Responsável: mínimo 2 palavras
    let inputResp = document.querySelector("#nameFornecedor");
    if (inputResp.value.trim() === "") {
      marcarErro(inputResp, "Informe o nome do responsável.");
      valido = false;
    } else if (
      inputResp.value
        .trim()
        .split(" ")
        .filter(function (p) {
          return p;
        }).length < 2
    ) {
      marcarErro(inputResp, "Informe nome e sobrenome do responsável.");
      valido = false;
    } else {
      marcarValido(inputResp);
    }

    if (!validaCPF(document.querySelector("#CPFFornecedor"))) valido = false;
    if (!validaEmail(document.querySelector("#emailFornecedor")))
      valido = false;
    if (!validaTelefone(document.querySelector("#TelefoneComercialFornecedor")))
      valido = false;
    if (!validaTelefone(document.querySelector("#CelularFornecedor")))
      valido = false;
    if (!validaCEP(document.querySelector("#CEPFornecedor"))) valido = false;
    if (
      !validaCampoVazio(
        document.querySelector("#CidadeFornecedor"),
        "Informe a cidade.",
      )
    )
      valido = false;
    if (
      !validaCampoVazio(
        document.querySelector("#EstadoFornecedor"),
        "Informe o estado.",
      )
    )
      valido = false;
    if (
      !validaCampoVazio(
        document.querySelector("#BairroFornecedor"),
        "Informe o bairro.",
      )
    )
      valido = false;
    if (
      !validaCampoVazio(
        document.querySelector("#numberRedFornecedor"),
        "Informe o número.",
      )
    )
      valido = false;

    // Forma de pagamento: obrigatória
    if (!form.querySelector("input[name='pagamento']:checked")) {
      document.querySelector("#erroPagamento").textContent =
        "Selecione uma forma de pagamento.";
      valido = false;
    }

    if (
      !validaSenha(
        document.querySelector("#senhaFornecedor"),
        document.querySelector("#senhaConfirmaFornecedor"),
      )
    )
      valido = false;
  }

  if (valido) mostrarSucesso();
}

function mostrarSucesso() {
  let div = document.createElement("div");
  div.textContent = "✓ Cadastro realizado com sucesso! Redirecionando...";
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

  setTimeout(function () {
    window.location.href = "/index.html";
  }, 2500);
}


async function buscarCEP(idCEP, idCidade, idEstado, idBairro) {
  let inputCEP = document.querySelector("#" + idCEP);
  let cep = inputCEP.value.replace(/\D/g, ""); 

  if (cep.length !== 8) return;

  try {
    let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let data = await response.json();

    if (data.erro) {
      marcarErro(inputCEP, "CEP não encontrado.");
      return;
    }

    document.querySelector("#" + idCidade).value = data.localidade;
    document.querySelector("#" + idEstado).value  = data.uf;
    document.querySelector("#" + idBairro).value  = data.bairro;

    // Marca o CEP como válido
    marcarValido(inputCEP);

  } catch (erro) {
    marcarErro(inputCEP, "Erro ao buscar o CEP. Tente novamente.");
  }
}
