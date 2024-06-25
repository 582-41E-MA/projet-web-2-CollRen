module.exports = app => {
    const expeditions = require("../../controllers/expedition.controller.js");

    var router = require("express").Router();

    // Create a new Expedition
    router.post("/", expeditions.create);

    // Retrieve all Expeditions
    router.get("/", expeditions.findAll);

    // Retrieve a single Expedition with id
    router.get("/:id", expeditions.findOne);

    // Update a Expedition with id
    router.put("/:id", expeditions.update);

    // Delete a Expedition with id
    router.delete("/:id", expeditions.delete);

    // Delete all Expeditions
    router.delete("/", expeditions.deleteAll);

    app.use('/api/expeditions', router);
};