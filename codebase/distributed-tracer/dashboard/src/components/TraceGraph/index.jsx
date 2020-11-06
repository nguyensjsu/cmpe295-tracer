import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import Graph from "./Graph";
import DetailsPanel from "./DetailsPanel";
import {updateData} from '../Library'

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
        updateData().then(({nodes,links}) => {
            setNodes(nodes)
            setLinks(links)
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