const {VisaService, MasterCardService} = require("../../Services");

module.exports = (req, res) => {
    const cardNumber = req.body.cardNumber
    const nameOnCard = req.body.nameOnCard
    const expMonth = req.body.expMonth
    const cvv = req.body.cvv
    const cardType = req.body.cardType

    if (cardType === "visa") {
        VisaService(cardNumber, nameOnCard, expMonth, cvv).then(message => {
            res.status(200).json({message: "payment successful"})
        }).catch(err => {
            res.status(500).json({message: "payment failed - " + err.toString()})
        })
    } else if (cardType === "mastercard") {
        MasterCardService(cardNumber, nameOnCard, expMonth, cvv).then(message => {
            res.status(200).json({message: "payment successful"})
        }).catch(err => {
            res.status(500).json({message: "payment failed - " + err.toString()})
        })
    } else {
        res.status(500).json({message: "Invalid card!"})
    }
};
