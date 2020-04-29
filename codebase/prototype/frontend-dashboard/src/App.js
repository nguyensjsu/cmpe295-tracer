import React from 'react';
import {Provider} from 'react-redux'
import store from "./redux/store";
import './App.css';
import CakeContainer from "./components/CakeContainer";
import IceCreamContainer from "./components/IceCreamContainer"
import ItemContainer from "./components/ItemContainer";
import UsersContainer from "./components/UsersContainer";


function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <CakeContainer/>
          <IceCreamContainer/>
          <ItemContainer icecream/>
          <UsersContainer />
        </div>
      </Provider>
  );
}

export default App;
