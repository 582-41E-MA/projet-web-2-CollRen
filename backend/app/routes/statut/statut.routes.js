module.exports = app => {
    const statuts = require("../../controllers/statut.controller.js");

    var router = require("express").Router();

    // Create a new Statut
    router.post("/", statuts.create);

    // Retrieve all Statuts
    router.get("/", statuts.findAll);

    // Retrieve a single Statut with id
    router.get("/:id", statuts.findOne);

    // Update a Statut with id
    router.put("/:id", statuts.update);

    // Delete a Statut with id
    router.delete("/:id", statuts.delete);

    // Delete all Statuts
    router.delete("/", statuts.deleteAll);

    app.use('/api/statuts', router);
};