import React from 'react';
import {Provider} from 'react-redux'
import store from "./redux/store";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CakeContainer from "./components/CakeContainer";
import IceCreamContainer from "./components/IceCreamContainer"
import ItemContainer from "./components/ItemContainer";
import UsersContainer from "./components/UsersContainer";
import SideNavContainer from "./components/sideNavContainer";
import HomeContainer from "./components/homeContainer";
import TraceContainer from "./components/traceContainer";


function App() {
  return (
      <Provider store={store}>
        <div className="App">
            <Router>
                {/*<CakeContainer/>*/}
                {/*<IceCreamContainer/>*/}
                {/*<ItemContainer icecream/>*/}
                {/*<UsersContainer />*/}
                <SideNavContainer/>
                <Switch>
                    <Route exact path="/" component={HomeContainer}/>
                    <Route exact path="/trace/:id" component={TraceContainer}/>
                </Switch>
            </Router>
        </div>
      </Provider>
  );
}

export default App;
