const {receiptCall: receiptCall, sendEmailService} = require('../../Services');
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")

const errResponse = {
    message: "Unable to send notification. Please contact support"
};

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
            responseWrapper(res).status(200).json({message: "Successfully sent notification"})
        }).catch(err => {
            responseWrapper(res).status(500).send(errResponse);
        });
    } catch (e) {
        responseWrapper(res).status(500).send(e);
    }
};