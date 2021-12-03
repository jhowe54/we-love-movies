const knex = require("../db/connection");
const tableName = "reviews";

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

function list() {
  return knex(tableName).select("*");
}

module.exports = {
  read,
  update,
  destroy,
  list,
  getCritic,
};
