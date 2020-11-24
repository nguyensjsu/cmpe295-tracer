const cinemaModel = require("../../Models")
const dotenv = require('dotenv').config();
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const {movieDetails: movieDetailsCall} = require('../../Services');
const errResponse = {
    status: 500,
    message: "No shows to premier"
};
const logger = require("../../logger")

module.exports = (req, res) => {
    cinemaModel.find({city: req.params.city}, async (err, result) => {
        if (result.length > 0) {
            result = result[0].toJSON();
            for (let i = 0; i < result.moviePremieres.length; i++) {
                const movieDetails = await movieDetailsCall(result.moviePremieres[i].movieId, req);
                result.moviePremieres[i].details = movieDetails.data;
            }
	    logger.log("info", result);
            responseWrapper(res).send(result);
        } else {
	    logger.error(errResponse);
            responseWrapper(res).status(500).send(errResponse);
        }
    })
};
