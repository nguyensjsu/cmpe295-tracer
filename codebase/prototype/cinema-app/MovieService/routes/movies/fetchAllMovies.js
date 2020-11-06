const moviesModel = require("../../Models")

module.exports = (req, res) => {
    moviesModel.find({}, (err, result) => {
        console.log(result);
        res.send(result)
    })
};
