import React, {useEffect, useRef, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import * as d3 from "d3";
import NavTabs from "../../NavTabs";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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
    root: {
        // width: "100vw",
        display: 'flex',
        justifyContent: 'space-between'
    },
    detailsPanel: {
        padding: '20px',
        width: 'calc(30% - 40px)',
        background: "#fff",
        height: "calc(100vh - 104px)"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        "& button": {
            width: 70
        }
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
    messageBody: {
        wordWrap: "break-word"
    },
    pathOptions: {
        padding: theme.spacing(1)
    },
    svgContainer: {
        width: "70%",
        height: "calc(100vh - 158px)",
        backgroundColor: '#f5f5f5'
    },
    svgPanel: {
        overflow: "auto",
        width: '100%',
    },
    svg: {
        padding: '10px',
        overflow: 'visible',
        width: 1620,
    }
}));

export default function ({labels, logs, uuid}) {
    const classes = useStyles();
    const ref = useRef();

    const [messages, setMessages] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [selection, setSelection] = useState(null)
    const [appLogs, setAppLogs] = useState({});
    const [messageBody, setMessageBody] = useState("")

    useEffect(() => {
        let logsForLabel = {}
        labels.forEach(label => {
            let tempLogs = logs.filter(l => l.appName === label.name)
            tempLogs.sort((a, b) => a.spanId.split("|")[2] - b.spanId.split("|")[2])
            logsForLabel[label.name] = tempLogs
        })
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
                body: logs[0].body,
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
                            body: currentAppLog.body,
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
                                body: currentAppLog.body,
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
        setOptionList([])
        setSelection(null)
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
                .on("click", _ => setMessageBody(m.body))
        });
    }

    return (
        <div className={classes.root}>
            <div className={classes.svgContainer}>
                <NavTabs requestId={uuid}/>
                <div className={classes.svgPanel}>
                    <svg preserveAspectRatio="xMinYMid meet" x="25" y="0" ref={ref} className={classes.svg}
                         viewBox="0 0 1700 800"/>
                </div>
            </div>
            <div className={classes.detailsPanel}>
                <ButtonGroup className={classes.buttonContainer} variant="outlined" color="primary"
                             aria-label="text primary button group">
                    <Button onClick={_ => {
                        prev();
                        setMessages([]);
                    }}>&lt;&lt;</Button>
                    <Button onClick={prev}>&lt;</Button>
                    <Button onClick={optionList.length === 0 ? next : selectOption}>&gt;</Button>
                    <Button onClick={_ => null}>&gt;&gt;</Button>
                </ButtonGroup>
                <div className={classes.messageBody}>{messageBody}</div>
                {optionList.length > 0 && (
                    <>
                        Select a path:
                        <hr style={{border: '1px solid #eee'}}/>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="path">
                                {optionList.map((msg, idx) =>
                                    <FormControlLabel
                                        value={msg.authority}
                                        control={<Radio onClick={e => setSelection(msg)}/>}
                                        label={msg.authority}/>
                                )}
                            </RadioGroup>
                        </FormControl>
                    </>
                )}
            </div>
        </div>
    );
}
