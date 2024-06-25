module.exports = app => {
    const provinces = require("../../controllers/province.controller.js");

    var router = require("express").Router();

    // Create a new Province
    router.post("/", provinces.create);

    // Retrieve all Provinces
    router.get("/", provinces.findAll);

    // Retrieve a single Province with id
    router.get("/:id", provinces.findOne);

    // Update a Province with id
    router.put("/:id", provinces.update);

    // Delete a Province with id
    router.delete("/:id", provinces.delete);

    // Delete all Provinces
    router.delete("/", provinces.deleteAll);

    app.use('/api/provinces', router);
};