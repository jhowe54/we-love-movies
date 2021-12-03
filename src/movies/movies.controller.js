const service = require("./movies.service");
const hasProperties = require("../errors/hasProperties");

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

async function listShowing(req, res, next) {
  if (req.query.is_showing) {
    const data = await service.listShowing();
    const moviesShowing = data.map((movie) => {
      return {
        id: movie.movie_id,
        title: movie.title,
        runtime_in_minutes: Number(movie.runtime_in_minutes),
        rating: movie.rating,
        description: movie.description,
        image_url: movie.image_url,
      };
    });

    return res.json({ data: moviesShowing });
  }

  next();
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function listTheatersForAMovie(req, res) {
  const { movie: data } = res.locals;

  res.json({ data: await service.listTheatersForAMovie(data.movie_id) });
}

async function listReviews(req, res) {
  const movieReviews = await service.listReviews(req.params.movieId);
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
  list: [listShowing, list],
  read: [movieExists, read],
  listTheatersForAMovie: [movieExists, listTheatersForAMovie],
  listReviews: [movieExists, listReviews],
};
