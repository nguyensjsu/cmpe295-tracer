const generateReceipt = require('./generateReceipt');

module.exports = (app) => {
    app.get('/receipt/generate', generateReceipt);

};
