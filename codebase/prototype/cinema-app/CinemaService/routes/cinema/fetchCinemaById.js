const cinemaModel = require("../../Models")
const dotenv = require('dotenv').config();
const axios = require('axios');
const errResponse = {
    status:500,
    message: "No shows to premier"
};
module.exports = (req, res) => {
    cinemaModel.findOne({id: req.params.cinemaId}, (err, result) => {
        result.moviePremieres.map(async (movie) => {
            console.log(movie);
            const movieUrl = `${process.env.MOVIES_URL}/movies/${movie.movieId}`;
            const movieDetails = await axios.get(movieUrl);
            movie['details']= movieDetails.data;
        });
        res.send(result)
    })
};
