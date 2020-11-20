
const fs = require('fs');
const errResponse = {
        message: "Unable to generate receipt"
};
module.exports = (req, res) => {
        try {
                console.log(req.body);
                const html = fs.readFileSync(__dirname + '/invoice.html');
                console.log(html.toString());
                res.status(200).json({body: html.toString()});
        }catch (e) {
                console.log(e);
                res.status(500).send(errResponse);
        }
};
