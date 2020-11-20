const moviesModel = require("../../Models")
const logger = require("../../logger")

module.exports = (req, res) => {
    moviesModel.find({id: req.params.movieId}, (err, result) => {
	logger.log('info', result)
        res.send(result)
    })
};
