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
const showSchema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

//create a modal from the schema
const show = mongoose.model("show", showSchema);

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

app.get("/shows", async (req, res) => {
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
  const shows = await show.find(filter);
  res.send(shows);
});

// GET /movies/:id - get a specific movie
app.get("/shows/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the TVShow data based on id
  const show = await show.findById(id);
  res.send(show);
});

// start the express server
app.listen(5919, () => {
  console.log("server is running at http://localhost:5919");
});
