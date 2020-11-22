const cinemaModel = require("../../Models");
const dotenv = require('dotenv').config();
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const {movieDetails: movieDetailsCall} = require('../../Services');
const errResponse = {
    message: "No shows to premier"
};
module.exports = async (req, res) => {
    try {
        let cinemaDetails = await cinemaModel
            .findOne({id: req.params.cinemaId}, {id: 1, name: 1})
            .populate({
                path: 'moviePremieres',
                match: {'moviePremieres.movieId': {$eq: req.params.movieId}}
            });
        cinemaDetails = cinemaDetails.toJSON();
        const filteredMovies = cinemaDetails.moviePremieres.find(movie => movie.movieId == req.params.movieId);
        const movieDetails = await movieDetailsCall(req.params.movieId, req);
        if (filteredMovies && movieDetails.data.length > 0) {
            filteredMovies.details = movieDetails.data[0];
            cinemaDetails.moviePremieres = filteredMovies;
            responseWrapper(res).send(cinemaDetails);
        } else {
            responseWrapper(res).status(500).send(errResponse);
        }
    } catch (e) {
        responseWrapper(res).status(500).send(errResponse);
    }
};
