import React, {useEffect, useRef} from 'react';
import * as d3 from "d3";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%"
    }
}));

function Graph({
                   nodes, links,
                   highlightedPath,
                   onSelect
               }) {
    let simulation;
    const ref = useRef();
    const classes = useStyles();
    const nodeRadius = 15;

    const dragstarted = (e, d) => {
        if (!e.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x;
        d.fy = d.y;
    };

    const dragged = (e, d) => {
        d.fx = e.x;
        d.fy = e.y;
    };

    const update = _ => {
        let link = d3.select(ref.current)
            .selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end', 'url(#arrowhead)')
            .attr("stroke", "#ccc")

        let node = d3.select(ref.current)
            .selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
            );

        node.append("circle")
            .attr("r", nodeRadius)
            .attr("fill", "cadetblue");

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        node.append("text")
            .attr("r", nodeRadius / 4)
            .attr("y", -22)
            .style("font-size", "14px")
            .text(function (d) {
                return d.label;
            });
        // node.append("text")
        //     .attr("r", nodeRadius / 4)
        //     .attr("y", -20)
        //     .style("font-size", "12px")
        //     .text(function (d) {
        //         return d.ip;
        //     });
        node.on("click", (e, d) => {
            onSelect(d);
        })
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
                .distance(300)
                .links(links))
            .on('tick', ticked);


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
    }, [nodes, links]);

    return (
        <div className={classes.root}>
            <svg ref={ref} height={"100%"} width={"100%"}/>
        </div>
    );
}

export default Graph;