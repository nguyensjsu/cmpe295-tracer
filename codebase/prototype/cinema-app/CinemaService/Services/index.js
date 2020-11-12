const axios = require('axios');
const {getHeadersToPropagate} = require('../middlewares/cmpe-295-tracer')
module.exports = {
    movieDetails: (movieId, req) => {
        let headers = {}
        if (req)
            headers = getHeadersToPropagate(req)
        return axios.get(`${process.env.MOVIES_SERVICE_URL}/movies/${movieId}`, {headers})
    }
}