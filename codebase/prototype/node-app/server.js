const express = require('express')
const app = express()
const axios = require('axios').default;
const port = process.env.PORT

app.get('/', (req, res) => {
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
            new Promise((resolve, reject) => axios.get(url)
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