module.exports = app => {
    const villes = require("../../controllers/ville.controller.js");

    var router = require("express").Router();

    // Create a new Ville
    router.post("/", villes.create);

    // Retrieve all Villes
    router.get("/", villes.findAll);

    // Retrieve a single Ville with id
    router.get("/:id", villes.findOne);

    // Update a Ville with id
    router.put("/:id", villes.update);

    // Delete a Ville with id
    router.delete("/:id", villes.delete);

    // Delete all Villes
    router.delete("/", villes.deleteAll);

    app.use('/api/villes', router);
};