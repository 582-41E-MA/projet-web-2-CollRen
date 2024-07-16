module.exports = app => {
    const commande_has_taxes = require("../../controllers/commande_has_taxe.controller.js");

    var router = require("express").Router();

    // Create a new Commande_has_commande_has_taxe
    router.post("/", commande_has_taxes.create);

    // Retrieve all Commande_has_commande_has_taxes
    router.get("/", commande_has_taxes.findAll);

    // Retrieve a single Commande_has_commande_has_taxe with id
    router.get("/:id", commande_has_taxes.findOne);

    // Update a Commande_has_commande_has_taxe with id
    router.put("/:id", commande_has_taxes.update);

    // Delete a Commande_has_commande_has_taxe with id
    router.delete("/:id", commande_has_taxes.delete);

    // Delete all Commande_has_commande_has_taxes
    router.delete("/", commande_has_taxes.deleteAll);

    app.use('/api/commande_has_taxes', router);
};