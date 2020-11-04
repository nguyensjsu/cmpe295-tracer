const moviesModel = require("../../Models")

module.exports = (req, res) => {
    //title = req.params.title.replace('%20',' ')
    moviesModel.find({title: req.params.title}, (err, result) => {
        res.send(result)
    })
};