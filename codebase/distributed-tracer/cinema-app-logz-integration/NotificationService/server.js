const dotenv = require('dotenv').config();
const app = require('./app/index');

const port = process.env.PORT || 5005;

app.listen(port);
console.log('application running at http://localhost:' + port);
