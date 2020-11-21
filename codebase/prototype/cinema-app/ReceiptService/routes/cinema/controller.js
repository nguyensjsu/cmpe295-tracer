const generateReceipt = require('./generateReceipt');

module.exports = (app) => {
    app.post('/receipt/generate', generateReceipt);

};
