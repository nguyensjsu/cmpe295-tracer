const VisaService = (cardNumber, nameOnCard, expMonth, cvv) => {
    return new Promise(resolve => setTimeout(_ => resolve(), 2000))
}
const MasterCardService = (cardNumber, nameOnCard, expMonth, cvv) => {
    return new Promise(resolve => setTimeout(_ => resolve(), 2000))
}

module.exports = {
    VisaService,
    MasterCardService
};