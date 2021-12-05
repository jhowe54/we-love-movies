const knex = require("../db/connection");
const { addCriticCategory } = require("../movies/movies.service");

const tableName = "theaters";
const reduceProperties = require("../utils/reduce-properties");

const addCategory = reduceProperties("theater_id", {
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

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .then(addCategory);
}

module.exports = {
  list,
};
