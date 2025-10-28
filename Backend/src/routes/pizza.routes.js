const express = require("express");
const Pizza = require("../models/pizza");
const routes = express.Router();

// GET - Listar todas as pizzas
routes.get('/pizza', async (req, res, next) => {
        console.log("Chegou na porta de obter todas as pizzas");
    try {
        const pizzas = await Pizza.find();
        return res.status(201).json(pizzas);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao obter pizzas", error: error.message });

    }
});

 // GET - Obter uma pizza por ID
 routes.get('/pizza/:id', async (req, res, next) => {
    console.log("Chegou na porta de obter pizza por ID");
    try {
        const { id } = req.params;
        const pizzaAtualizada = await Pizza.findById(id);
        if(!pizzaAtualizada) {
            return res.status(404).json({ message: "Pizza não encontrada" });
        }
        
        res.json(pizzaAtualizada);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao obter pizza", error: error.message });
    }
 });

      //POST - Criar nova pizza

routes.post('/pizza', async (req, res, next) => {
    console.log("Chegou na porta de criar nova pizza");
    try {
        const novaPizza = new Pizza(req.body);
        await novaPizza.save();
        return res.status(201).json(novaPizza);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar pizza", error: error.message });
    }
});

    //PUT - Atualizar pizza inteira (substituição total)
    routes.put('/pizza/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const pizzaAtualizada = await Pizza.findByIdAndUpadate(id, req.body);

            if(!pizzaAtualizada) {
                return res.status(404).json({ message: "Pizza não encontrada"});
            }
            return res.json(pizzaAtualizada);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar pizza", error: error.message });
    }
});


    //DELETE - Deletar Pizza 

    routes.delete('/pizza/:id', async (req, res, next) => {
    console.log("Chegou na porta de deletar pizza");

    try {
        const { id } = req.params;
        const pizzaDeletada = await Pizza.findByIdAndDelete(id);
        console.log(pizzaDeletada);

        if(!pizzaDeletada) {
            return res.status(404).json({ message: "Pizza não encontrada" });
        } 
        return res.json({ message: "Pizza deletada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar pizza", error: error.message });
    }
    });


    module.exports = routes;