import axios from 'axios'

export const fetchTraceIDs = function () {
    return axios.get(`http://${process.env.REACT_APP_SERVER_IP}/traces`).then(res => res.data.map(id => ({
        url: "METHOD /path",
        id: id,
        timestamp: new Date()
    })))
}

export const fetchLogs = (uuid) => {
    return axios.get(`http://${process.env.REACT_APP_SERVER_IP}/traces/${uuid}`).then(res => res.data)
}
