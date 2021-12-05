const service = require("./reviews.service.js");

const VALID_PROPERTIES = ["score", "content"];

async function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter((field) => {
    return !VALID_PROPERTIES.includes(field);
  });
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid fields: ${[invalidFields.join(", ")]}`,
    });
  }
  next();
}

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "cannot be found" });
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  await service.update(updatedReview);
  const newReview = await service.read(updatedReview.review_id);

  const newReviewWithCritic = {
    ...newReview,
    critic: await service.getCritic(newReview.critic_id),
  };
  res.json({ data: newReviewWithCritic });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.destroy(review.review_id);
  res.sendStatus(204);
}

async function listReviews(req, res) {
  const movieReviews = await service.listReviews(res.locals.movie.movie_id);
  const updatedReviewStructure = [];
  movieReviews.map((rev) => {
    restructuredEntry = {
      movie_id: rev.movie_id,
      ...rev,
      critic: rev.critic[0],
    };
    updatedReviewStructure.push(restructuredEntry);
  });
  res.json({ data: updatedReviewStructure });
}

module.exports = {
  update: [reviewExists, hasOnlyValidProperties, update],
  delete: [reviewExists, destroy],

  listReviews,
};
