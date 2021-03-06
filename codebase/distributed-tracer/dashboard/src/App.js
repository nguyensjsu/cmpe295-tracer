import React from 'react';
import './App.css';
import TraceGraph from "./components/TraceDiagrams/Graph";
import Home from "./components/Home/index";
import TraceList from "./components/TraceList/index";
import SequenceDiagram from "./components/TraceDiagrams/Sequence/index";

import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Logs from "./components/TraceDiagrams/Logs";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/trace-list' component={TraceList}/>
                <Route path='/trace-graph/:uuid' component={TraceGraph}/>
                <Route path='/sequence-diagram/:uuid' component={SequenceDiagram}/>
                <Route path='/trace-logs/:uuid' component={Logs}/>
            </Switch>
        </Router>
    );
}

export default App;