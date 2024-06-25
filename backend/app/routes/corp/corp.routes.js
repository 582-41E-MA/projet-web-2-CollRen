module.exports = app => {
    const corps = require("../../controllers/corp.controller.js");

    var router = require("express").Router();

    // Create a new Corp
    router.post("/", corps.create);

    // Retrieve all Corps
    router.get("/", corps.findAll);

    // Retrieve a single Corp with id
    router.get("/:id", corps.findOne);

    // Update a Corp with id
    router.put("/:id", corps.update);

    // Delete a Corp with id
    router.delete("/:id", corps.delete);

    // Delete all Corps
    router.delete("/", corps.deleteAll);

    app.use('/api/corps', router);
};