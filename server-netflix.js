const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// declare schema for movies
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

//create a modal from the schema
const Movie = mongoose.model("Movie", movieSchema);

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

/* 
  route for movies
  Get /mpvies - list all the movies
  Get /movies/68941da68222a4dc9eefb3d0 - get a specific movie
  POST /movies - add new movie
  PUT /movies/68941da68222a4dc9eefb3d0 - update movie
  DELETE /movies/68941da68222a4dc9eefb3d0 - delete movie
*/
// routes for movies
// Get /movies - list all the movies
/*
    query params is everything after the 7 mark
*/
app.get("/movies", async (req, res) => {
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

  // load the movies data from mongoDB
  const movies = await Movie.find(filter);
  res.send(movies);
});

// GET /movies/:id - get a specific movie
app.get("/movies/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

// start the express server
app.listen(5919, () => {
  console.log("server is running at http://localhost:5919");
});
