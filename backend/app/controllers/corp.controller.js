const db = require("../models");
const Corp = db.corps;
const Op = db.Sequelize.Op;

// Create and Save a new Corp
exports.create = (req, res) => {

    // Save Corp in the database
    Corp.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Corp."
            });
        });
};

// Retrieve all Corps from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Corp.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving corps."
            });
        });
};

// Find a single Corp with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Corp.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Corp with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Corp with id=" + id
            });
        });
};

// Update a Corp by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Corp.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Corp was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Corp with id=${id}. Maybe Corp was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Corp with id=" + id
            });
        });
};

// Delete a Corp with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Corp.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Corp was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Corp with id=${id}. Maybe Corp was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Corp with id=" + id
            });
        });
};

// Delete all Corps from the database.
exports.deleteAll = (req, res) => {
    Corp.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Corps were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all corps."
            });
        });
};