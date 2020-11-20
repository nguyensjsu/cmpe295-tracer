const moviesModel = require("../../Models")
const logger = require("../../logger")

module.exports = (req, res) => {
    moviesModel.find({title: req.params.title}, (err, result) => {
	logger.log('info', result)
        res.send(result)
    })
};
