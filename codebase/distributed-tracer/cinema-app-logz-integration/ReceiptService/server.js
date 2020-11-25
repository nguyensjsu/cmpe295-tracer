const dotenv = require('dotenv').config();
const path = require('path');
const app = require('./app/index');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
const port = process.env.PORT || 5002;

app.listen(port);
console.log('application running at http://localhost:' + port);
