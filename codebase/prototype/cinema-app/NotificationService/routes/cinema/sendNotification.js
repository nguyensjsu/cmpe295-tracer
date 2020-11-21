const {receiptCall: receiptCall, sendEmailService} = require('../../Services');

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
            res.status(200).json({message: "Successfully sent notification"})
        }).catch(err => {
            res.status(500).send(errResponse);
        });
    } catch (e) {
        res.status(500).send(e);
    }
};