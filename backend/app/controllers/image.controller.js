const db = require("../models");
const Image = db.images;
const Op = db.Sequelize.Op;

// Create and Save a new Image
exports.create = (req, res) => {

    // Save Image in the database
    Image.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Image."
            });
        });
};

// Retrieve all Images from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Image.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving images."
            });
        });
};

// Find a single Image with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Image.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Image with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Image with id=" + id
            });
        });
};

// Update a Image by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Image.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Image was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Image with id=" + id
            });
        });
};

// Delete a Image with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Image.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Image was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Image with id=" + id
            });
        });
};

// Delete all Images from the database.
exports.deleteAll = (req, res) => {
    Image.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Images were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all images."
            });
        });
};