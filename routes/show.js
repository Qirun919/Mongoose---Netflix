const express = require("express");
//create a express router
const router = express.Router();

// import the movie model
const Show = require("../models/show");

router.get("/", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  // create a empty container for filter
  let filter = {};
  // if genre exists, then only add it into the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }
  // if premiere_year exists, then only add it into the filter container
  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }
  // load the movies data from mongoDB
  const shows = await Show.find(filter);
  res.send(shows);
});

// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the TVShow data based on id
  const show = await Show.findById(id);
  res.send(show);
});

module.exports = router;
