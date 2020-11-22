const moviesModel = require("../../Models")

module.exports = (req, res) => {
    moviesModel.find({title: req.params.title}, (err, result) => {
        res.send(result)
    })
};
