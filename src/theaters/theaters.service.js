const knex = require("../db/connection");
const { addCriticCategory } = require("../movies/movies.service");

const tableName = "theaters";
const reduceProperties = require("../utils/reduce-properties");

const addCategory = reduceProperties("movie_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
});



function getMoviesAtTheaters() {
    return knex("movies_theaters").select("*").then(addCategory)
}

function getMovies() {
    return knex("movies").select("*")
}


function list() {
  return knex("theaters").select("*")

}

module.exports = {
  list,
  getMovies,
  getMoviesAtTheaters
};
