const VisaService = (cardNumber, nameOnCard, expMonth, cvv, amount) => {
    return new Promise(resolve => setTimeout(_ => resolve(), 2000))
}
const MasterCardService = (cardNumber, nameOnCard, expMonth, cvv, amount) => {
    return new Promise(resolve => setTimeout(_ => resolve(), 2000))
}
module.exports = {
    VisaService,
    MasterCardService
};