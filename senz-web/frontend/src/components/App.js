//Setting up redux store and redux-persist
import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducers from "../_reducers";

import { BrowserRouter, Route } from "react-router-dom";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./Home";
import AddProject from "./project/AddProject";
//import authRequired from "./authentication/hoc/authRequired";
import authNotRequired from "./authentication/hoc/authNotVisible";
import AddDevice from "./devices/AddDevice";
import AllProject from "./project/AllProjects";
import AllDevice from "./devices/AllDevices";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: storage
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

class App extends Component {
  render() {
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <div>
              <Route path="/" exact component={authNotRequired(Register)} />
              <Route
                path="/register"
                exact
                component={authNotRequired(Register)}
              />
              <Route path="/login" exact component={authNotRequired(Login)} />
              <Route path="/home" exact component={Home} />

              <Route path="/addProject" exact component={AddProject} />
              <Route path="/addDevice" exact component={AddDevice} />
              <Route path="/allProject" exact component={AllProject} />
              <Route path="/allDevice" exact component={AllDevice} />
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
