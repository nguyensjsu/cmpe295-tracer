const {VisaService, MasterCardService} = require("../../Services");
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")
const logger = require("../../logger")

module.exports = (req, res) => {
    const cardNumber = req.body.cardNumber
    const nameOnCard = req.body.nameOnCard
    const expMonth = req.body.expMonth
    const cvv = req.body.cvv
    const cardType = req.body.cardType
    const amount = req.body.amount
    if (cardType === "visa") {
        VisaService(cardNumber, nameOnCard, expMonth, cvv, amount).then(message => {
	    logger.log("info", "payment successful");
            responseWrapper(res).status(200).json({message: "payment successful"})
        }).catch(err => {
	    logger.error("Payent failed");
            responseWrapper(res).status(500).json({message: "payment failed - " + err.toString()})
        })
    } else if (cardType === "mastercard") {
        MasterCardService(cardNumber, nameOnCard, expMonth, cvv, amount).then(message => {
	    logger.log("info", "payment successful");
            responseWrapper(res).status(200).json({message: "payment successful"})
        }).catch(err => {
	    logger.error("Payment failed");
            responseWrapper(res).status(500).json({message: "payment failed - " + err.toString()})
        })
    } else {
	logger.error("Invalid Card");
        responseWrapper(res).status(500).json({message: "Invalid card!"})
    }
};
