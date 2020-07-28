const db = require("../models");
const Swapi = db.swapi;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Star Wars object
  const swapi = new Swapi({
    title: req.body.title,
    episode_id: req.body.episode_id,
    opening_crawl: req.body.opening_crawl,
    director: req.body.director,
    producer: req.body.producer,
    release_date: req.body.release_date,
    image_url: req.body.image_url,
    published: req.body.published ? req.body.published : false
  });

  // Save Star Wars object in the database
  swapi
    .save(swapi)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Star Wars object."
      });
    });
};

// Retrieve all Star Wars objects from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Swapi.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Star Wars objects."
      });
    });
};

// Find a single Star Wars object with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Swapi.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Star Wars object with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Star Wars object with id=" + id });
    });
};

// Update a Star Wars object by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Swapi.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Star Wars object with id=${id}. Maybe object was not found!`
        });
      } else res.send({ message: "Star Wars object was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Star Wars object with id=" + id
      });
    });
};

// Delete a Star Wars object with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Swapi.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Star Wars object with id=${id}. Maybe object was not found!`
        });
      } else {
        res.send({
          message: "Star Wars Object was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Star Wars Object with id=" + id
      });
    });
};

// Delete all Star Wars objects from the database.
exports.deleteAll = (req, res) => {
  Swapi.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Star Wars objects were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Star Wars Objects."
      });
    });
};

// Find all published Star Wars objects
exports.findAllPublished = (req, res) => {
  Swapi.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Star Wars objects."
      });
    });
};