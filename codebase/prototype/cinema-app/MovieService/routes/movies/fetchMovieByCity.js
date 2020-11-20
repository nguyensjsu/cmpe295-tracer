const moviesModel = require("../../Models")
const logger = require("../../logger")

module.exports = (req, res) => {
    moviesModel.find({city: req.params.city}, (err, result) => {
	logger.log('info', result)
        res.send(result)
    })
};
