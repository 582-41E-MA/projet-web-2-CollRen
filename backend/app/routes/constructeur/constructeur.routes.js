module.exports = app => {
    const constructeurs = require("../../controllers/constructeur.controller.js");

    var router = require("express").Router();

    // Create a new Constructeur
    router.post("/", constructeurs.create);

    // Retrieve all Constructeurs
    router.get("/", constructeurs.findAll);

    // Retrieve a single Constructeur with id
    router.get("/:id", constructeurs.findOne);

    // Update a Constructeur with id
    router.put("/:id", constructeurs.update);

    // Delete a Constructeur with id
    router.delete("/:id", constructeurs.delete);

    // Delete all Constructeurs
    router.delete("/", constructeurs.deleteAll);

    app.use('/api/constructeurs', router);
};