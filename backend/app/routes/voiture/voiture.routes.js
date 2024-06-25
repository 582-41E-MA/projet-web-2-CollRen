module.exports = app => {
    const voitures = require("../../controllers/voiture.controller.js");

    var router = require("express").Router();

    // Create a new Voiture
    router.post("/", voitures.create);

    // Retrieve all Voitures
    router.get("/", voitures.findAll);

    // Retrieve a single Voiture with id
    router.get("/:id", voitures.findOne);

    // Update a Voiture with id
    router.put("/:id", voitures.update);

    // Delete a Voiture with id
    router.delete("/:id", voitures.delete);

    // Delete all Voitures
    router.delete("/", voitures.deleteAll);

    app.use('/api/voitures', router);
};