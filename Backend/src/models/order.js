const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  pizza: { type: String, required: true },
  preco: { type: Number, required: true },
  cliente: {
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    telefone: { type: String, required: true }
  },
  pagamento: { type: String, required: true },
  dataPedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
