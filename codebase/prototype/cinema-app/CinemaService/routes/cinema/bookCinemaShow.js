const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")

module.exports = (req, res) => {
    responseWrapper(res).status(200).send("Successfully booked show");
};
