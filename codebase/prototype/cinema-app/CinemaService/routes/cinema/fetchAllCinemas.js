const cinemaModel = require("../../Models")

module.exports = (req, res) => {
    cinemaModel.find({}, (err, result) => {
        res.send(result)
    })
};
