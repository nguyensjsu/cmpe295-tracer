const moviesModel = require("../../Models")
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")

module.exports = (req, res) => {
    moviesModel.find({}, (err, result) => {
        responseWrapper(res).send(result)
    })
};
