const apiUrl = "http://localhost:5000/order"; // URL do seu backend

let pizzaSelecionada = null;
let precoSelecionado = 0;

// Abre o formulário e mostra o nome da pizza
function abrirFormulario(pizza, preco) {
  pizzaSelecionada = pizza;
  precoSelecionado = preco;
  document.getElementById("pizza-escolhida").textContent = `Pizza: ${pizza} - R$ ${preco}`;
  document.getElementById("modal-compra").style.display = "flex";
}

// Fecha o formulário
function fecharFormulario() {
  document.getElementById("modal-compra").style.display = "none";
  document.getElementById("form-compra").reset();
}

// Enviar pedido ao backend
async function finalizarCompra(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  if (!nome || !telefone || !endereco || !pagamento) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const pedido = {
    pizza: pizzaSelecionada,
    preco: precoSelecionado,
    cliente: {
      nome: nome,
      telefone: telefone,
      endereco: endereco
    },
    pagamento: pagamento
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    if (res.ok) {
      alert("🍕 Pedido realizado com sucesso!");
      fecharFormulario();
      carregarPedidos();
    } else {
      alert("❌ Erro ao realizar o pedido. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Falha ao conectar com o servidor.");
  }
}

// Listar pedidos
async function carregarPedidos() {
  const lista = document.getElementById("lista-de-pedidos");
  lista.innerHTML = "<p>Carregando pedidos...</p>";

  try {
    const res = await fetch(apiUrl);
    const pedidos = await res.json();

    if (!pedidos.length) {
      lista.innerHTML = "<p>Nenhum pedido realizado ainda.</p>";
      return;
    }

    lista.innerHTML = pedidos
      .map(
        (p) => `
        <div class="pedido-item">
          <p><strong>${p.pizza}</strong> - R$ ${p.preco}</p>
          <p><strong>Nome:</strong> ${p.cliente?.nome || "Não informado"}</p>
          <p><strong>Telefone:</strong> ${p.cliente?.telefone || "Não informado"}</p>
          <p><strong>Endereço:</strong> ${p.cliente?.endereco || "Não informado"}</p>
          <p><strong>Pagamento:</strong> ${p.pagamento || "N/A"}</p>
          <button onclick="deletarPedido('${p._id}')">🗑️ Excluir</button>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
    lista.innerHTML = "<p>Erro ao carregar pedidos. Tente novamente mais tarde.</p>";
  }
}

// Deletar pedido
async function deletarPedido(id) {
  const confirmar = confirm("Deseja realmente excluir este pedido?");
  if (!confirmar) return;

  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("🗑️ Pedido excluído com sucesso!");
      carregarPedidos();
    } else {
      alert("Erro ao excluir pedido!");
    }
  } catch (error) {
    console.error("Erro ao excluir:", error);
    alert("Falha na exclusão. Verifique o servidor.");
  }
}

// Carrega pedidos automaticamente ao abrir a página
document.addEventListener("DOMContentLoaded", carregarPedidos);
