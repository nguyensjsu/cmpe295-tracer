const moviesModel = require("../../Models")
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")

module.exports = (req, res) => {
    moviesModel.find({title: req.params.title}, (err, result) => {
        responseWrapper(res).send(result)
    })
};
