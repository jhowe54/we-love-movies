const knex = require("../db/connection");
const tableName = "reviews";
const reduceProperties = require("../utils/reduce-properties");

const addCriticCategory = reduceProperties("critic_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
  created_at: ["critic", null, "created_at"],
  updated_at: ["critic", null, "updated_at"],
});

function read(review_id) {
  return knex(tableName).select("*").where({ review_id }).first();
}

function destroy(review_id) {
  return knex(tableName).where({ review_id }).del();
}

function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

async function update(updatedReview) {
  return await knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function listReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ movie_id: movieId })
    .then(addCriticCategory);
}

module.exports = {
  read,
  update,
  destroy,
  listReviews,
  getCritic,
};
