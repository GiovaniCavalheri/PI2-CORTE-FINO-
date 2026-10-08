# 🔧 Guia de Uso do Git — PI Corte Fino

Padrão de trabalho em equipe para o repositório [PI-CORTE-FINO-REFAT](https://github.com/GiovaniCavalheri/PI-CORTE-FINO-REFAT).

---

## 1. Configuração Inicial (apenas na primeira vez)

Instale o Git e configure seu nome e e-mail — isso é obrigatório para registrar commits:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

Verifique se configurou corretamente:

```bash
git config --list
```

---

## 2. Clonando o Repositório (apenas uma vez por máquina)

```bash
git clone https://github.com/GiovaniCavalheri/PI2-CORTE-FINO-.git
cd PI2-CORTE-FINO
```

> O `clone` cria uma cópia completa do projeto na sua máquina.

---

## 3. Regra Principal ⚠️

> **Nunca trabalhe diretamente na branch `main`.**  
> Sempre crie uma nova branch para cada tarefa.

---

## 4. Criando uma Nova Branch

Antes de começar qualquer funcionalidade:

```bash
git checkout -b nome-da-branch
```

**Exemplos:**

```bash
git checkout -b feature-login
git checkout -b correcao-bug-navbar
git checkout -b ajuste-layout
```

**Boas práticas:**
- Use nomes descritivos
- Evite espaços — use hífen para separar palavras

---

## 5. Fazendo Alterações e Criando Commits

Depois de editar os arquivos:

```bash
# Veja o que foi alterado
git status

# Adicione os arquivos modificados
git add .

# Crie o commit com uma descrição clara
git commit -m "Implementa validação de formulário de cadastro"
```

**Boas práticas para mensagens de commit:**
- Seja objetivo
- Descreva **o que foi feito**, não o que será feito
- Evite mensagens vagas como `"ajustes"` ou `"mudanças"`

---

## 6. Enviando para o GitHub

Após o commit, envie sua branch:

```bash
git push origin nome-da-branch
```

**Exemplo:**

```bash
git push origin feature-login
```

---

## 7. Criando um Pull Request (PR)

1. Acesse o repositório no GitHub
2. Clique em **Pull Requests**
3. Clique em **New Pull Request**
4. Selecione sua branch
5. Descreva o que foi feito
6. Envie para revisão

> ⚠️ **Outro desenvolvedor deve revisar e aprovar antes do merge.**

---

## Fluxo Resumido

```
main
 └── git checkout -b minha-feature
       └── editar arquivos
             └── git add . && git commit -m "..."
                   └── git push origin minha-feature
                         └── Abrir Pull Request no GitHub
```
