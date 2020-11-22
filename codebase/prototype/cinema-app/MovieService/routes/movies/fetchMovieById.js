const moviesModel = require("../../Models")

module.exports = (req, res) => {
    moviesModel.find({id: req.params.movieId}, (err, result) => {
        res.send(result)
    })
};
