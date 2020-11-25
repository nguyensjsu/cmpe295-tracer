const cinemaModel = require("../../Models")
const dotenv = require('dotenv').config();
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const {movieDetails: movieDetailsCall} = require('../../Services');
const errResponse = {
    status: 500,
    message: "No Cinema Found"
};
const logger = require("../../logger")

module.exports = (req, res) => {
    cinemaModel.findOne({id: req.params.cinemaId}, async (err, result) => {
        if (result) {
            result = result.toJSON();
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