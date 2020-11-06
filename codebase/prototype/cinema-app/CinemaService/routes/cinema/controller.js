const fetchAllCinemas = require('./fetchAllCinemas');
const fetchCinemaById = require('./fetchCinemaById');
const fetchCinemaByCity = require('./fetchCinemaByCity');
const fetchMovieDetails = require('./fetchMovieDetails');

module.exports = (app) => {
    app.get('/cinemas', fetchAllCinemas);
    app.get('/cinema/:cinemaId', fetchCinemaById);
    app.get('/cinemas/city/:city', fetchCinemaByCity);
    app.get('/cinema/:cinemaId/:movieId', fetchMovieDetails);

};
