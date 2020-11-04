const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const authMiddleware = require('./../middlewares/authentication');
const cookieParser = require('cookie-parser');
const path = require("path");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(authMiddleware);

require('../routes/payment/controller')(app);

module.exports = app;
