const cinemaModel = require("../../Models")
const dotenv = require('dotenv').config();
const {movieDetails: movieDetailsCall} = require('../../Services');
const errResponse = {
    status: 500,
    message: "No Cinema Found"
};
module.exports = (req, res) => {
    cinemaModel.findOne({id: req.params.cinemaId}, async (err, result) => {
        if (result) {
            result = result.toJSON();
            for (let i = 0; i < result.moviePremieres.length; i++) {
                const movieDetails = await movieDetailsCall(result.moviePremieres[i].movieId, req);
                result.moviePremieres[i].details = movieDetails.data;
            }
            res.send(result);
        } else {
            res.status(500).send(errResponse);
        }
    })
};
