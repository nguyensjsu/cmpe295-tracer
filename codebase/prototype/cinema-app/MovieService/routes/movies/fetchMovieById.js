const moviesModel = require("../../Models")
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")

module.exports = (req, res) => {
    moviesModel.find({id: req.params.movieId}, (err, result) => {
        responseWrapper(res).send(result)
    })
};
