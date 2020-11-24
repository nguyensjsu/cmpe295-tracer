const axios = require('axios');
const {sendEmailService} = require("./sendEmailToUser");
const {getHeadersToPropagate} = require('../middlewares/cmpe-295-tracer')
module.exports = {
    receiptCall: (req, body) => {
        let headers = {}
        if (req)
            headers = getHeadersToPropagate(req)
        return axios.post(`${process.env.RECEIPT_SERVICE_URL}/receipt/generate`, body, {headers})
    },
    sendEmailService: sendEmailService
}