const bookCinemaShow = require('./bookCinemaShow');
module.exports = (app) => {
    app.post('/book', bookCinemaShow);
};
