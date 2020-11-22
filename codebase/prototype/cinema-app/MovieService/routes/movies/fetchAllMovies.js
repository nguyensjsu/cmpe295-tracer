const moviesModel = require("../../Models")

module.exports = (req, res) => {
    moviesModel.find({}, (err, result) => {
        res.send(result)
    })
};
