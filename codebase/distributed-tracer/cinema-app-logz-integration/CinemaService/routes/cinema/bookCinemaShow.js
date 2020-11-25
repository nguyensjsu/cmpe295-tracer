const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const logger = require("../../logger")

module.exports = (req, res) => {
    looger.log("info", "Successfully booked show");
    responseWrapper(res).status(200).send("Successfully booked show");
};
