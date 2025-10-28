const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  pizza: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  cliente: {
    nome: String,
    endereco: String,
    telefone: String
  },
  dataPedido: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
