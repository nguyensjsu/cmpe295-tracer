const payment = require('./payment');

module.exports = (app) => {
    app.post('/payment', payment);
};
