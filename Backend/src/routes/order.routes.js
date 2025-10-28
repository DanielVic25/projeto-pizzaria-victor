const express = require("express");
const Order = require("../models/order");
const router = express.Router();

// Criar pedido (POST /order)
router.post("/", async (req, res, next) => {
  try {
    const novoPedido = new Order(req.body);
    await novoPedido.save();
    res.status(201).json(novoPedido);
  } catch (error) {
    next(error);
  }
});

// Listar todos os pedidos (GET /order)
router.get("/", async (req, res, next) => {
  try {
    const pedidos = await Order.find();
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    // 1. Pega o ID da URL (ex: /order/12345abc)
    const { id } = req.params;

    // 2. Usa o Mongoose para encontrar esse ID e deletar
    //    findByIdAndDelete retorna o documento que foi deletado (ou null se não achou)
    const pedidoDeletado = await Order.findByIdAndDelete(id);

    // 3. Verifica se um pedido foi realmente encontrado e deletado
    if (!pedidoDeletado) {
      // Se não encontrou, retorna um erro 404 (Não Encontrado)
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    // 4. Se deu certo, retorna uma mensagem de sucesso
    res.status(200).json({ 
      message: "Pedido deletado com sucesso.",
      pedido: pedidoDeletado // Opcional: envia o item que foi deletado
    });

  } catch (error) {
    // 5. Se o ID for inválido ou houver outro erro, passa para o middleware de erro
    next(error);
  }
});



module.exports = router;
