const {receiptCall: receiptCall, sendEmailService} = require('../../Services');
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")

const errResponse = {
    message: "Unable to send notification. Please contact support"
};
const logger = require("../../logger")

module.exports = async (req, res) => {
    try {
        const receiptData = {
            "nameOnCard": req.body.nameOnCard,
            "cardType": req.body.cardType,
            "amount": req.body.amount,
            "bookingId": req.body.bookingId
        };
        const receipt = await receiptCall(req, receiptData);
        sendEmailService(req.body.email, receipt).then(message => {
	    logger.log("info", "Successfully sent notification");
            responseWrapper(res).status(200).json({message: "Successfully sent notification"})
        }).catch(err => {
	    logger.error(errResponse);
            responseWrapper(res).status(500).send(errResponse);
        });
    } catch (e) {
	logger.error(e);
        responseWrapper(res).status(500).send(e);
    }
};
