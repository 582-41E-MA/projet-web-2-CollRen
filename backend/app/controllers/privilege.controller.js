const db = require("../models");
const Privilege = db.privileges;
const Op = db.Sequelize.Op;

// Create and Save a new Privilege
exports.create = (req, res) => {

    // Save Privilege in the database
    Privilege.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Privilege."
            });
        });
};

// Retrieve all Privileges from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Privilege.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving privileges."
            });
        });
};

// Find a single Privilege with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Privilege.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Privilege with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Privilege with id=" + id
            });
        });
};

// Update a Privilege by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Privilege.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Privilege was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Privilege with id=${id}. Maybe Privilege was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Privilege with id=" + id
            });
        });
};

// Delete a Privilege with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Privilege.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Privilege was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Privilege with id=${id}. Maybe Privilege was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Privilege with id=" + id
            });
        });
};

// Delete all Privileges from the database.
exports.deleteAll = (req, res) => {
    Privilege.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Privileges were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all privileges."
            });
        });
};