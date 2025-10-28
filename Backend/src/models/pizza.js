const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  ingredientes: { type: [String], required: true },
  preco: { type: Number, required: true },
  tamanho: { type: String, enum: ["Pequena", "Média", "Grande"], default: "Média" }
});

module.exports = mongoose.model("Pizza", pizzaSchema);
