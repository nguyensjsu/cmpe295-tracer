const moviesModel = require("../../Models")
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const logger = require("../../logger")

module.exports = (req, res) => {
    moviesModel.find({city: req.params.city}, (err, result) => {
	logger.log("info", result);
        responseWrapper(res).send(result)
    })
};
