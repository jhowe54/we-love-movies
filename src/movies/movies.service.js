
const knex = require("../db/connection");
const tableName = "movies";
const reduceProperties = require("../utils/reduce-properties")

//uses reduceProperties methods to create a 'critic' property for each review. 

const addCriticCategory = reduceProperties("critic_id", {
    critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
    created_at: ["critic", null, "created_at"],
    updated_at: ["critic", null, "updated_at"],
  });

function list() {
    return knex(tableName).select("*")
}


 function listShowing() {
    return knex("movies as m").distinct()
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id" )
    .select("mt.is_showing", "m.*")
    .where({"mt.is_showing": true})
    .orderBy("m.movie_id")
    //.distinctOn("mt.movie_id")
    
} 

function read(movieId) {
    return knex(tableName).select("*").where({"movie_id": movieId}).first()
}


function listTheatersForAMovie(movieId) {
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("mt.*", "t.*")
    .where({"mt.movie_id" : movieId})
}



function listReviews(movieId) {
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({"movie_id" : movieId})
    .then(addCriticCategory)
}

module.exports = {
    list,
    listShowing,
    read,
    listTheatersForAMovie,
    listReviews,
    addCriticCategory
}