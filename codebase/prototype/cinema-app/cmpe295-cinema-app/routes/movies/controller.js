const fetchAllMovies = require('./fetchAllMovies');
const fetchMovieById = require('./fetchMovieById');

module.exports = (app) => {
    app.get('/movies', fetchAllMovies);
    app.get('/movies/:movieId', fetchMovieById);
};
