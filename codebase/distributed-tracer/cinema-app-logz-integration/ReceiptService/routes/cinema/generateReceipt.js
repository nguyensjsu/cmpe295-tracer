const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const errResponse = {
    message: "Unable to generate receipt"
};
const logger = require("../../logger")

module.exports = (req, res) => {
    try {
	logger.log("info", "invoice generated");
        responseWrapper(res).status(200).render("invoice");
    } catch (e) {
	logger.error(errResponse);
        responseWrapper(res).status(500).send(e);
    }
};
