
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connect } = require("./db");
const error = require("./middlewares/error");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health",(req, res) => {
    res.json({ message: "A API está em execução..."});
});


app.use("/order", orderRoutes);

app.use(error);

const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Servidor Rodando na PORTA ${PORT}`));
    })
    .catch((error) => {
        console.log("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    });




