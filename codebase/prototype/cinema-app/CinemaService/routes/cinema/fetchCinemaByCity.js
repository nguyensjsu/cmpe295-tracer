const cinemaModel = require("../../Models")

module.exports = (req, res) => {
    cinemaModel.find({city: req.params.city}, (err, result) => {
        res.send(result)
    })
};