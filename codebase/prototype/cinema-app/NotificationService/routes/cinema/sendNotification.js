const {receiptCall: receiptCall} = require('../../Services');
const {sendEmailService} = require("../../Services/sendEmailToUser");
const errResponse = {
        message: "Unable to send notification. Please contact support"
};
module.exports = async (req, res) => {
        try {
                console.log(req.body);
                const receiptData = {
                        "nameOnCard" : req.body.nameOnCard,
                        "cardType": req.body.cardType,
                        "amount": req.body.amount,
                        "bookingId": req.body.bookingId
                };
                const receipt = await receiptCall(req,receiptData);
                console.log(receipt.body);
                sendEmailService(req.body.email,receipt).then(message => {
                        res.status(200).json({message: "Successfully sent notification"})
                }).catch(err => {
                        res.status(500).send(errResponse);
                });
        } catch (e) {
                console.log(e);
                res.status(500).send(errResponse);
        }
};