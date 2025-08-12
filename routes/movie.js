const express = require("express");
//create a express router
const router = express.Router();

// import the movie model
const Movie = require("../models/movie");

/* 
  Routes for movies
  GET /movies - list all the movies
  GET /movies/68943cf564aa9f8354cef260 - get a specific movie
  POST /movies - add new movie
  PUT /movies/68943cf564aa9f8354cef260 - update movie
  DELETE /movies/68943cf564aa9f8354cef260 - delete movie
*/
// GET /movies - list all the movies
/*
  query params is everything after the ? mark
*/
router.get("/", async (req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;

  // create a empty container for filter
  let filter = {};
  // if director exists, then only add it into the filter container
  if (director) {
    filter.director = director;
  }
  // if genre exists, then only add it into the filter container
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the movies data from Mongodb
  const movies = await Movie.find(filter);
  res.send(movies);
});

// GET /movies/:id - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

module.exports = router;
