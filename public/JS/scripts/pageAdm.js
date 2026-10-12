      document.addEventListener("DOMContentLoaded", function () {
        // ──────────────────────────────────────────────
        // SIDEBAR
        // ──────────────────────────────────────────────
        document
          .querySelector("#toggleSidebar")
          .addEventListener("click", function () {
            var sidebar = document.querySelector("#sidebar");
            var main = document.querySelector("#main");

            if (window.innerWidth <= 768) {
              sidebar.classList.toggle("open");
            } else {
              sidebar.classList.toggle("collapsed");
              main.classList.toggle("expanded");
            }
          });

        // ──────────────────────────────────────────────
        // NAVEGACAO ENTRE AS SECOES
        // ──────────────────────────────────────────────
        var titulos = {
          dashboard: "Painel",
          produtos: "Produtos",
          cadastros: "Categorias e Marcas",
          socios: "Sócios",
          fornecedores: "Fornecedores",
          pedidos: "Pedidos",
          relatorios: "Relatorios",
        };

        function navigateTo(secao) {
          document.querySelectorAll(".page-content").forEach(function (el) {
            el.classList.remove("active");
          });
          document.querySelectorAll(".nav-link-cf").forEach(function (el) {
            el.classList.remove("active");
          });
          document.querySelector("#section-" + secao).classList.add("active");
          document
            .querySelector('[data-section="' + secao + '"]')
            .classList.add("active");
          document.querySelector("#topbarTitle").textContent = titulos[secao];
        }

        // deixa a funcao disponivel para os botoes de acesso rapido
        window.navigateTo = navigateTo;

        var listaProdutos = document.querySelector("#listaProdutos");
        var listaCategorias = document.querySelector("#listaCategorias");
        var listaMarcas = document.querySelector("#listaMarcas");
        var listaSocios = document.querySelector("#listaSocios");
        var listaFornecedores = document.querySelector("#listaFornecedores");

        async function requisicaoJson(url, configuracao) {
          var resposta = await fetch(url, configuracao);
          if (!resposta.ok) {
            // o servidor devolve { erro } (ex.: registro em uso ou duplicado)
            var corpo = await resposta.json().catch(function () {
              return {};
            });
            throw new Error(
              corpo.erro || "Falha na requisição (" + resposta.status + ").",
            );
          }
          return resposta.json();
        }

        function enviarJson(url, dados) {
          return requisicaoJson(url, {
            method: "POST",
            body: JSON.stringify(dados),
            headers: { "Content-Type": "application/json" },
          });
        }

        function linhaVazia(lista, colunas, texto) {
          var linha = document.createElement("tr");
          var celula = document.createElement("td");
          celula.colSpan = colunas;
          celula.textContent = texto;
          linha.appendChild(celula);
          lista.appendChild(linha);
        }

        function formatarCpf(cpf) {
          cpf = cpf || "";
          return cpf.length === 11
            ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
            : cpf;
        }

        function formatarCnpj(cnpj) {
          cnpj = cnpj || "";
          return cnpj.length === 14
            ? cnpj.replace(
                /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                "$1.$2.$3/$4-$5",
              )
            : cnpj;
        }

        function formatarData(data) {
          // "2026-10-08" -> "08/10/2026"
          return data ? data.split("-").reverse().join("/") : "";
        }

        function hojeMais(dias) {
          var data = new Date();
          data.setDate(data.getDate() + dias);
          var mes = String(data.getMonth() + 1).padStart(2, "0");
          var dia = String(data.getDate()).padStart(2, "0");
          return data.getFullYear() + "-" + mes + "-" + dia;
        }

        function criarCelula(valor) {
          var celula = document.createElement("td");
          celula.textContent = valor == null ? "" : String(valor);
          return celula;
        }

        function criarBotaoAcao(classe, id, icone) {
          var botao = document.createElement("button");
          botao.type = "button";
          botao.className = classe;
          botao.dataset.id = id;
          var elementoIcone = document.createElement("i");
          elementoIcone.className = icone;
          botao.appendChild(elementoIcone);
          return botao;
        }

        function renderizarProdutos(produtos) {
          listaProdutos.replaceChildren();
          if (produtos.length === 0) {
            var linhaVazia = document.createElement("tr");
            var celulaVazia = document.createElement("td");
            celulaVazia.colSpan = 6;
            celulaVazia.textContent = "Nenhum produto cadastrado ainda.";
            linhaVazia.appendChild(celulaVazia);
            listaProdutos.appendChild(linhaVazia);
          }

          produtos.forEach(function (produto) {
            var linha = document.createElement("tr");
            linha.append(
              criarCelula(produto.NOME_PRODUTO),
              criarCelula(produto.NOME_CATEGORIA),
              criarCelula(produto.NOME_MARCA),
              criarCelula("R$ " + produto.PRECO_VENDA),
              criarCelula(produto.QNT_ESTOQUE),
            );
            var acoes = document.createElement("td");
            var editar = criarBotaoAcao(
              "btn-outline btnEditar",
              produto.ID_PRODUTO,
              "fa-solid fa-pen",
            );
            editar.dataset.nome = produto.NOME_PRODUTO || "";
            editar.dataset.categoria = produto.ID_CATEGORIA;
            editar.dataset.marca = produto.ID_MARCA;
            editar.dataset.preco = produto.PRECO_VENDA;
            editar.dataset.estoque = produto.QNT_ESTOQUE;
            editar.dataset.descricao = produto.DESCRICAO || "";
            acoes.append(
              editar,
              criarBotaoAcao(
                "btn-danger btnExcluir",
                produto.ID_PRODUTO,
                "fa-solid fa-trash",
              ),
            );
            linha.appendChild(acoes);
            listaProdutos.appendChild(linha);
          });
          document.querySelector("#totalProdutos").textContent =
            produtos.length;
        }

        function renderizarCategorias(categorias) {
          listaCategorias.replaceChildren();
          if (categorias.length === 0) {
            var linhaVazia = document.createElement("tr");
            var celulaVazia = document.createElement("td");
            celulaVazia.colSpan = 3;
            celulaVazia.textContent = "Nenhuma categoria cadastrada ainda.";
            linhaVazia.appendChild(celulaVazia);
            listaCategorias.appendChild(linhaVazia);
          }
          categorias.forEach(function (categoria) {
            var linha = document.createElement("tr");
            linha.append(
              criarCelula(categoria.nomeCategoria),
              criarCelula(categoria.descricao),
            );
            var acoes = document.createElement("td");
            var editar = criarBotaoAcao(
              "btn-outline btnEditarCategoria",
              categoria.id,
              "fa-solid fa-pen",
            );
            editar.dataset.nome = categoria.nomeCategoria;
            editar.dataset.descricao = categoria.descricao || "";
            acoes.append(
              editar,
              criarBotaoAcao(
                "btn-danger btnExcluirCategoria",
                categoria.id,
                "fa-solid fa-trash",
              ),
            );
            linha.appendChild(acoes);
            listaCategorias.appendChild(linha);
          });

          var select = document.querySelector("#categoriaProduto");
          var selecionada = select.value;
          select.replaceChildren(new Option("Selecione...", ""));
          categorias.forEach(function (categoria) {
            select.add(new Option(categoria.nomeCategoria, categoria.id));
          });
          select.value = selecionada;
          document.querySelector("#totalCategorias").textContent =
            categorias.length;
        }

        function renderizarMarcas(marcas) {
          listaMarcas.replaceChildren();
          if (marcas.length === 0) {
            var linhaVazia = document.createElement("tr");
            var celulaVazia = document.createElement("td");
            celulaVazia.colSpan = 2;
            celulaVazia.textContent = "Nenhuma marca cadastrada ainda.";
            linhaVazia.appendChild(celulaVazia);
            listaMarcas.appendChild(linhaVazia);
          }
          marcas.forEach(function (marca) {
            var linha = document.createElement("tr");
            linha.appendChild(criarCelula(marca.nomeMarca));
            var acoes = document.createElement("td");
            var editar = criarBotaoAcao(
              "btn-outline btnEditarMarca",
              marca.id,
              "fa-solid fa-pen",
            );
            editar.dataset.nome = marca.nomeMarca;
            acoes.append(
              editar,
              criarBotaoAcao(
                "btn-danger btnExcluirMarca",
                marca.id,
                "fa-solid fa-trash",
              ),
            );
            linha.appendChild(acoes);
            listaMarcas.appendChild(linha);
          });

          var select = document.querySelector("#marcaProduto");
          var selecionada = select.value;
          select.replaceChildren(new Option("Selecione...", ""));
          marcas.forEach(function (marca) {
            select.add(new Option(marca.nomeMarca, marca.id));
          });
          select.value = selecionada;
          document.querySelector("#totalMarcas").textContent = marcas.length;
        }

        async function carregarListas() {
          try {
            var dados = await Promise.all([
              requisicaoJson("/produto/listar"),
              requisicaoJson("/categoria/listar"),
              requisicaoJson("/marca/listar"),
              requisicaoJson("/socio/listar"),
              requisicaoJson("/fornecedor/listar"),
            ]);
            renderizarProdutos(dados[0]);
            renderizarCategorias(dados[1]);
            renderizarMarcas(dados[2]);
            renderizarSocios(dados[3]);
            renderizarFornecedores(dados[4]);
            carregarPedidos();
          } catch (erro) {
            alert("Não foi possível carregar os cadastros: " + erro.message);
          }
        }

        carregarListas();

        document.querySelectorAll(".nav-link-cf").forEach(function (link) {
          link.addEventListener("click", function (e) {
            e.preventDefault();
            navigateTo(this.getAttribute("data-section"));
          });
        });

        document
          .querySelector("#uploadRelatorio")
          .addEventListener("change", function () {
            var arquivo = this.files[0];
            if (!arquivo) return;

            var leitor = new FileReader();
            leitor.onload = function (evento) {
              var cartao = document.createElement("div");
              cartao.className = "report-card";
              var imagem = document.createElement("div");
              imagem.className = "report-img";
              var elementoImagem = document.createElement("img");
              elementoImagem.src = evento.target.result;
              elementoImagem.alt = arquivo.name;
              elementoImagem.className = "report-upload-image";
              imagem.appendChild(elementoImagem);

              var corpo = document.createElement("div");
              corpo.className = "report-body";
              var titulo = document.createElement("h6");
              titulo.textContent = arquivo.name;
              var descricao = document.createElement("p");
              descricao.textContent = "Adicionado agora";
              corpo.append(titulo, descricao);
              cartao.append(imagem, corpo);
              document.querySelector("#reportGrid").appendChild(cartao);
            };
            leitor.readAsDataURL(arquivo);
            this.value = "";
          });

        // ──────────────────────────────────────────────
        // PRODUTOS - GRAVAR (cadastrar ou alterar)
        // ──────────────────────────────────────────────
        var btnGravar = document.querySelector("#btnGravar");
        btnGravar.addEventListener("click", gravarProduto);

        async function gravarProduto() {
          var id = document.querySelector("#idProduto");
          var nome = document.querySelector("#nomeProduto");
          var categoria = document.querySelector("#categoriaProduto");
          var marca = document.querySelector("#marcaProduto");
          var preco = document.querySelector("#precoProduto");
          var estoque = document.querySelector("#estoqueProduto");
          var descricao = document.querySelector("#descProduto");

          if (
            nome.value != "" &&
            categoria.value != "" &&
            marca.value != "" &&
            preco.value != "" &&
            estoque.value != ""
          ) {
            // monta o objeto que sera enviado ao backend
            var obj = {
              id: id.value,
              nome: nome.value,
              categoria: categoria.value,
              marca: marca.value,
              preco: preco.value,
              estoque: estoque.value,
              descricao: descricao.value,
            };

            // se tem id preenchido estamos alterando, senao cadastrando
            var url =
              id.value == "" ? "/produto/cadastrar" : "/produto/alterar";

            try {
              var corpoResposta = await requisicaoJson(url, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: { "Content-Type": "application/json" },
              });
              if (!corpoResposta.ok) {
                throw new Error("O servidor não gravou o produto.");
              }
              alert("Produto gravado com sucesso!");
              limparFormulario();
              await carregarListas();
            } catch (erro) {
              alert("Erro ao gravar o produto: " + erro.message);
            }
          } else {
            alert("Preencha corretamente todos os campos obrigatorios!");
          }
        }

        // ──────────────────────────────────────────────
        // PRODUTOS - LIMPAR O FORMULARIO
        // ──────────────────────────────────────────────
        document
          .querySelector("#btnLimpar")
          .addEventListener("click", limparFormulario);

        function limparFormulario() {
          document.querySelector("#idProduto").value = "";
          document.querySelector("#nomeProduto").value = "";
          document.querySelector("#categoriaProduto").value = "";
          document.querySelector("#marcaProduto").value = "";
          document.querySelector("#precoProduto").value = "";
          document.querySelector("#estoqueProduto").value = "";
          document.querySelector("#descProduto").value = "";
          document.querySelector("#tituloForm").textContent =
            "Cadastrar Produto";
        }

        // ──────────────────────────────────────────────
        // PRODUTOS - EDITAR (preenche o formulario)
        // ──────────────────────────────────────────────
        function editarProduto() {
          document.querySelector("#idProduto").value = this.dataset.id;
          document.querySelector("#nomeProduto").value = this.dataset.nome;
          document.querySelector("#categoriaProduto").value =
            this.dataset.categoria;
          document.querySelector("#marcaProduto").value = this.dataset.marca;
          document.querySelector("#precoProduto").value = this.dataset.preco;
          document.querySelector("#estoqueProduto").value =
            this.dataset.estoque;
          document.querySelector("#descProduto").value = this.dataset.descricao;
          document.querySelector("#tituloForm").textContent = "Alterar Produto";

          document
            .querySelector("#nomeProduto")
            .scrollIntoView({ behavior: "smooth" });
        }

        listaProdutos.addEventListener("click", function (evento) {
          var botaoEditar = evento.target.closest(".btnEditar");
          var botaoExcluir = evento.target.closest(".btnExcluir");
          if (botaoEditar) editarProduto.call(botaoEditar);
          if (botaoExcluir) excluirProduto.call(botaoExcluir);
        });

        // ──────────────────────────────────────────────
        // PRODUTOS - EXCLUIR
        // ──────────────────────────────────────────────
        async function excluirProduto() {
          var id = this.dataset.id;

          if (confirm("Deseja realmente excluir este produto?")) {
            try {
              var corpoResposta = await requisicaoJson(
                "/produto/excluir/" + encodeURIComponent(id),
                { method: "DELETE" },
              );
              if (!corpoResposta.ok) {
                throw new Error(
                  corpoResposta.erro || "O servidor não excluiu o produto.",
                );
              }
              await carregarListas();
            } catch (erro) {
              alert("Erro ao excluir o produto: " + erro.message);
            }
          }
        }

        // ──────────────────────────────────────────────
        // CATEGORIAS - GRAVAR
        // ──────────────────────────────────────────────
        document
          .querySelector("#btnGravarCategoria")
          .addEventListener("click", gravarCategoria);

        async function gravarCategoria() {
          var id = document.querySelector("#idCategoria");
          var nome = document.querySelector("#nomeCategoria");
          var descricao = document.querySelector("#descCategoria");

          if (nome.value.trim() === "") {
            alert("Informe o nome da categoria!");
            return;
          }

          try {
            var corpoResposta = await requisicaoJson(
              id.value ? "/categoria/alterar" : "/categoria/cadastrar",
              {
                method: "POST",
                body: JSON.stringify({
                  id: id.value,
                  nome: nome.value.trim(),
                  descricao: descricao.value.trim(),
                }),
                headers: { "Content-Type": "application/json" },
              },
            );
            if (!corpoResposta.ok) {
              throw new Error("O servidor não gravou a categoria.");
            }
            limparFormularioCategoria();
            await carregarListas();
          } catch (erro) {
            alert("Erro ao gravar a categoria: " + erro.message);
          }
        }

        function limparFormularioCategoria() {
          document.querySelector("#idCategoria").value = "";
          document.querySelector("#nomeCategoria").value = "";
          document.querySelector("#descCategoria").value = "";
          document.querySelector("#btnGravarCategoria").innerHTML =
            '<i class="fa-solid fa-floppy-disk"></i> Salvar Categoria';
        }

        function editarCategoria(botao) {
          document.querySelector("#idCategoria").value = botao.dataset.id;
          document.querySelector("#nomeCategoria").value = botao.dataset.nome;
          document.querySelector("#descCategoria").value =
            botao.dataset.descricao;
          document.querySelector("#btnGravarCategoria").innerHTML =
            '<i class="fa-solid fa-floppy-disk"></i> Atualizar Categoria';
          document
            .querySelector("#nomeCategoria")
            .scrollIntoView({ behavior: "smooth" });
        }

        // ──────────────────────────────────────────────
        // CATEGORIAS - EXCLUIR
        // ──────────────────────────────────────────────
        async function excluirCategoria() {
          var id = this.dataset.id;

          if (confirm("Deseja realmente excluir esta categoria?")) {
            try {
              var corpoResposta = await requisicaoJson(
                "/categoria/excluir/" + encodeURIComponent(id),
                { method: "DELETE" },
              );
              if (!corpoResposta.ok) {
                throw new Error(
                  corpoResposta.erro ||
                    "Verifique se existe produto usando esta categoria.",
                );
              }
              await carregarListas();
            } catch (erro) {
              alert("Erro ao excluir categoria: " + erro.message);
            }
          }
        }

        listaCategorias.addEventListener("click", function (evento) {
          var botaoEditar = evento.target.closest(".btnEditarCategoria");
          var botaoExcluir = evento.target.closest(".btnExcluirCategoria");
          if (botaoEditar) editarCategoria(botaoEditar);
          if (botaoExcluir) excluirCategoria.call(botaoExcluir);
        });

        // ──────────────────────────────────────────────
        // MARCAS - GRAVAR
        // ──────────────────────────────────────────────
        document
          .querySelector("#btnGravarMarca")
          .addEventListener("click", gravarMarca);

        async function gravarMarca() {
          var id = document.querySelector("#idMarca");
          var nome = document.querySelector("#nomeMarca");

          if (nome.value.trim() === "") {
            alert("Informe o nome da marca!");
            return;
          }

          try {
            var corpoResposta = await requisicaoJson(
              id.value ? "/marca/alterar" : "/marca/cadastrar",
              {
                method: "POST",
                body: JSON.stringify({ id: id.value, nome: nome.value.trim() }),
                headers: { "Content-Type": "application/json" },
              },
            );
            if (!corpoResposta.ok) {
              throw new Error("O servidor não gravou a marca.");
            }
            limparFormularioMarca();
            await carregarListas();
          } catch (erro) {
            alert("Erro ao gravar a marca: " + erro.message);
          }
        }

        function limparFormularioMarca() {
          document.querySelector("#idMarca").value = "";
          document.querySelector("#nomeMarca").value = "";
          document.querySelector("#btnGravarMarca").innerHTML =
            '<i class="fa-solid fa-floppy-disk"></i> Salvar Marca';
        }

        function editarMarca(botao) {
          document.querySelector("#idMarca").value = botao.dataset.id;
          document.querySelector("#nomeMarca").value = botao.dataset.nome;
          document.querySelector("#btnGravarMarca").innerHTML =
            '<i class="fa-solid fa-floppy-disk"></i> Atualizar Marca';
          document
            .querySelector("#nomeMarca")
            .scrollIntoView({ behavior: "smooth" });
        }

        // ──────────────────────────────────────────────
        // MARCAS - EXCLUIR
        // ──────────────────────────────────────────────
        async function excluirMarca() {
          var id = this.dataset.id;

          if (confirm("Deseja realmente excluir esta marca?")) {
            try {
              var corpoResposta = await requisicaoJson(
                "/marca/excluir/" + encodeURIComponent(id),
                { method: "DELETE" },
              );
              if (!corpoResposta.ok) {
                throw new Error(
                  corpoResposta.erro ||
                    "Verifique se existe produto usando esta marca.",
                );
              }
              await carregarListas();
            } catch (erro) {
              alert("Erro ao excluir a marca: " + erro.message);
            }
          }
        }

        listaMarcas.addEventListener("click", function (evento) {
          var botaoEditar = evento.target.closest(".btnEditarMarca");
          var botaoExcluir = evento.target.closest(".btnExcluirMarca");
          if (botaoEditar) editarMarca(botaoEditar);
          if (botaoExcluir) excluirMarca.call(botaoExcluir);
        });

        // ──────────────────────────────────────────────
        // SOCIOS (dados em CLIENTE + datas em SOCIO)
        // ──────────────────────────────────────────────
        var sociosPorId = {};

        var camposSocio = {
          nomeCliente: "#socioNome",
          dataNascimento: "#socioNascimento",
          cpfCliente: "#socioCpf",
          rgCliente: "#socioRg",
          emailCliente: "#socioEmail",
          telefone: "#socioCelular",
          telComercial: "#socioTelefone",
          cep: "#socioCep",
          cidade: "#socioCidade",
          estado: "#socioEstado",
          bairro: "#socioBairro",
          numero: "#socioNumero",
          complemento: "#socioComplemento",
          dataAdesao: "#socioAdesao",
          dataVencimento: "#socioVencimento",
        };

        function renderizarSocios(socios) {
          sociosPorId = {};
          listaSocios.replaceChildren();
          if (socios.length === 0) {
            linhaVazia(listaSocios, 7, "Nenhum sócio cadastrado ainda.");
          }
          socios.forEach(function (socio) {
            sociosPorId[socio.id] = socio;
            var linha = document.createElement("tr");
            linha.append(
              criarCelula(socio.nomeCliente),
              criarCelula(formatarCpf(socio.cpfCliente)),
              criarCelula(socio.emailCliente),
              criarCelula(socio.telefone),
              criarCelula(
                socio.cidade ? socio.cidade + "/" + socio.estado : "",
              ),
              criarCelula(formatarData(socio.dataVencimento)),
            );
            var acoes = document.createElement("td");
            acoes.append(
              criarBotaoAcao(
                "btn-outline btnEditarSocio",
                socio.id,
                "fa-solid fa-pen",
              ),
              criarBotaoAcao(
                "btn-danger btnExcluirSocio",
                socio.id,
                "fa-solid fa-trash",
              ),
            );
            linha.appendChild(acoes);
            listaSocios.appendChild(linha);
          });
          document.querySelector("#totalSocios").textContent = socios.length;
        }

        function limparFormularioSocio() {
          document.querySelector("#idSocio").value = "";
          Object.values(camposSocio).forEach(function (seletor) {
            document.querySelector(seletor).value = "";
          });
          document.querySelector("#socioSenha").value = "";
          document.querySelector("#socioAdesao").value = hojeMais(0);
          document.querySelector("#socioVencimento").value = hojeMais(30);
          document.querySelector("#grupoSenhaSocio").style.display = "";
          document.querySelector("#tituloFormSocio").textContent =
            "Cadastrar Sócio";
        }

        function editarSocio(botao) {
          var socio = sociosPorId[botao.dataset.id];
          if (!socio) return;
          document.querySelector("#idSocio").value = socio.id;
          Object.keys(camposSocio).forEach(function (campo) {
            var valor = socio[campo];
            if (campo === "cpfCliente") valor = formatarCpf(valor);
            document.querySelector(camposSocio[campo]).value =
              valor == null ? "" : valor;
          });
          // a senha nao e alterada por aqui
          document.querySelector("#grupoSenhaSocio").style.display = "none";
          document.querySelector("#tituloFormSocio").textContent =
            "Alterar Sócio";
          document
            .querySelector("#socioNome")
            .scrollIntoView({ behavior: "smooth" });
        }

        async function gravarSocio() {
          var id = document.querySelector("#idSocio").value;
          var dados = {};
          Object.keys(camposSocio).forEach(function (campo) {
            dados[campo] = document.querySelector(camposSocio[campo]).value.trim();
          });
          var senha = document.querySelector("#socioSenha").value;

          // obrigatorios do socio (os outros campos podem ficar vazios)
          var obrigatorios = ["nomeCliente", "dataNascimento", "cpfCliente",
            "emailCliente", "telefone", "dataAdesao", "dataVencimento"];
          var faltando = false;
          for (var i = 0; i < obrigatorios.length; i++) {
            if (dados[obrigatorios[i]] == "") {
              faltando = true;
            }
          }
          if (faltando || (!id && senha === "")) {
            alert("Preencha corretamente todos os campos obrigatorios!");
            return;
          }

          try {
            if (id) {
              dados.id = id;
              var alterouCliente = await enviarJson("/usuario/alterar", dados);
              var alterouSocio = await enviarJson("/socio/alterar", {
                id: id,
                dataAdesao: dados.dataAdesao,
                dataVencimento: dados.dataVencimento,
              });
              if (!alterouCliente.ok || !alterouSocio.ok) {
                throw new Error("Confira CPF, CEP, UF e as datas informadas.");
              }
            } else {
              dados.senhaCliente = senha;
              var cliente = await enviarJson("/usuario/cadastrar", dados);
              if (!cliente.ok) {
                throw new Error("Confira CPF, CEP, UF e as datas informadas.");
              }
              var socio = await enviarJson("/socio/cadastrar", {
                id: cliente.id,
                dataAdesao: dados.dataAdesao,
                dataVencimento: dados.dataVencimento,
              }).catch(function () {
                return { ok: false };
              });
              if (!socio.ok) {
                // desfaz o cliente criado para nao ficar pela metade
                await requisicaoJson("/usuario/excluir/" + cliente.id, {
                  method: "DELETE",
                }).catch(function () {});
                throw new Error("Não foi possível gravar as datas do sócio.");
              }
            }
            alert("Sócio gravado com sucesso!");
            limparFormularioSocio();
            await carregarListas();
          } catch (erro) {
            alert("Erro ao gravar o sócio: " + erro.message);
          }
        }

        async function excluirSocio(botao) {
          var id = botao.dataset.id;
          if (!confirm("Deseja realmente excluir este sócio?")) return;

          try {
            // o servidor apaga SOCIO e CLIENTE juntos (bloqueia se houver pedidos)
            var socio = await requisicaoJson(
              "/socio/excluir/" + encodeURIComponent(id),
              { method: "DELETE" },
            );
            if (!socio.ok) {
              throw new Error(socio.erro || "O servidor não excluiu o sócio.");
            }

            alert("Sócio Excluido com Sucesso!!");

            await carregarListas();
          } catch (erro) {
            alert("Erro ao excluir o sócio: " + erro.message);
          }
        }

        document
          .querySelector("#btnGravarSocio")
          .addEventListener("click", gravarSocio);
        document
          .querySelector("#btnLimparSocio")
          .addEventListener("click", limparFormularioSocio);
        listaSocios.addEventListener("click", function (evento) {
          var botaoEditar = evento.target.closest(".btnEditarSocio");
          var botaoExcluir = evento.target.closest(".btnExcluirSocio");
          if (botaoEditar) editarSocio(botaoEditar);
          if (botaoExcluir) excluirSocio(botaoExcluir);
        });
        limparFormularioSocio();

        // ──────────────────────────────────────────────
        // FORNECEDORES
        // ──────────────────────────────────────────────
        var fornecedoresPorId = {};

        var camposFornecedor = {
          nomeFornecedor: "#fornRazao",
          nomeFantasia: "#fornFantasia",
          cnpjFornecedor: "#fornCnpj",
          nomeResponsavel: "#fornResponsavel",
          cpfResponsavel: "#fornCpfResponsavel",
          emailFornecedor: "#fornEmail",
          telefone: "#fornTelefone",
          celular: "#fornCelular",
          cep: "#fornCep",
          cidade: "#fornCidade",
          estado: "#fornEstado",
          bairro: "#fornBairro",
          numero: "#fornNumero",
          formaPagamento: "#fornPagamento",
        };

        var nomesPagamento = {
          debcred: "Cartão",
          ted: "TED",
          pix: "PIX",
          cheque: "Cheque",
        };

        function renderizarFornecedores(fornecedores) {
          fornecedoresPorId = {};
          listaFornecedores.replaceChildren();
          if (fornecedores.length === 0) {
            linhaVazia(
              listaFornecedores,
              7,
              "Nenhum fornecedor cadastrado ainda.",
            );
          }
          fornecedores.forEach(function (fornecedor) {
            fornecedoresPorId[fornecedor.id] = fornecedor;
            var linha = document.createElement("tr");
            linha.append(
              criarCelula(fornecedor.nomeFornecedor),
              criarCelula(fornecedor.nomeFantasia),
              criarCelula(formatarCnpj(fornecedor.cnpjFornecedor)),
              criarCelula(fornecedor.nomeResponsavel),
              criarCelula(fornecedor.telefone),
              criarCelula(
                nomesPagamento[fornecedor.formaPagamento] ||
                  fornecedor.formaPagamento,
              ),
            );
            var acoes = document.createElement("td");
            acoes.append(
              criarBotaoAcao(
                "btn-outline btnEditarFornecedor",
                fornecedor.id,
                "fa-solid fa-pen",
              ),
              criarBotaoAcao(
                "btn-danger btnExcluirFornecedor",
                fornecedor.id,
                "fa-solid fa-trash",
              ),
            );
            linha.appendChild(acoes);
            listaFornecedores.appendChild(linha);
          });
          document.querySelector("#totalFornecedores").textContent =
            fornecedores.length;
        }

        function limparFormularioFornecedor() {
          document.querySelector("#idFornecedor").value = "";
          Object.values(camposFornecedor).forEach(function (seletor) {
            document.querySelector(seletor).value = "";
          });
          document.querySelector("#fornSenha").value = "";
          document.querySelector("#grupoSenhaFornecedor").style.display = "";
          document.querySelector("#tituloFormFornecedor").textContent =
            "Cadastrar Fornecedor";
        }

        function editarFornecedor(botao) {
          var fornecedor = fornecedoresPorId[botao.dataset.id];
          if (!fornecedor) return;
          document.querySelector("#idFornecedor").value = fornecedor.id;
          Object.keys(camposFornecedor).forEach(function (campo) {
            var valor = fornecedor[campo];
            if (campo === "cnpjFornecedor") valor = formatarCnpj(valor);
            if (campo === "cpfResponsavel") valor = formatarCpf(valor);
            document.querySelector(camposFornecedor[campo]).value =
              valor == null ? "" : valor;
          });
          document.querySelector("#grupoSenhaFornecedor").style.display =
            "none";
          document.querySelector("#tituloFormFornecedor").textContent =
            "Alterar Fornecedor";
          document
            .querySelector("#fornRazao")
            .scrollIntoView({ behavior: "smooth" });
        }

        async function gravarFornecedor() {
          var id = document.querySelector("#idFornecedor").value;
          var dados = {};
          Object.keys(camposFornecedor).forEach(function (campo) {
            dados[campo] = document
              .querySelector(camposFornecedor[campo])
              .value.trim();
          });
          var senha = document.querySelector("#fornSenha").value;

          // obrigatorios do fornecedor (os outros campos podem ficar vazios)
          var obrigatorios = ["nomeFornecedor", "cnpjFornecedor",
            "emailFornecedor", "celular", "formaPagamento"];
          var faltando = false;
          for (var i = 0; i < obrigatorios.length; i++) {
            if (dados[obrigatorios[i]] == "") {
              faltando = true;
            }
          }
          if (faltando || (!id && senha === "")) {
            alert("Preencha corretamente todos os campos obrigatorios!");
            return;
          }

          try {
            var resultado;
            if (id) {
              dados.id = id;
              resultado = await enviarJson("/fornecedor/alterar", dados);
            } else {
              dados.senhaFornecedor = senha;
              resultado = await enviarJson("/fornecedor/cadastrar", dados);
            }
            if (!resultado.ok) {
              throw new Error("Confira CNPJ, CPF, CEP e UF informados.");
            }
            alert("Fornecedor gravado com sucesso!");
            limparFormularioFornecedor();
            await carregarListas();
          } catch (erro) {
            alert("Erro ao gravar o fornecedor: " + erro.message);
          }
        }

        async function excluirFornecedor(botao) {
          if (!confirm("Deseja realmente excluir este fornecedor?")) return;

          try {
            var resultado = await requisicaoJson(
              "/fornecedor/excluir/" + encodeURIComponent(botao.dataset.id),
              { method: "DELETE" },
            );
            if (!resultado.ok) {
              throw new Error(
                resultado.erro || "O servidor não excluiu o fornecedor.",
              );
            }

            alert("Fornecedor Excluido com Sucesso!");

            await carregarListas();
          } catch (erro) {
            alert("Erro ao excluir o fornecedor: " + erro.message);
          }
        }

        document
          .querySelector("#btnGravarFornecedor")
          .addEventListener("click", gravarFornecedor);
        document
          .querySelector("#btnLimparFornecedor")
          .addEventListener("click", limparFormularioFornecedor);
        listaFornecedores.addEventListener("click", function (evento) {
          var botaoEditar = evento.target.closest(".btnEditarFornecedor");
          var botaoExcluir = evento.target.closest(".btnExcluirFornecedor");
          if (botaoEditar) editarFornecedor(botaoEditar);
          if (botaoExcluir) excluirFornecedor(botaoExcluir);
        });

        // ──────────────────────────────────────────────
        // PEDIDOS DOS SOCIOS
        // ──────────────────────────────────────────────
        var listaPedidos = document.querySelector("#listaPedidos");
        var filtroPedidoSocio = document.querySelector("#filtroPedidoSocio");
        var filtroPedidoStatus = document.querySelector("#filtroPedidoStatus");
        var todosPedidos = [];

        // mesmos valores do enum STATUS_PEDIDO do banco
        var opcoesStatus = [
          "Aguardando Separação",
          "Em Andamento",
          "Aguardando Pagamento",
          "Aguardando Retirada",
          "Em Rota de Entrega",
          "Entregue",
          "Cancelado",
        ];

        filtroPedidoSocio.addEventListener("change", renderizarPedidos);
        filtroPedidoStatus.addEventListener("change", renderizarPedidos);
        listaPedidos.addEventListener("change", mudarStatusPedido);

        function carregarPedidos() {
          fetch("/pedido/listar")
            .then(function (resposta) {
              return resposta.json();
            })
            .then(function (pedidos) {
              todosPedidos = pedidos;
              montarFiltroSocios();
              renderizarPedidos();
            })
            .catch(function () {
              alert("Não foi possível carregar os pedidos.");
            });
        }

        // pedido em aberto = nao esta Entregue nem Cancelado
        function pedidoEmAberto(pedido) {
          return (
            pedido.STATUS_PEDIDO != "Entregue" &&
            pedido.STATUS_PEDIDO != "Cancelado"
          );
        }

        // "2026-10-08 14:05:00" -> "08/10/2026 14:05"
        function formatarDataHora(dataHora) {
          if (!dataHora) return "";
          var partes = dataHora.split(" ");
          var hora = "";
          if (partes.length > 1) {
            hora = " " + partes[1].substring(0, 5);
          }
          return formatarData(partes[0]) + hora;
        }

        // coloca no filtro cada socio que tem pedido (sem repetir)
        function montarFiltroSocios() {
          var escolhido = filtroPedidoSocio.value;
          filtroPedidoSocio.innerHTML =
            '<option value="">Todos os sócios</option>';

          var jaIncluidos = [];
          for (var i = 0; i < todosPedidos.length; i++) {
            var pedido = todosPedidos[i];
            if (!jaIncluidos.includes(pedido.ID_CLIENTE)) {
              jaIncluidos.push(pedido.ID_CLIENTE);
              var opcao = document.createElement("option");
              opcao.value = pedido.ID_CLIENTE;
              opcao.textContent = pedido.NOME_CLIENTE;
              filtroPedidoSocio.appendChild(opcao);
            }
          }

          // mantem o socio que estava escolhido (se ele ainda tiver pedidos)
          filtroPedidoSocio.value = escolhido;
          if (filtroPedidoSocio.selectedIndex == -1) {
            filtroPedidoSocio.value = "";
          }
        }

        function renderizarPedidos() {
          var socio = filtroPedidoSocio.value;
          var situacao = filtroPedidoStatus.value;
          var totalAbertos = 0;
          listaPedidos.innerHTML = "";

          for (var i = 0; i < todosPedidos.length; i++) {
            var pedido = todosPedidos[i];
            if (pedidoEmAberto(pedido)) {
              totalAbertos++;
            }

            var mostrar = true;
            if (socio != "" && pedido.ID_CLIENTE != socio) {
              mostrar = false;
            }
            if (situacao == "abertos" && !pedidoEmAberto(pedido)) {
              mostrar = false;
            }
            if (
              situacao != "abertos" &&
              situacao != "" &&
              pedido.STATUS_PEDIDO != situacao
            ) {
              mostrar = false;
            }

            if (mostrar) {
              listaPedidos.appendChild(criarLinhaPedido(pedido));
            }
          }

          if (listaPedidos.children.length == 0) {
            linhaVazia(listaPedidos, 7, "Nenhum pedido encontrado.");
          }
          document.querySelector("#totalPedidosAbertos").textContent =
            totalAbertos;
        }

        function criarLinhaPedido(pedido) {
          var linha = document.createElement("tr");
          linha.appendChild(criarCelula(pedido.ID_PEDIDO));
          linha.appendChild(criarCelula(formatarDataHora(pedido.DATA_PEDIDO)));
          linha.appendChild(criarCelula(pedido.NOME_CLIENTE));

          // itens: "2x Picanha"
          var celulaItens = document.createElement("td");
          var lista = document.createElement("ul");
          lista.className = "itens-pedido";
          for (var i = 0; i < pedido.ITENS.length; i++) {
            var item = document.createElement("li");
            item.textContent =
              pedido.ITENS[i].QNT_PEDIDO + "x " + pedido.ITENS[i].NOME_PRODUTO;
            lista.appendChild(item);
          }
          celulaItens.appendChild(lista);
          linha.appendChild(celulaItens);

          var valor = Number(pedido.VALOR_PEDIDO).toFixed(2).replace(".", ",");
          linha.appendChild(criarCelula("R$ " + valor));
          linha.appendChild(criarCelula(pedido.TIPO_PEDIDO));

          // status: pedido em aberto pode mudar; encerrado mostra so o selo
          var celulaStatus = document.createElement("td");
          if (pedidoEmAberto(pedido)) {
            var select = document.createElement("select");
            select.className = "select-status";
            select.dataset.id = pedido.ID_PEDIDO;
            select.dataset.atual = pedido.STATUS_PEDIDO;
            for (var j = 0; j < opcoesStatus.length; j++) {
              var opcao = document.createElement("option");
              opcao.value = opcoesStatus[j];
              opcao.textContent = opcoesStatus[j];
              select.appendChild(opcao);
            }
            select.value = pedido.STATUS_PEDIDO;
            celulaStatus.appendChild(select);
          } else {
            var selo = document.createElement("span");
            if (pedido.STATUS_PEDIDO == "Entregue") {
              selo.className = "badge badge-ativo";
            } else {
              selo.className = "badge badge-inativo";
            }
            selo.textContent = pedido.STATUS_PEDIDO;
            celulaStatus.appendChild(selo);
          }
          linha.appendChild(celulaStatus);

          return linha;
        }

        function mudarStatusPedido(evento) {
          var select = evento.target;
          if (!select.classList.contains("select-status")) return;

          var novoStatus = select.value;
          var mensagem =
            "Mudar o pedido nº " + select.dataset.id + ' para "' + novoStatus + '"?';
          if (novoStatus == "Entregue" || novoStatus == "Cancelado") {
            mensagem += "\nDepois disso o status não poderá mais ser alterado.";
          }
          if (novoStatus == "Cancelado") {
            mensagem += "\nAs quantidades dos itens voltam para o estoque.";
          }
          if (!confirm(mensagem)) {
            select.value = select.dataset.atual;
            return;
          }

          var obj = {
            id: select.dataset.id,
            status: novoStatus,
          };

          fetch("/pedido/status", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (resposta) {
              return resposta.json();
            })
            .then(function (CorpoResposta) {
              if (CorpoResposta.ok) {
                alert("Status do pedido alterado com sucesso!");
                // recarrega tudo: pedidos e o estoque dos produtos (cancelamento)
                carregarListas();
              } else {
                alert(
                  "Erro ao alterar o status: " +
                    (CorpoResposta.erro || "tente novamente."),
                );
                select.value = select.dataset.atual;
              }
            })
            .catch(function () {
              alert("Não foi possível alterar o status. Tente novamente.");
              select.value = select.dataset.atual;
            });
        }
      });
