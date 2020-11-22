//uuid : b635b59c-fc66-4fc6-b5c0-2f1caa771b9a
import React, {useEffect, useRef, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import * as d3 from "d3";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {IconButton} from "@material-ui/core";
import {updateData} from "./Library";
import {useParams} from 'react-router-dom'

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
        width: 'inherit'
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
        width: '30px',
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


/*
* drawlabels();
* drawlines(start, end);
* update([messages] -> [{start,end,body}]); will use drawlabels and drawitems (clear and draw from scratch)
* parser([currMessages])              logic for getting next messages
* */

export default function (props) {
    const classes = useStyles();
    const ref = useRef();
    const {uuid} = useParams();
    const [labels, setLabels] = useState([]);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        updateData(uuid).then(({nodes, _messages}) => {
            setLabels(nodes);
            // setMessages([{start:"User",end:"cmpe295-movies-service",message:"hey"}])
        })
    }, [uuid]);

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
        }

    }, [labels]);

    const drawLabels = () => {
        console.log(JSON.stringify(labels))
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
    };

    function drawMessages() {

        console.log(JSON.stringify(labels))

        let svg = d3.select(ref.current)
        svg.selectAll('.message').remove()
        svg.selectAll('.label').remove()

        messages.forEach(function (m, i) {
            let y = YPAD + MESSAGE_ARROW_Y_OFFSET + i * MESSAGE_SPACE;
            svg.append("line")
                .style("stroke", "black")
                .attr("class", "message")
                .attr("x1", XPAD + labels.findIndex(label => label.name === m.start) * VERT_SPACE)
                .attr("y1", y)
                .attr("x2", XPAD + labels.findIndex(label => label.name === m.end) * VERT_SPACE)
                .attr("y2", y)
                .attr("marker-end", "url(#end)")
                .append("text")
                .text(function (d) {
                    return m.message;
                })

        });

        messages.forEach(function (m, i) {
            let start = labels.findIndex(label => label.name === m.start);
            let end = labels.findIndex(label => label.name === m.end)
            let xPos = XPAD + MESSAGE_LABEL_X_OFFSET + (((end - start) * VERT_SPACE) / 2) + (start * VERT_SPACE) + 40;
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

    return (
        <div className={classes.root}>
            <div className={classes.backPanel}>
                <IconButton onClick={() => {
                    window.location = '/tracegraph'
                }}><ArrowBackIosIcon/></IconButton>
            </div>
            <div className={classes.svgPanel}>
                <svg preserveAspectRatio="xMinYMid meet" x="25" y="0" ref={ref} className={classes.svg}
                     viewBox="0 0 1600 1000"/>
            </div>
            <div className={classes.detailsPanel}>
                <div className={classes.buttonContainer}>
                    <button className={classes.button}>&lt;&lt;</button>
                    <button className={classes.button}> &lt; </button>

                    <button className={classes.button}>&gt;</button>
                    <button className={classes.button}>&gt;&gt;</button>
                </div>
                <br/>
                <div className={classes.jsonBody}>
                    {/*API: {selectedMessage}*/}
                    {/*<ReactJson enableClipboard={false} src={selectedBody}/>*/}
                </div>
            </div>
        </div>
    );
}