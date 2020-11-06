const express = require('express');
// const axios = require('axios');
// const data = require('./data');
const app = express();
const api = require('./data/services');
const logs = require('./data/logs')

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*"); 
    next();
});

app.get("/services", (req, res, next) => {
    res.json(api.services());
});

app.get("/links", (req, res, next) => {
    res.json(api.links());
});

app.get("/logs", (req, res, next) => {
    res.json(logs);
});

app.listen(8081, () => {
    console.log("Server running on port 8081");
});
