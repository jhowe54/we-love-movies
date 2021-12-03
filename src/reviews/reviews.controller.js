
const service = require("./reviews.service.js");

const VALID_PROPERTIES = ["score", "content"];

async function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  console.log("BODY", data);
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

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
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

module.exports = {
  update: [reviewExists, hasOnlyValidProperties, update],
  delete: [reviewExists, destroy],
  list,
};
