const express = require("express");
const router = express.Router();
const db = require("../data/db.js");
//const { check, validationResult } = require("express-validator"); // Librairie pour valider
//const getAutosValidator = require("../middlewares/getAutosValidator.js");
//const getAutoValidator = require("../middlewares/getAutoValidator.js");
//const postAutoValidator = require("../middlewares/postAutoValidator.js");
//const validationError = require("../middlewares/validationError.js");
//const dataExist = require("../validations/dataExist.js");
//const auth = require("../middlewares/auth.js");


router.get('/', (req, res) => {

    db.query('SELECT * FROM vehicule', function (error, results, fields) {

        if (error) throw error;
        console.log(results);
        res.json(results);
    });
}
)

module.exports = router;