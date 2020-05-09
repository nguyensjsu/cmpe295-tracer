import React, {Component} from "react";
import ReactDOM from "react-dom";
import {mxClient, mxConstants, mxEvent, mxGraph, mxHierarchicalLayout, mxRubberband, mxUtils} from "mxgraph-js";
import '../componentStyles/styles.css'
import Typography from '@material-ui/core/Typography';

const data = [
    {
        name: 'v3',
        parentObjs: [],
    },
    {
        name: 'v1',
        parentObjs: [{name: 'v3'}]
    },
    {
        name: 'v2',
        parentObjs: [{name: 'v1'}]
    },
    {
        name: 'v4',
        parentObjs: [{name: 'v3'}]
    },
    {
        name: 'v5',
        parentObjs: [{name: 'v4'}]
    }
]


export default class TraceContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            traceId: props.match.params.id,
            data: []
        };
        this.LoadGraph = this.LoadGraph.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //make api call
        this.fetchData(nextProps.match.params.id)
    }

    componentDidMount() {
        this.fetchData(this.state.traceId);
    }

    fetchData(displayTraceId) {
        let promise = new Promise((resolve, reject) => {
            const traceData = data
            resolve(traceData)
        });
        promise.then((traceData) => {
            this.setState({
                traceId: displayTraceId,
                data: traceData
            })
            this.LoadGraph();
        }).catch(() => {
            console.log('Some error has occurred');
        });
    }

    LoadGraph() {
        console.log("Loadgraph called");
        console.log(this.state.data)
        var container = ReactDOM.findDOMNode(this.refs.divGraph);
        container.innerHTML = '';

        // Checks if the browser is supported
        if (!mxClient.isBrowserSupported()) {
            // Displays an error message if the browser is not supported.
            mxUtils.error("Browser is not supported!", 200, false);
        } else {
            // Disables the built-in context menu
            mxEvent.disableContextMenu(container);

            // Creates the graph inside the given container
            var graph = new mxGraph(container);

            // Enables rubberband selection
            new mxRubberband(graph);

            // Gets the default parent for inserting new cells. This is normally the first
            // child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();
            var root = undefined;

            graph.getModel().beginUpdate();
            try {
                var dict = {};
                this.state.data.forEach(function (element) {
                    var name = element.name;
                    // create graph element
                    var graphElement = graph.insertVertex(parent, null,
                        name, 0, 150, 80, 30);
                    // check if any parent element
                    if (element.parentObjs.length > 0) {
                        // run through each parent element
                        element.parentObjs.forEach(function (parentObject) {
                            var parentGraphElement = dict[parentObject.name];
                            // add edge between current element and parent
                            graph.insertEdge(parent, null, '', parentGraphElement, graphElement, "strokeWidth=2;endArrow=block;endSize=2;endFill=1;strokeColor=blue;rounded=1;");
                        })
                    } else {
                        root = graphElement;
                    }
                    dict[name] = graphElement;
                })

                //data
            } finally {
                // Updates the display
                graph.getModel().endUpdate();
                // Creates a layout algorithm to be used
                // with the graph
                var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_WEST);
                // Moves stuff wider apart than usual
                layout.forceConstant = 140;
                if (root) {
                    layout.execute(parent, root);
                }
            }

        }
    }

    render() {
        return (
            <main>
                <div className="trace-content">
                    <Typography variant="h4">
                        TraceID : {this.state.traceId}
                    </Typography>
                    <div className="graph-container trace-margin" ref="divGraph" id="divGraph"/>
                </div>
            </main>
        );
    }
}


// function TraceContainer(props) {
//     const traceId = props.match.params.id;
//     const classes = mainStyles();
//     // LoadGraph(document.getElementById('divGraph'))
//     return (
//         <main>
//             <div className={classes.drawerHeader}/>
//             {/*<Typography variant="h3">*/}
//             {/*    Trace Container {traceId}*/}
//             {/*</Typography>*/}
//         </main>
//     )
// }
//
// export default TraceContainer;
