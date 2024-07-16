module.exports = app => {
    const taxes = require("../../controllers/taxe.controller.js");

    var router = require("express").Router();

    // Create a new Taxe
    router.post("/", taxes.create);

    // Retrieve all Taxes
    router.get("/", taxes.findAll);

    // Retrieve a single Taxe with id
    router.get("/:id", taxes.findOne);

    // Update a Taxe with id
    router.put("/:id", taxes.update);

    // Delete a Taxe with id
    router.delete("/:id", taxes.delete);

    // Delete all Taxes
    router.delete("/", taxes.deleteAll);

    app.use('/api/taxes', router);
};