module.exports = app => {
    const models = require("../../controllers/model.controller.js");

    var router = require("express").Router();

    // Create a new Model
    router.post("/", models.create);

    // Retrieve all Models
    router.get("/", models.findAll);

    // Retrieve a single Model with id
    router.get("/:id", models.findOne);

    // Update a Model with id
    router.put("/:id", models.update);

    // Delete a Model with id
    router.delete("/:id", models.delete);

    // Delete all Models
    router.delete("/", models.deleteAll);

    app.use('/api/models', router);
};