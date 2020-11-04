const moviesModel = require("../../Models")

module.exports = (req, res) => {
    moviesModel.find({city: req.params.city}, (err, result) => {
        res.send(result)
    })
};