module.exports = app => {
    const mode_paiements = require("../../controllers/mode_paiement.controller.js");

    var router = require("express").Router();

    // Create a new Mode_paiement
    router.post("/", mode_paiements.create);

    // Retrieve all Mode_paiements
    router.get("/", mode_paiements.findAll);

    // Retrieve a single Mode_paiement with id
    router.get("/:id", mode_paiements.findOne);

    // Update a Mode_paiement with id
    router.put("/:id", mode_paiements.update);

    // Delete a Mode_paiement with id
    router.delete("/:id", mode_paiements.delete);

    // Delete all Mode_paiements
    router.delete("/", mode_paiements.deleteAll);

    app.use('/api/mode_paiements', router);
};