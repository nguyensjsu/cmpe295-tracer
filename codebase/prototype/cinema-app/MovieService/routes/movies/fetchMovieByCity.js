const moviesModel = require("../../Models")
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")

module.exports = (req, res) => {
    moviesModel.find({city: req.params.city}, (err, result) => {
        responseWrapper(res).send(result)
    })
};
