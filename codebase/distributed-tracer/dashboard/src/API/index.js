import axios from 'axios'

export const fetchTraceIDs = function () {
    return axios.get(`http://${process.env.REACT_APP_SERVER_IP}/traces/info`).then(res => res.data.map(log => ({
        url: `${log.method} ${log.path}`,
        id: log.request_id,
        timestamp: log.start_time
    })))
};

export const fetchLogs = (uuid) => {
    return axios.get(`http://${process.env.REACT_APP_SERVER_IP}/traces/${uuid}`).then(res => res.data)
};
