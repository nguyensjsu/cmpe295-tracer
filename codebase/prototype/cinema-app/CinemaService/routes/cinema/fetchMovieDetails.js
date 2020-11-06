const cinemaModel = require("../../Models");
const dotenv = require('dotenv').config();
const axios = require('axios');
const errResponse = {
    status:500,
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
        const filteredMovies = cinemaDetails.moviePremieres.filter(movie => movie.movieId == req.params.movieId)
        cinemaDetails.moviePremieres = filteredMovies;
        const movieUrl = `${process.env.MOVIES_URL}/movies/${req.params.movieId}`;
        movieDetails = await axios.get(movieUrl);
        const data = {cinemaDetails, movie: movieDetails.data[0]};
        res.send(data);
    }catch(e){
        res.send(errResponse)};
};