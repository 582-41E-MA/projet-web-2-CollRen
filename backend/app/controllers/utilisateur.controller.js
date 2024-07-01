const db = require("../models");
const bcrypt = require("bcrypt");
const Utilisateur = db.utilisateurs;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');


// Create and Save a new Utilisateur
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.nom_utilisateur || !req.body.mot_de_passe) {
        res.status(400).send({
            message: "Le nom d'utilisateur ou le mot de passe doit être présent"
        });
        return;
    }

    //Récupération de données nécessaire à la création d'un compte    
    const nom_de_l_utilisateur = req.body.nom_utilisateur;
    const mot_de_passe = req.body.mot_de_passe;

    // Vérifier si nom_utilisateur existe déjà dans la BD
    //const condition = nom_utilisateur ? { attributes: ['nom_utilisateur'], nom_utilisateur: { [Op.is]: `${nom_utilisateur}` } } : null;
    
    const references = await Utilisateur.findAll({
        where: {
            nom_utilisateur: nom_de_l_utilisateur,
        },
    });
    console.log(await references.length);
    if (references.length != 0) {

                return res.json({ message: "Ce nom d'utilisateur existe déjà" });
            }

    // hash le mot de passe
    const hash = await bcrypt.hash(mot_de_passe, 10);
    req.body.mot_de_passe = hash;


    // Savegarder Utilisateur dans la db
    Utilisateur.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Utilisateur."
            });
        });
};

// Retrieve all Utilisateurs from the database.
exports.findAll = (req, res) => {
/*     const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null; */

    Utilisateur.findAll(/* { where: condition } */)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving utilisateurs."
            });
        });
};

// Find a single Utilisateur with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Utilisateur.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Utilisateur with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Utilisateur with id=" + id
            });
        });
};

// Update a Utilisateur by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Utilisateur.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Utilisateur was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Utilisateur with id=${id}. Maybe Utilisateur was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Utilisateur with id=" + id
            });
        });
};

// Delete a Utilisateur with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Utilisateur.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Utilisateur was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Utilisateur with id=${id}. Maybe Utilisateur was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Utilisateur with id=" + id
            });
        });
};

// Delete all Utilisateurs from the database.
exports.deleteAll = (req, res) => {
    Utilisateur.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Utilisateurs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all utilisateurs."
            });
        });
};



exports.login = async (req, res) => {
    try {
        const { nom_utilisateur, mot_de_passe } = req.body;

        const utilisateur = await Utilisateur.findOne({ where: { nom_utilisateur } });
        if (!utilisateur) {
            return res.status(404).send({ message: "Utilisateur not found." });
        }

        // Verifique se mot_de_passe e utilisateur.mot_de_passe não são nulos ou indefinidos
        if (!mot_de_passe || !utilisateur.mot_de_passe) {
            return res.status(400).send({ message: "Password is required." });
        }

        const passwordIsValid = bcrypt.compareSync(mot_de_passe, utilisateur.mot_de_passe);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }


        const token = jwt.sign({ id: utilisateur.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });


        res.status(200).send({
            id: utilisateur.id,
            nom_utilisateur: utilisateur.nom_utilisateur,
            accessToken: token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: error.message });
    }
};