import React, {useEffect, useRef, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import * as d3 from "d3";

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

const useStyles = makeStyles((theme) => ({

    svg: {
        padding: '10px',
        paddingLeft: '20px',
        overflow: 'visible',
        width: 'inherit',
    },
    root: {
        width: "100vw",
        // height: "calc(100vh-200px)",
        // height: "calc(100vh - 40px)",
        display: 'flex',
        justifyContent: 'space-between'

    },
    detailsPanel: {
        padding: '20px',
        width: '30%',
        background: "#fff",
        height: "calc(100vh - 104px)"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        margin: '10px',
        padding: '10px',
        width: '35px',
        backgroundColor: '#4050B5',
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
        width: 'inherit',
        backgroundColor: '#f5f5f5'
        // height: '100%'
    },
    pathOptions: {
        padding: theme.spacing(1)
    }
}));

export default function ({labels, logs}) {
    const classes = useStyles();
    const ref = useRef();

    const [messages, setMessages] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [selection, setSelection] = useState(null)
    const [appLogs, setAppLogs] = useState({});

    useEffect(() => {
        let logsForLabel = {}
        labels.forEach(label => {
            let tempLogs = logs.filter(l => l.appName === label.name)
            tempLogs.sort((a, b) => a.spanId.split("|")[2] - b.spanId.split("|")[2])
            logsForLabel[label.name] = tempLogs
        })
        console.log(logsForLabel)
        setAppLogs(logsForLabel)
    }, [logs]);

    useEffect(() => {
        drawLabels();
        drawMessages(messages);
    }, [messages]);

    useEffect(_ => {
        if (labels.length !== 0) {
            let svg = d3.select(ref.current);
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
                .attr("d", "M0,-5L10,0L0,5");

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
                .attr("r", "20");
            drawLabels();

        }
    }, [labels]);

    const next = () => {
        if (messages.length === 0) {
            setMessages([{
                start: "User",
                end: logs[0].appName,
                message: logs[0].method + ' ' + logs[0].path,
                time: 0,
                uniqueId: logs[0].spanId.split("|")[1],
                type: "REQUEST"
            }])
        } else {
            let currentApp = messages[messages.length - 1]
            let currentAppLogs = appLogs[currentApp.end]
            for (let i = 0; i < currentAppLogs.length; i++) {
                if (currentAppLogs[i].spanId.split("|")[2] > currentApp.time) {
                    let currentAppLog = currentAppLogs[i]
                    if (currentAppLog.log_type === "RESPONSE") {
                        let requestInMessages = messages.find(m => m.uniqueId === currentAppLog.spanId.split("|")[1] && m.type === "REQUEST")
                        if (!requestInMessages) continue;

                        let destination = logs.find(l => l.appName !== currentApp.end && l.log_type === "RESPONSE" && currentAppLog.spanId.split("|")[1] === l.spanId.split("|")[1])

                        setMessages([...messages, {
                            start: currentApp.end,
                            end: !!destination ? destination.appName : "User",
                            message: requestInMessages.message,
                            time: !!destination ? Math.max(Number(destination.spanId.split("|")[2]), Number(currentAppLog.spanId.split("|")[2])) : Number(currentAppLog.spanId.split("|")[2]),
                            uniqueId: currentAppLog.spanId.split("|")[1],
                            type: "RESPONSE"
                        }])
                    } else {
                        if (currentAppLog.upstream_cluster.split("|")[0] === "outbound") {
                            let requests = [currentAppLog]

                            for (let j = i + 1; j < currentAppLogs.length; j++) {
                                if (currentAppLogs[j].log_type === "REQUEST" && currentAppLogs[j].upstream_cluster.split("|")[0] === "outbound")
                                    requests.push(currentAppLogs[j])
                                else if (currentAppLogs[j].log_type === "RESPONSE") {
                                    break;
                                }
                            }
                            if (requests.length > 1) {
                                setOptionList(requests)
                                return
                            }

                            setMessages([...messages, {
                                start: currentApp.end,
                                end: currentAppLog.authority.split(":")[0],
                                message: currentAppLog.method + ' ' + currentAppLog.path,
                                time: currentAppLog.spanId.split("|")[2],
                                uniqueId: currentAppLog.spanId.split("|")[1],
                                type: "REQUEST"
                            }])
                        }
                    }
                    break;
                }
            }
        }
    }

    const prev = _ => {
        setMessages(messages.slice(0, messages.length - 1))
    }

    const selectOption = _ => {
        let currentApp = messages[messages.length - 1]
        if (selection) {
            setMessages([...messages, {
                start: currentApp.end,
                end: selection.authority.split(":")[0],
                message: selection.method + ' ' + selection.path,
                time: selection.spanId.split("|")[2],
                uniqueId: selection.spanId.split("|")[1],
                type: "REQUEST"
            }])
            setOptionList([])
            setSelection(null)
        }
    }

    const drawLabels = () => {
        let svg = d3.select(ref.current);
        svg.selectAll('.vertical-line').remove();
        svg.selectAll('.vertical-line-rect').remove();
        svg.selectAll('.vertical-line-msg').remove();

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
                .attr("class", "first vertical-line-rect")
                .append("rect")
                .attr("x", -CLASS_WIDTH / 2)
                .attr("y", 0)
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("width", CLASS_WIDTH)
                .attr("height", CLASS_HEIGHT)
                .style("fill", "#609DA0");
        });
        labels.forEach(function (c, i) {
            var x = XPAD + i * VERT_SPACE + 25;
            d3.select(ref.current).append("g")
                .attr("transform", "translate(" + x + "," + YPAD + ")")
                .attr("class", "first vertical-line-msg")
                .append("text")
                .text(function (d) {
                    return c.name;
                })
                .style("fill", "#fff")
                .style("font-size", 15)
                .attr("dx", CLASS_LABEL_X_OFFSET)
                .attr("dy", CLASS_LABEL_Y_OFFSET);
        });
    };

    function drawMessages(messages) {

        let svg = d3.select(ref.current)
        svg.selectAll('.message').remove()
        svg.selectAll('.label').remove()

        messages.forEach(function (m, i) {
            let start = labels.findIndex(label => label.name === m.start)
            let end = labels.findIndex(label => label.name === m.end)
            let y = YPAD + MESSAGE_ARROW_Y_OFFSET + i * MESSAGE_SPACE;
            svg.append("line")
                .style("stroke", "black")
                .attr("class", "message")
                .attr("x1", XPAD + start * VERT_SPACE)
                .attr("y1", y)
                .attr("x2", XPAD + end * VERT_SPACE)
                .attr("y2", y)
                .attr("marker-end", "url(#end)")
                .attr("marker-start", function (...atr) {
                })
                .append("text")
                .text(function (d) {
                    return m.message;
                })
        });

        messages.forEach(function (m, i) {
            let start = labels.findIndex(label => label.name === m.start)
            let end = labels.findIndex(label => label.name === m.end)
            let xPos = XPAD + MESSAGE_LABEL_X_OFFSET + (((end - start) * VERT_SPACE) / 2) + (start * VERT_SPACE) + 40;
            let yPos = YPAD + MESSAGE_LABEL_Y_OFFSET + i * MESSAGE_SPACE;

            svg.append("g")
                .attr("transform", "translate(" + xPos + "," + yPos + ")")
                .attr("class", "first label")
                .append("text")
                .text(function (d) {
                    return m.message;
                })
        });
    }

    return (
        <div className={classes.root}>
            <div className={classes.svgPanel}>
                <svg preserveAspectRatio="xMinYMid meet" x="25" y="0" ref={ref} className={classes.svg}
                     viewBox="0 0 1600 500"/>
            </div>
            <div className={classes.detailsPanel}>
                <div className={classes.buttonContainer}>
                    <button className={classes.button}>&lt;&lt;</button>
                    <button onClick={prev} className={classes.button}> &lt; </button>

                    <button onClick={optionList.length === 0 ? next : selectOption}
                            className={classes.button}>&gt;</button>
                    <button className={classes.button}>&gt;&gt;</button>
                </div>
                <br/>
                {optionList.length > 0 && (
                    <>
                        Select a path:<hr style={{border:'1px solid #eee'}}/>
                        {optionList.map((msg, idx) => (
                            <div className={classes.pathOptions}>
                                <label >
                                    <input type="radio" name={"name"} onClick={e => setSelection(msg)}
                                           value={msg.authority}/>
                                    {msg.authority}
                                </label>
                                <br/>
                            </div>
                        ))}
                    </>
                )}

                <br/>
                <div className={classes.jsonBody}>
                    {/*API: {selectedMessage}*/}
                    {/*<ReactJson enableClipboard={false} src={selectedBody}/>*/}
                </div>
            </div>
        </div>
    );
}
