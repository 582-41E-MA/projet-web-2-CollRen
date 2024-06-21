const db = require("../models");
const Province = db.provinces;
const Op = db.Sequelize.Op;

// Create and Save a new Province
exports.create = (req, res) => {

    // Save Province in the database
    Province.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Province."
            });
        });
};

// Retrieve all Provinces from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Province.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving provinces."
            });
        });
};

// Find a single Province with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Province.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Province with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Province with id=" + id
            });
        });
};

// Update a Province by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Province.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Province was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Province with id=${id}. Maybe Province was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Province with id=" + id
            });
        });
};

// Delete a Province with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Province.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Province was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Province with id=${id}. Maybe Province was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Province with id=" + id
            });
        });
};

// Delete all Provinces from the database.
exports.deleteAll = (req, res) => {
    Province.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Provinces were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all provinces."
            });
        });
};