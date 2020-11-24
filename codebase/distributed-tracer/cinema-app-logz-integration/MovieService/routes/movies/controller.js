const fetchAllMovies = require('./fetchAllMovies');
const fetchMovieById = require('./fetchMovieById');
const fetchMovieByTitle = require('./fetchMovieByTitle');
const fetchMoviesByCity = require('./fetchMovieByCity');
module.exports = (app) => {
    app.get('/movies', fetchAllMovies);
    app.get('/movies/:movieId', fetchMovieById);
    app.get('/movie/title/:title', fetchMovieByTitle);
    app.get('/movies/city/:city', fetchMoviesByCity);
};

