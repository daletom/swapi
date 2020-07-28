module.exports = app => {
  const swapis = require("../controllers/swapi.controller.js");

  var router = require("express").Router();

  // Create a new Star Wars object
  router.post("/", swapis.create);

  // Retrieve all Star Wars objects
  router.get("/", swapis.findAll);

  // Retrieve all published Star Wars objects
  router.get("/published", swapis.findAllPublished);

  // Retrieve a single Star Wars object with id
  router.get("/:id", swapis.findOne);

  // Update a Star Wars object with id
  router.put("/:id", swapis.update);

  // Delete a Star Wars object with id
  router.delete("/:id", swapis.delete);

  // Create a new Star Wars object
  router.delete("/", swapis.deleteAll);

  app.use('/api/swapis', router);
};