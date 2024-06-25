module.exports = app => {
    const transmissions = require("../../controllers/transmission.controller.js");

    var router = require("express").Router();

    // Create a new Transmission
    router.post("/", transmissions.create);

    // Retrieve all Transmissions
    router.get("/", transmissions.findAll);

    // Retrieve a single Transmission with id
    router.get("/:id", transmissions.findOne);

    // Update a Transmission with id
    router.put("/:id", transmissions.update);

    // Delete a Transmission with id
    router.delete("/:id", transmissions.delete);

    // Delete all Transmissions
    router.delete("/", transmissions.deleteAll);

    app.use('/api/transmissions', router);
};