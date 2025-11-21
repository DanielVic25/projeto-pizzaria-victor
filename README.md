# 🍕 Projeto E-commerce: Pizzaria & Cia

Bem-vindo ao repositório do projeto **Pizzaria & Cia**. Abaixo você encontra a história de como tudo foi construído e as instruções passo a passo para executar o código.

## 📖 A Mini História do Projeto

A **Pizzaria & Cia** nasceu da ideia de facilitar a vida de quem ama pizza. O objetivo era simples: criar um sistema onde o cliente pudesse ver o cardápio e fazer o pedido sem sair de casa.

1.  **O Início (Frontend):** Tudo começou pelo visual. Criamos as páginas usando **HTML**, **CSS**  e **JAVASCRIPT** puro mesmo, para mostrar as nossas pizzas (como a famosa Frango com Catupiry e a clássica Margherita) de forma atrativa.
2.  **A Inteligência (Backend):** Para que o site funcionasse de verdade, precisávamos de um "cérebro" por trás. Desenvolvemos o servidor com **Node.js** e **Express**, que atua como nosso gerente digital, recebendo e organizando os pedidos.
3.  **O Arquivo (Banco de Dados):** Por fim, conectamos tudo ao **MongoDB**. É lá que guardamos todas as informações importantes para que nenhum pedido se perca no caminho.

---

## 🚀 Instruções de Como Rodar o Código

Siga a ordem abaixo para colocar o sistema no ar:

### 1. Frontend (Visual)
Para ver o site funcionando, vamos usar o VS Code:
1.  Abra a pasta do projeto no **VS Code**.
2.  Vá até a pasta `FrontEnd` e encontre o arquivo `index.html`.
3.  Clique com o botão direito e selecione **"Open with Live Server"**.

### 2. Backend (Servidor)
Agora vamos ligar o servidor. Abra o seu terminal e digite os comandos abaixo, um por um:

1.  Entre na pasta do servidor:
    ```bash
    cd backend
    ```

2.  Instale a biblioteca `nodemon` (ela ajuda o servidor a atualizar sozinho):
    ```bash
    npm install --save-dev nodemon
    ```

3.  Instale as outras dependências do projeto (caso ainda não tenha feito):
    ```bash
    npm install
    ```

### 3. Configuração do Banco de Dados MongoDB Atlas
O servidor precisa saber onde salvar os dados.
1.  Crie (ou edite) o arquivo `.env` dentro da pasta `Backend`.
2.  Mude a variável de ambiente para a sua própria URI de conexão do MongoDB Atlas:
    ```env
    MONGO_URI=coloque_sua_outra_uri_aqui
    PORT=coloque-sua-porta
    ```

### 4. Rodando
Com tudo configurado, inicie o servidor com o comando:
```bash
npm run dev
