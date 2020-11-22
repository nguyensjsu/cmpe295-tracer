const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const errResponse = {
    message: "Unable to generate receipt"
};

module.exports = (req, res) => {
    try {
        responseWrapper(res).status(200).render("invoice");
    } catch (e) {
        responseWrapper(res).status(500).send(e);
    }
};
