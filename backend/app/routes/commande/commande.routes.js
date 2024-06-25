module.exports = app => {
    const commandes = require("../../controllers/commande.controller.js");

    var router = require("express").Router();

    // Create a new Commande
    router.post("/", commandes.create);

    // Retrieve all Commandes
    router.get("/", commandes.findAll);

    // Retrieve a single Commande with id
    router.get("/:id", commandes.findOne);

    // Update a Commande with id
    router.put("/:id", commandes.update);

    // Delete a Commande with id
    router.delete("/:id", commandes.delete);

    // Delete all Commandes
    router.delete("/", commandes.deleteAll);

    app.use('/api/commandes', router);
};