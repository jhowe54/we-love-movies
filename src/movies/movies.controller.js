const service = require("./movies.service");

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie not found" });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function list(req, res) {
  const { is_showing = false } = req.query;
  res.json({ data: await service.list(Boolean(is_showing)) });
}

module.exports = {
  list,
  read: [movieExists, read],
  movieExists,
};
