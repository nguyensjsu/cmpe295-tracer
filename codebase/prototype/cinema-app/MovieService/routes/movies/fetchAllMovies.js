const moviesModel = require("../../Models")
const logger = require("../../logger")

module.exports = (req, res) => {
    moviesModel.find({}, (err, result) => {
        console.log(result);
	logger.log("info", result);
        res.send(result)
    })
};
