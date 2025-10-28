
async function buscarPedidos() {
  try {
    // 1. Busca os pedidos no backend (usando a rota GET que você criou)
    const resposta = await fetch("http://localhost:5000/order");
    if (!resposta.ok) {
      alert("Erro ao buscar pedidos do servidor.");
      return;
    }

    const pedidos = await resposta.json();
    const listaDiv = document.getElementById("lista-de-pedidos");
    listaDiv.innerHTML = ""; 

    // 2. Cria o HTML para cada pedido que veio do banco
    pedidos.forEach(pedido => {
      const item = document.createElement("div");
      
      // Adiciona um estilo simples para o item do pedido
      item.style.border = "1px solid #ccc";
      item.style.padding = "10px";
      item.style.marginBottom = "10px";
      
      item.innerHTML = `
        <p><strong>Pizza:</strong> ${pedido.pizza} (R$${pedido.preco})</p>
        <p><strong>Cliente:</strong> ${pedido.cliente.nome}</p>
        
        <button class="deletar" onclick="deletarPedido('${pedido._id}')">
          Cancelar Pedido
        </button>
      `;
      listaDiv.appendChild(item);
    });

  } catch (erro) {
    console.error("Falha ao buscar pedidos:", erro);
    alert("Erro de rede ao buscar pedidos.");
  }
}


async function comprarPizza(nome, preco) {
  const pedido = {
    pizza: nome,
    preco: preco,
    cliente: {
      nome: "Cliente Teste", 
      endereco: "Rua Exemplo, 123",
      telefone: "(11) 99999-9999"
    }
  };

  try {
    const resposta = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      alert(` Pedido confirmado!\nPizza: ${dados.pizza}\nPreço: R$${dados.preco}`);
      
      // ATUALIZA A LISTA DE PEDIDOS na tela
      buscarPedidos(); 
    } else {
      alert(" Erro ao efetivar a compra.");
    }
  } catch (erro) {
    alert(" Não foi possível conectar ao servidor.");
  }
}


async function deletarPedido(id) {
  try {
    const resposta = await fetch(`http://localhost:5000/order/${id}`, {
      method: "DELETE"
    });

    if (resposta.ok) {
      alert(`Pedido ID: ${id} deletado com sucesso!`);
      
      // ATUALIZA A LISTA DE PEDIDOS na tela (remove o item)
      buscarPedidos();
      // location.reload(); // Não precisamos mais recarregar a página inteira
    } else {
      const erro = await resposta.json();
      alert(`Erro ao deletar: ${erro.message || resposta.status}`);
    }

  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Não foi possível conectar ao servidor para deletar o pedido.');
  }
}


window.onload = buscarPedidos;