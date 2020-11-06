import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Graph from "./Graph";
import DetailsPanel from "./DetailsPanel";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        height: "100vh",
    },
}));

export default function (props) {
    const classes = useStyles();
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        // Get data and update here
        // this is called once when the page loads
        console.log("use effect is called");

        axios.get(`http://localhost:8081/services`)
            .then(res => {
                const serviceNodes = res.data;
                setNodes(serviceNodes);
            })

        axios.get(`http://localhost:8081/links`)
            .then(res => {
                const serviceLinks = res.data;
                setLinks(serviceLinks);
            })

    }, []);

    const [startNode, setStartNode] = useState("n0")
    const [endNode, setEndNode] = useState("n2")
    const [paths, setPaths] = useState([])
    const [highlightedPath, setHighlightedPath] = useState("")
    const [selectedNode, setSelectedNode] = useState({})
    return (
        <div className={classes.root}>
            <Graph
                onSelect={setSelectedNode}
                nodes={nodes} links={links}
                startNode={startNode} setStartNode={setStartNode}
                endNode={endNode} setEndNode={setEndNode}
                paths={paths} setPaths={setPaths}
                highlightedPath={highlightedPath}
            />
            <DetailsPanel
                selectedNode={selectedNode}
                nodes={nodes} links={links}
                startNode={startNode} setStartNode={setStartNode}
                endNode={endNode} setEndNode={setEndNode}
                paths={paths} setPaths={setPaths}
                highlightedPath={highlightedPath}
                setHighlightedPath={setHighlightedPath}
            />
        </div>
    );
}