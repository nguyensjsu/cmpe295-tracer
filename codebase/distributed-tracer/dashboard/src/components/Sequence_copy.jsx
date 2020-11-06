import React, {useEffect, useRef, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import * as d3 from "d3";

const XPAD = 50;
const YPAD = 20;
const VERT_SPACE = 100;
const VERT_PAD = 60;
const CLASS_WIDTH = 80;
const CLASS_HEIGHT = 40;
const CLASS_LABEL_X_OFFSET = -25;
const CLASS_LABEL_Y_OFFSET = 25;
const MESSAGE_SPACE = 50;
const MESSAGE_LABEL_X_OFFSET = -40;
const MESSAGE_LABEL_Y_OFFSET = 70;
const MESSAGE_ARROW_Y_OFFSET = 80;

const labels = ["Browser", "Browse", "Inventory", "Rec", "Discounts", "Region", "Holiday"];
const messages = [
    {start: 0, end: 1, spanid: "0", type: "request", message: "GET:/browse", parentSpanId: null}, //u\
    {start: 1, end: 2, spanid: "1", type: "request",  message: "GET:/inventory", ts: 2, parentSpanId: "0"}, //u
    {start: 2, end: 1, spanid: "1", type: "response", message: "GET:/inventory", ts: 3,}, //d
    {start: 1, end: 3, spanid: "2", type: "request", message: "GET:/rec", ts: 4, parentSpanId: "0"}, //u
    {start: 1, end: 4, spanid: "3", type: "request", message: "GET:/dis", ts: 4, parentSpanId: "0"}, //u
    {start: 4, end: 5, spanid: "4", type: "request", message: "GET:/reg", ts: 6, parentSpanId: "3"}, //u
    {start: 3, end: 1, spanid: "2", type: "response", message: "GET:/rec", ts: 7,}, //d
    {start: 5, end: 6, spanid: "5", type: "request", message: "GET:/holi", ts: 7, parentSpanId: "4"}, //u
    {start: 6, end: 5, spanid: "5", type: "response", message: "GET:/holi", ts: 8,}, //d
    {start: 5, end: 4, spanid: "4", type: "response", message: "GET:/reg", ts: 9,},  //d
    {start: 4, end: 1, spanid: "3", type: "response", message: "GET:/dis", ts: 10,}, //d
    {start: 1, end: 0, spanid: "0", type: "response", message: "GET:/browse", ts: 10,}, //d
];

const logParser = (messages) => {
    let logs = [...messages]
    if (logs[0].type !== "request") throw Error("Unable to parse logs")
    console.log(getNodes(logs[0], logs))
}

const getNodes = (requestLog, logs) => {
    let node = {}
    const requestIndex = logs.findIndex(l => l.type === "request" && l.spanid === requestLog.spanid)
    node.request = requestLog
    logs.splice(requestIndex, 1)
    const responseIndex = logs.findIndex(l => l.type === "response" && l.spanid === requestLog.spanid)
    node.response = {...logs[responseIndex]}
    logs.splice(responseIndex, 1)

    if (!node.response) node.logs = logs
    let childrenRequests = []
    let i = -1;
    do {
        i = logs.findIndex(log => requestLog.spanid === log.parentSpanId)
        if (i === -1) break;
        childrenRequests.push(logs[i])
        logs.splice(i, 1)
    } while (i !== -1)
    if (childrenRequests.length !== 0)
        node.children = childrenRequests.map(l => getNodes(l, [...logs]))
    return node
}

logParser(messages)
const useStyles = makeStyles((theme) => ({

    svg: {
        paddingLeft: '100px'
    },
    root: {
        width: "100%",
        height: "100vh",
        display: 'flex',
        padding: '20px',

    },
    buttonContainer: {
        width: '40%',
        marginTop: '20px'
    },
    button: {
        margin: '10px',
        padding: '10px',
        width: '100px',
        backgroundColor: '#392396',
        color: '#fff',
        border: 'none'

    }
}));

export default function (props) {
    const classes = useStyles();
    const ref = useRef();

    const [curr, setCurr] = useState(0)

    const update = (labels, messages) => {

        labels.forEach(function (c, i) {
            d3.select(ref.current)
                .append("line")
                .style("stroke", "#888")
                .attr("class", "vertical-line")
                .attr("x1", XPAD + i * VERT_SPACE)
                .attr("y1", YPAD)
                .attr("x2", XPAD + i * VERT_SPACE)
                .attr("y2", YPAD + VERT_PAD + messages.length * MESSAGE_SPACE);
        });

        labels.forEach(function (c, i) {
            let x = XPAD + i * VERT_SPACE;
            d3.select(ref.current)
                .append("g")
                .attr("transform", "translate(" + x + "," + YPAD + ")")
                .attr("class", "first")
                .append("rect")
                .attr("x", -CLASS_WIDTH / 2)
                .attr("y", 0)
                .attr("width", CLASS_WIDTH)
                .attr("height", CLASS_HEIGHT)
                .style("fill", "#E4F4F5")
                .style("stroke", "#888");
        });


        labels.forEach(function (c, i) {
            var x = XPAD + i * VERT_SPACE + 25;
            d3.select(ref.current).append("g")
                .attr("transform", "translate(" + x + "," + YPAD + ")")
                .attr("class", "first")
                .append("text")
                .text(function (d) {
                    return c;
                })
                .attr("dx", CLASS_LABEL_X_OFFSET)
                .attr("dy", CLASS_LABEL_Y_OFFSET);
        });

        drawMessages(messages)

    }

    function drawMessages(messages) {
        let svg = d3.select(ref.current)
        svg.selectAll('.message').remove()
        svg.selectAll('.label').remove()

        messages.forEach(function (m, i) {
            let y = YPAD + MESSAGE_ARROW_Y_OFFSET + i * MESSAGE_SPACE;
            svg.append("line")
                .style("stroke", "black")
                .attr("class", "message")
                .attr("x1", XPAD + m.start * VERT_SPACE)
                .attr("y1", y)
                .attr("x2", XPAD + m.end * VERT_SPACE)
                .attr("y2", y)
                .attr("marker-end", "url(#end)")
                .attr("marker-start", function (...atr) {
                    //	console.log(i%2==0);
                    return i % 2 === 0 ? "url(#start)" : ""
                })
                .append("text")
                .text(function (d) {
                    return m.message;
                });
        });

        messages.forEach(function (m, i) {
            let xPos = XPAD + MESSAGE_LABEL_X_OFFSET + (((m.end - m.start) * VERT_SPACE) / 2) + (m.start * VERT_SPACE) + 40;
            let yPos = YPAD + MESSAGE_LABEL_Y_OFFSET + i * MESSAGE_SPACE;

            svg.append("g")
                .attr("transform", "translate(" + xPos + "," + yPos + ")")
                .attr("class", "first label")
                .append("text")
                .text(function (d) {
                    return m.message;
                });
        });


    }


    useEffect(_ => {
        let svg = d3.select(ref.current)
        svg.append("svg:defs").selectAll("marker")
            .data(["end"])
            .enter().append("svg:marker")
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")

        svg.append("svg:defs").selectAll("marker")
            .data(["start"])
            .enter().append("svg:marker")
            .attr("id", String)
            .attr("viewBox", "0 0 40 40")
            .attr("refX", 0)
            .attr("refY", 20)
            .attr("markerWidth", 20)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("svg:circle")
            .attr('cy', "20")
            .attr("r", "20")

        update(labels, messages)
    }, [])

    useEffect(_ => drawMessages(messages.slice(0, curr)), [curr])
    return (
        <div className={classes.root}>
            <svg ref={ref} height={"100%"} width={"100%"} className={classes.svg}/>
            <div className={classes.buttonContainer}>
                <button onClick={_ => setCurr(curr - 1)} className={classes.button}>Prev</button>
                <button onClick={_ => setCurr(curr + 1)} className={classes.button}>Next</button>
            </div>
        </div>
    );
}