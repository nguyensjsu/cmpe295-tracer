const {VisaService, MasterCardService} = require("../../Services");
const {responseWrapper} = require("../../middlewares/cmpe-295-tracer")

module.exports = (req, res) => {
    const cardNumber = req.body.cardNumber
    const nameOnCard = req.body.nameOnCard
    const expMonth = req.body.expMonth
    const cvv = req.body.cvv
    const cardType = req.body.cardType
    const amount = req.body.amount
    if (cardType === "visa") {
        VisaService(cardNumber, nameOnCard, expMonth, cvv, amount).then(message => {
            responseWrapper(res).status(200).json({message: "payment successful"})
        }).catch(err => {
            responseWrapper(res).status(500).json({message: "payment failed - " + err.toString()})
        })
    } else if (cardType === "mastercard") {
        MasterCardService(cardNumber, nameOnCard, expMonth, cvv, amount).then(message => {
            responseWrapper(res).status(200).json({message: "payment successful"})
        }).catch(err => {
            responseWrapper(res).status(500).json({message: "payment failed - " + err.toString()})
        })
    } else {
        responseWrapper(res).status(500).json({message: "Invalid card!"})
    }
};
