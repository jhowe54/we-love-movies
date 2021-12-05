const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theaterRouter = require("../theaters/theaters.router")
const reviewRouter = require("../reviews/reviews.router")

router.use("/:movieId/theaters", controller.movieExists, theaterRouter);
router.use("/:movieId/reviews", controller.movieExists, reviewRouter);


router.route("/").get(controller.list).all(methodNotAllowed)
router.route("/:movieId").get(controller.read).all(methodNotAllowed)


module.exports = router;