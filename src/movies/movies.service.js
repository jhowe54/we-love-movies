const knex = require("../db/connection");
const tableName = "movies";

function list(showing) {
  if (showing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("mt.movie_id")
      .select("m.*")
      .where({ is_showing: true });
  }
  return knex("movies").select("*");
}

function read(movieId) {
  return knex(tableName).select("*").where({ movie_id: movieId }).first();
}

module.exports = {
  list,
  read,
};
