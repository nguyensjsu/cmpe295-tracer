import React, {useEffect, useRef, useState} from 'react';
import * as d3 from "d3";
import findPath from "../../utils/findPath";

function Graph() {
    const [nodes, setNodes] = useState([
        {name: "n0", "label": "Node0"},
        {name: "n1", "label": "Node1"},
        {name: "n2", "label": "Node2"},
        {name: "n3", "label": "Node3"},
        {name: "n4", "label": "Node4"}
    ])
    const [links, _] = useState([
        {source: 0, target: 1},
        {source: 1, target: 2},
        {source: 0, target: 3},
        {source: 3, target: 2},
        {source: 3, target: 4},
    ])

    let simulation;

    const [startNode, setStartNode] = useState("n0")
    const [endNode, setEndNode] = useState("n2")
    const [paths, setPaths] = useState([])
    const ref = useRef();


    const dragstarted = (e, d) => {
        if (!e.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x;
        d.fy = d.y;
    }

    const dragged = (e, d) => {
        d.fx = e.x;
        d.fy = e.y;
    }

    const update = _ => {
        let link = d3.select(ref.current)
            .selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end', 'url(#arrowhead)')
            .attr("stroke", "#ccc")

        // link.append("title")
        //     .text(function (d) {
        //         return d.type;
        //     });
        let node = d3.select(ref.current)
            .selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                //.on("end", dragended)
            )
        // .on('click', (_, d) => setSelection(d.name))

        node.append("circle")
            .attr("r", 15)
            .attr("fill", "cadetblue")

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        node.append("text")
            .attr("dy", -3)
            .attr("dx", "50")
            .text(function (d) {
                return d.name + ":" + d.label;
            });
    }

    const ticked = () => {
        d3.select(ref.current)
            .selectAll(".link")
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        d3.select(ref.current)
            .selectAll(".node")
            .attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")";
            });
    }


    useEffect(_ => {
        simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(ref.current.clientWidth / 2, ref.current.clientHeight / 2))
            .force('link', d3.forceLink()
                .distance(200)
                .links(links))
            .on('tick', ticked)


        d3.select(ref.current)
            .append('defs')
            .append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 20)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 13)
            .attr('markerHeight', 13)
            .attr('xoverflow', 'visible')
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#999')
            .style('stroke', 'none');

        update()
    }, [])

    const highlighPath = path => {

        let edges = []
        for (let i = 0; i < path.length - 1; i++) {
            edges.push({source: path[i], target: path[i + 1]})
        }

        d3.select(ref.current)
            .selectAll(".link")
            .attr("stroke", function (d) {
                return edges.find(e => d.source.name === e.source && d.target.name === e.target) ? "#000" : "#ddd";
            });

        d3.select(ref.current)
            .selectAll(".node")
            .selectAll("circle")
            .attr("fill", function (d) {
                return path.find(n => n === d.name) ? "cadetblue" : "#aaa";
            });
    }

    const findAllPaths = _ => {
        if (startNode !== "none" && endNode !== "none")
            setPaths(findPath(nodes, links, startNode, endNode))
        else
            setPaths([])
    }

    return (
        <div className="App">
            Start:
            <select value={startNode} onChange={e => setStartNode(e.target.value)}>
                <option value={"none"}>{"none"}</option>
                {nodes.map(n => <option key={n.name} value={n.name}>{n.name}</option>)}
            </select>
            End:
            <select value={endNode} onChange={e => setEndNode(e.target.value)}>
                <option value={"none"}>{"none"}</option>
                {nodes.map(n => <option key={n.name} value={n.name}>{n.name}</option>)}
            </select>
            <button onClick={findAllPaths}>List all paths</button>
            <ul>
                {paths.map(path => <li>{path.join(" -> ")}
                    <button onClick={highlighPath.bind(this, path)}>Highlight</button>
                </li>)}
            </ul>
            <svg ref={ref} height={500} width={"calc(100vw - 2px)"}/>
        </div>
    );
}

export default Graph;