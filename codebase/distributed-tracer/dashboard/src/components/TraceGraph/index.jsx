import React, {useState, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Graph from "./Graph";
import DetailsPanel from "./DetailsPanel";
import {updateData} from '../Library'
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        height: "100vh",
    },
}));

export default function (props) {
    const classes = useStyles();
    const [logs, setLogs] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const {uuid} = useParams()

    useEffect(() => {
        updateData(uuid).then(({nodes, links, logs}) => {
            setNodes(nodes)
            setLinks(links)
            setLogs(logs)
        })

    }, [uuid]);

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
                logs={logs}
                selectedNode={selectedNode}
            />
        </div>
    );
}