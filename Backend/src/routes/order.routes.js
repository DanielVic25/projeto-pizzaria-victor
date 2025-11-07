const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Criar pedido
router.post("/", async (req, res) => {
  try {
    const novoPedido = new Order(req.body);
    await novoPedido.save();
    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar pedidos
router.get("/", async (req, res) => {
  try {
    const pedidos = await Order.find().sort({ dataPedido: -1 });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar pedido
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
