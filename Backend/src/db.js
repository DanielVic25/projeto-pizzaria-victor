const mongoose = require("mongoose");

async function connect(uri) {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log("Conectado ao banco de dados MongoDB!!");
}

module.exports = { connect };