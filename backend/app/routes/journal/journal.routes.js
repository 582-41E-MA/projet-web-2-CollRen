module.exports = app => {
    const journals = require("../../controllers/journal.controller.js");

    var router = require("express").Router();

    // Create a new Journal
    router.post("/", journals.create);

    // Retrieve all Journals
    router.get("/", journals.findAll);

    // Retrieve a single Journal with id
    router.get("/:id", journals.findOne);

    // Update a Journal with id
    router.put("/:id", journals.update);

    // Delete a Journal with id
    router.delete("/:id", journals.delete);

    // Delete all Journals
    router.delete("/", journals.deleteAll);

    app.use('/api/journals', router);
};