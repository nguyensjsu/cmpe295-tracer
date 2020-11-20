const axios = require('axios');
const dotenv = require('dotenv').config();
const {getHeadersToPropagate} = require('../middlewares/cmpe-295-tracer')
module.exports = {
    movieDetails: async (movieId, req) => {
        let headers = {}
        if (req)
            headers = getHeadersToPropagate(req)
        return await axios.get(`${process.env.MOVIES_SERVICE_URL}/movies/${movieId}`, {headers})
    }
}