const logger = require("../../logger")

module.exports = (req, res) => {
	logger.log('info', 'Successfully booked show');
        res.status(200).send("Successfully booked show");
};
