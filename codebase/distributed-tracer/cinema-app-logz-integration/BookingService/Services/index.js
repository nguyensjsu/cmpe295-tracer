const axios = require('axios');
const dotenv = require('dotenv').config();
const {getHeadersToPropagate} = require('../middlewares/cmpe-295-tracer')
module.exports = {
    cinemaDetailsCall: (req,cinemaId,movieId) => {
        let headers = {}
        if (req)
            headers = getHeadersToPropagate(req)
        return axios.get(`${process.env.CINEMA_SERVICE_URL}/cinema/${cinemaId}/${movieId}`, {headers})
    },
    paymentCall: (req,body) => {
        let headers = {}
        if (req)
            headers = getHeadersToPropagate(req)
        return axios.post(`${process.env.PAYMENT_SERVICE_URL}/payment`, body,{headers})
    },
    bookCinemaCall: (req,body) => {
        let headers = {}
        if (req)
            headers = getHeadersToPropagate(req)
        return axios.post(`${process.env.CINEMA_SERVICE_URL}/cinema/book`, body,{headers})
    },
    notificationCall: (req,body) => {
        let headers = {}
        if (req)
            headers = getHeadersToPropagate(req)
        return axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/notification/send`, body,{headers})
    }
}