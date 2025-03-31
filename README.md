# Calculadora de ICMS (DIFAL)

A **Calculadora de ICMS** é uma aplicação web simples desenvolvida em **React** com **TypeScript**, projetada para calcular o valor do ICMS devido com base no valor de uma operação e na alíquota de ICMS selecionada pelo usuário.

## 🚀 Tecnologias Utilizadas

- **React** + **Vite**: Framework e ferramenta de desenvolvimento frontend.
- **TypeScript**: Para garantir tipagem e segurança no código.
- **Radix UI**: Para criação de componentes acessíveis.
- **React Toastify**: Para exibição de notificações amigáveis.
- **Tailwindcss**: Para estilização da interface.

## 🧮 Funcionalidades

- Inserir o **valor da operação** em campo numérico.
- Selecionar se o produto é **Nacional** ou **Importado**.
- Calcular automaticamente o valor de ICMS devido com base no valor da operação e na origem do produto.
- Resultado formatado de acordo com os padrões brasileiros (R$ com separadores de milhar e decimal).
- Notificações interativas para casos de erro, como falta de preenchimento ou valores inválidos.

## 🖥️ Interface do Usuário

A aplicação é composta pelos seguintes elementos:

1. **Campo de entrada para valor da operação**: Permite que o usuário insira o valor em reais.
2. **Dropdown para seleção de origem do produto**: Opções de origem de produto(Nacional ou Importado).
3. **Botão de calcular**: Gera o cálculo e exibe o resultado.
4. **Resultado da operação**: Exibido no formato monetário brasileiro (exemplo: `R$ 45.241,00`).

## 🔧 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

**1**. Clone o repositório:
  ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
  ```

**2**. Acesse o diretório do projeto:
  ```bash
    cd calculadora-difal
  ```

**3**. Instale as dependências:
  ```bash
    npm install
  ```

**4**. Inicie o servidor de desenvolvimento:
  ```bash
    npm run dev
  ```

**5**. Abra o navegador no endereço:
  ```bash
    http://localhost:5173
  ```
    
**6**. Inicie o servidor de desenvolvimento:
  ```bash
    cd calculadora-difal
  ```