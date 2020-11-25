const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const authMiddleware = require('./../middlewares/authentication');
require('./../app/db');
const cookieParser = require('cookie-parser');
const path = require("path");
const {headerTransferMiddleware} = require("../middlewares/cmpe-295-tracer");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(authMiddleware);
app.use(headerTransferMiddleware);

require('../routes/cinema/controller')(app);

module.exports = app;
