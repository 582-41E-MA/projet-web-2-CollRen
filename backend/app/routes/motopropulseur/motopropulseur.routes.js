module.exports = app => {
    const motopropulseurs = require("../../controllers/motopropulseur.controller.js");

    var router = require("express").Router();

    // Create a new Motopropulseur
    router.post("/", motopropulseurs.create);

    // Retrieve all Motopropulseurs
    router.get("/", motopropulseurs.findAll);

    // Retrieve a single Motopropulseur with id
    router.get("/:id", motopropulseurs.findOne);

    // Update a Motopropulseur with id
    router.put("/:id", motopropulseurs.update);

    // Delete a Motopropulseur with id
    router.delete("/:id", motopropulseurs.delete);

    // Delete all Motopropulseurs
    router.delete("/", motopropulseurs.deleteAll);

    app.use('/api/motopropulseurs', router);
};