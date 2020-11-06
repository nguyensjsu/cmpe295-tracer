import React from 'react';
import './App.css';
import TraceGraph from "./components/TraceGraph/index";
import Home from "./components/Home/index";
import TraceList from "./components/Home/TraceList";
import SeqDia from "./components";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/tracelist' component={TraceList}/>
                <Route path='/tracegraph' component={TraceGraph}/>
                <Route path='/sequence-diagram' component={SeqDia}/>
            </Switch>
        </Router>
    );
}

export default App;