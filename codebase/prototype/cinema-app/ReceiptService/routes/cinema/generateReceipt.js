const fs = require('fs');
const errResponse = {
    message: "Unable to generate receipt"
};

module.exports = (req, res) => {
    try {
        res.status(200).render("invoice");
    } catch (e) {
        res.status(500).send(e);
    }
};
