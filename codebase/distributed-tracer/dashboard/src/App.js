import React from 'react';
import './App.css';
import TraceGraph from "./components/TraceGraph/index";
import Home from "./components/Home/index";
import TraceList from "./components/TraceList/index";
import SeqDia from "./components";

import {HashRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/trace-list' component={TraceList}/>
                <Route path='/trace-graph/:uuid' component={TraceGraph}/>
                <Route path='/sequence-diagram' component={SeqDia}/>
            </Switch>
        </Router>
    );
}

export default App;