const sendEmailService = (user, receipt) => {
    return new Promise(resolve => setTimeout(_ => resolve(), 2000))
};
module.exports = {
    sendEmailService
};