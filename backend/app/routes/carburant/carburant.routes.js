module.exports = app => {
    const carburants = require("../../controllers/carburant.controller.js");

    var router = require("express").Router();

    // Create a new Carburant
    router.post("/", carburants.create);

    // Retrieve all Carburants
    router.get("/", carburants.findAll);

    // Retrieve a single Carburant with id
    router.get("/:id", carburants.findOne);

    // Update a Carburant with id
    router.put("/:id", carburants.update);

    // Delete a Carburant with id
    router.delete("/:id", carburants.delete);

    // Delete all Carburants
    router.delete("/", carburants.deleteAll);

    app.use('/api/carburants', router);
};