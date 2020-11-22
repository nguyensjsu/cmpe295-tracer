//uuid : b635b59c-fc66-4fc6-b5c0-2f1caa771b9a
import React, {useEffect, useRef, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import * as d3 from "d3";
import ReactJson from 'react-json-view'
import mockData from "../API/data";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {IconButton} from "@material-ui/core";
import {getSeqDetails} from "./Library";

const XPAD = 120;
const YPAD = 20;
const VERT_SPACE = 230;
const VERT_PAD = 60;
const CLASS_WIDTH = 215;
const CLASS_HEIGHT = 40;
const CLASS_LABEL_X_OFFSET = -25;
const CLASS_LABEL_Y_OFFSET = 25;
const MESSAGE_SPACE = 40;
const MESSAGE_LABEL_X_OFFSET = -40;
const MESSAGE_LABEL_Y_OFFSET = 70;
const MESSAGE_ARROW_Y_OFFSET = 80;

// const labels = ["Frontend", "Browse", "Inventory", "Rec", "Discounts", "Region", "Holiday"];
const discountData = mockData.map(m => ({_id: m._id, discount: Math.floor(Math.random() * 10)}));
const messages=[];
// const messages = [
//     {body: {page: 1}, start: 0, end: 1, spanid: "0", type: "request", message: "GET:/browse", parentSpanId: null}, //u\
//     {
//         body: {start: 0, offset: 30},
//         start: 1,
//         end: 2,
//         spanid: "1",
//         type: "request",
//         message: "GET:/inventory",
//         ts: 2,
//         parentSpanId: "0"
//     }, //u
//     {body: mockData, start: 2, end: 1, spanid: "1", type: "response", message: "GET:/inventory", ts: 3,}, //d
//     {body: {}, start: 1, end: 3, spanid: "2", type: "request", message: "GET:/rec", ts: 4, parentSpanId: "0"}, //u
//     {
//         body: mockData.map(m => m._id),
//         start: 1,
//         end: 4,
//         spanid: "3",
//         type: "request",
//         message: "GET:/dis",
//         ts: 4,
//         parentSpanId: "0"
//     }, //u
//     {
//         body: mockData.map(m => m._id),
//         start: 4,
//         end: 5,
//         spanid: "4",
//         type: "request",
//         message: "GET:/reg",
//         ts: 6,
//         parentSpanId: "3"
//     }, //u
//     {body: mockData.slice(2, 5), start: 3, end: 1, spanid: "2", type: "response", message: "GET:/rec", ts: 7,}, //d
//     {
//         body: mockData.map(m => m._id),
//         start: 5,
//         end: 6,
//         spanid: "5",
//         type: "request",
//         message: "GET:/holi",
//         ts: 7,
//         parentSpanId: "4"
//     }, //u
//     {body: [], start: 6, end: 5, spanid: "5", type: "response", message: "GET:/holi", ts: 8,}, //d
//     {body: discountData, start: 5, end: 4, spanid: "4", type: "response", message: "GET:/reg", ts: 9,},  //d
//     {body: discountData, start: 4, end: 1, spanid: "3", type: "response", message: "GET:/dis", ts: 10,}, //d
//     {
//         body: {data: mockData, discounts: discountData},
//         start: 1,
//         end: 0,
//         spanid: "0",
//         type: "response",
//         message: "GET:/browse",
//         ts: 10,
//     }, //d
// ];

// const logParser = (messages) => {
//     let logs = [...messages]
//     if (logs[0].type !== "request") throw Error("Unable to parse logs")
//     return getNodes(logs[0], logs)
// }
//
// const getNodes = (requestLog, logs) => {
//     let node = {}
//     node.request = requestLog
//     const responseIndex = logs.findIndex(l => l.type === "response" && l.spanid === requestLog.spanid)
//     node.response = {...logs[responseIndex]}
//
//     if (!node.response) throw Error("Unable to parse")
//     let childrenRequests = []
//     let i = -1;
//     do {
//         i = logs.findIndex(log => requestLog.spanid === log.parentSpanId)
//         if (i === -1) break;
//         childrenRequests.push(logs[i])
//         logs.splice(i, 1)
//     } while (i !== -1)
//     if (childrenRequests.length !== 0) {
//         childrenRequests.sort((c1, c2) => c1.ts - c2.ts)
//         node.children = childrenRequests.map(l => getNodes(l, [...logs]))
//     }
//     return node
// }

const useStyles = makeStyles((theme) => ({

    svg: {
        padding: '10px',
        paddingLeft: '20px',
        overflow: 'visible',
        width:'inherit'
    },
    root: {
        width: "100vw",
        height: "calc(100vh - 40px)",
        display: 'flex',
        justifyContent: 'space-between'

    },
    backPanel: {
        background: "white",
        width: 20,
        display: "flex",
        alignItems: "center",
        padding: 20,
        justifyContent: "center",
        height: '100vh'
    },
    detailsPanel: {
        padding: '20px',
        width: '30%',
        height: "100%",
        background: "#fff"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        margin: '10px',
        padding: '10px',
        width: '100px',
        backgroundColor: '#392396',
        color: '#fff',
        border: 'none',
        outline: "none"
    },
    jsonBody: {
        height: "80%",
        overflowY: "scroll",
        lineHeight: '2'
    },
    svgPanel: {
        overflow: 'scroll',
        width: 'inherit'
    }
}));

export default function (props) {
    const classes = useStyles();
    const ref = useRef();
    const uuid = '4d3c94a4-94ec-4daf-9382-fe5d090c0025';//useParams()

    const [curr, setCurr] = useState(0)

    // const [xOffset, setXOffset] = useState(50)
    // const [yOffset, setYOffset] = useState(20)
    const [path, setPath] = useState([])
    const [traceTree, setTraceTree] = useState({})
    // const [pathSelectionOptions, setPathSelectionOptions] = useState([])
    const [selectedBody, setSelectedBody] = useState({})
    const [selectedMessage, setSelectedMessage] = useState('Select an API to view the request body')
    const [labels, setLabels] = useState([]);

    const [messages1, setMessages1] = useState();

    useEffect(() => {
        getSeqDetails(uuid).then(({nodes, _messages}) => {
            setLabels(nodes);
            setMessages1(_messages);
            console.log("messages1",_messages)
            messages.push(_messages[0]);
            console.log('messages',messages)
            drawMessages(messages);
        })
    }, [uuid]);


    useEffect( _ => {
        // console.log("labels: ",labels)
        if(labels.length!==0) {
            // const root = logParser(messages)
            // setTraceTree(root)
            // setPath([root])
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

            update(messages)
        };
    }, [labels])


    const drawLabels = () => {
        console.log("drawlabel");
        console.log(labels)
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
                    return c.name;
                })
                .attr("dx", CLASS_LABEL_X_OFFSET)
                .attr("dy", CLASS_LABEL_Y_OFFSET);
        });
    }

    const update = ( messages) => {
        console.log("update");
        drawLabels();
        drawMessages(messages)

    }

    function traverseTree() {
            // console.log(path)
        // if (path.length === 0) return
        // let curr = path[path.length - 1]
        // let localPath = [...path]
        // while (true) {
        //     console.log(curr)
        //     if (!curr.children) {
        //         //pop everything
        //         console.log("pop", localPath)
        //         break
        //     }
        //     if (curr.children.length === 1) {
        //         //draw message
        //         console.log("draw", curr.children[0])
        //         curr = curr.children[0]
        //         localPath.push(curr.children[0])
        //         // continue
        //     }
        // for (let i = 0; i < curr.children.length; i++) {
        //     let local_i = i
        //     if (local_i < curr.children.length - 1
        //         && curr.children[local_i].request.ts !== curr.children[local_i + 1].request.ts) {
        //         //draw message
        //         console.log("draw", curr.children[i])
        //         localPath.push(curr.children[i])
        //     }
        // let breakFlag = false
        // while (local_i < curr.children.length
        // && curr.children[local_i].request.ts === curr.children[local_i + 1].request.ts) {
        //     breakFlag = true
        //     setPathSelectionOptions([...pathSelectionOptions, curr.children[local_i]])
        // }
        // if (breakFlag) break;
        // }
        // }
        // console.log(localPath)
    }

    function drawMessages(messages) {
        console.log("draw messages")

        let svg = d3.select(ref.current)
        svg.selectAll('.message').remove()
        svg.selectAll('.label').remove()

        messages.forEach(function (m, i) {
            console.log("----------m",m)
            console.log("----------labels",labels)
            console.log(labels.find( label => label===m.start))
            let y = YPAD + MESSAGE_ARROW_Y_OFFSET + i * MESSAGE_SPACE;
            svg.append("line")
                .style("stroke", "black")
                .attr("class", "message")
                // .attr("x1", XPAD + 0 * VERT_SPACE)
                .attr("x1", XPAD + labels.find( label => label===m.start) * VERT_SPACE)
                .attr("y1", y)
                // .attr("x2", XPAD + 1* VERT_SPACE)
                .attr("x2", XPAD + labels.find( label => label===m.end)* VERT_SPACE)
                .attr("y2", y)
                .attr("marker-end", "url(#end)")
                .attr("marker-start", function (...atr) {
                    //	console.log(i%2==0);
                    // return i % 2 === 0 ? "url(#start)" : ""
                })
                .append("text")
                .text(function (d) {
                    return m.message;
                })

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
                }).on("click", (...d) => {setSelectedBody(m.body); setSelectedMessage(m.message)});
        });
    }

    useEffect(_ => traverseTree(), [traceTree])
    useEffect(_ => console.log(curr), [curr])
    useEffect(_ => drawMessages(messages.slice(0, curr)), [curr])
    return (
        <div className={classes.root}>
            <div className={classes.backPanel}>
                <IconButton onClick={() => {
                    window.location = '/tracegraph'
                }}><ArrowBackIosIcon/></IconButton>
            </div>
            <div className={classes.svgPanel}>
                <svg preserveAspectRatio="xMinYMid meet" x="25"  y="0" ref={ref} className={classes.svg}  viewBox="0 0 1600 1000"/>
            </div>
            <div className={classes.detailsPanel}>
                <div className={classes.buttonContainer}>
                    <button onClick={_ => setCurr(curr - 1)} className={classes.button}>Prev</button>
                    <button onClick={_ => setCurr(curr + 1)} className={classes.button}>Next</button>
                </div>
                <br/>
                <div className={classes.jsonBody}>
                    API: {selectedMessage}
                    <ReactJson enableClipboard={false} src={selectedBody}/>
                </div>
            </div>
        </div>
    );
}