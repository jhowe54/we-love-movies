const service = require("./theaters.service.js")


async function getMoviesAtTheaters() {
    const data = await service.getMoviesAtTheaters()
}


async function getMovies() {
    const data = await service.getMovies()
}

async function list(req, res) {
    const theaters = await service.list()
    const movies = await service.getMovies()
    const moviesTheaters = await service.getMoviesAtTheaters()

    console.log(theaters[0])
    console.log(movies[0])
    console.log(...moviesTheaters)
    res.json({ data: theaters })
}




module.exports = {
    list,
    getMovies,
}




/* const movieInfo = data.map((theater) => {
    return theaterObject = {
        ...theater,
        movies:  [service.getMoviesFromTheaters(theater.theater_id)]
    }
    
}) */