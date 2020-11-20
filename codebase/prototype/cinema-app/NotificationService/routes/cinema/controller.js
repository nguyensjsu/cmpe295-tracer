const sendNotification = require('./sendNotification');
module.exports = (app) => {
    app.post('/notification/send', sendNotification);

};
