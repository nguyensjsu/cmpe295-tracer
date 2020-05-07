const express = require('express')
const app = express()
const axios = require('axios').default;
const port = process.env.PORT;
const headersToPropagate = ["x-request-id", "x-b3-traceid", "x-b3-spanid", "x-b3-sampled", "x-b3-flags",
    "x-ot-span-context", "end-user", "user-agent", "x-cmpe295-header"];

const getIstioHeaders = (req) => {
    let headers = {};
    headersToPropagate.map(header => {
	    if (req.headers[header]) headers[header] = req.headers[header]
    });
    return headers;
};

app.get('/', (req, res) => {
    console.log("-----------------------------");
    console.log(req.headers);
    console.log("-----------------------------");

    let incomingReqTS = new Date()
    let obj = {};
    let list = process.env.SERVICE_REQUEST_LIST !== undefined
        ? process.env.SERVICE_REQUEST_LIST.split(",").map(t => t.trim())
        : []

    res.set('Content-Type', 'application/json')
    if (list.length === 0 || list[0] === "") {
        setTimeout(_ => {
            res.json({
                SERVICE_NAME: process.env.SERVICE_NAME,
                requestReceivedAt: incomingReqTS,
                responseSentAt: new Date()
            })
        }, 1000)
    } else {
        Promise.all(list.map(url =>
            new Promise((resolve, reject) => axios.get(url, {headers: getIstioHeaders(req)})
                .then(function (response) {
                    if (obj.children === undefined) {
                        obj.children = [response.data]
                    } else {
                        obj.children.push(response.data)
                    }

                    resolve()
                }).catch(e => reject(e))
            )
        ))
            .then(_ => {
                setTimeout(_ => {
                    res.json({
                        SERVICE_NAME: process.env.SERVICE_NAME,
                        requestReceivedAt: incomingReqTS,
                        responseSentAt: new Date(),
                        children: obj.children
                    })
                }, 1000)
            })
            .catch(e => res.status(500).send(e))
    }

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
