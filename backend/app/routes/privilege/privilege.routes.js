module.exports = app => {
    const privileges = require("../../controllers/privilege.controller.js");

    var router = require("express").Router();

    // Create a new Privilege
    router.post("/", privileges.create);

    // Retrieve all Privileges
    router.get("/", privileges.findAll);

    // Retrieve a single Privilege with id
    router.get("/:id", privileges.findOne);

    // Update a Privilege with id
    router.put("/:id", privileges.update);

    // Delete a Privilege with id
    router.delete("/:id", privileges.delete);

    // Delete all Privileges
    router.delete("/", privileges.deleteAll);

    app.use('/api/privileges', router);
};