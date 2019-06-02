import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./Home";
import AddProject from "./project/AddProject";
// import authRequired from "./authentication/hoc/authRequired";
import authNotRequired from "./authentication/hoc/authNotVisible";
import AddDevice from "./devices/AddDevice";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={authNotRequired(Register)} />
          <Route path="/register" exact component={authNotRequired(Register)} />
          <Route path="/login" exact component={authNotRequired(Login)} />
          <Route path="/home" exact component={Home} />
          <Route path="/addProject" exact component={AddProject} />
          <Route path="/addDevice" exact component={AddDevice} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
