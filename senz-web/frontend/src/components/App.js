import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./Home";
import authRequired from "./authentication/hoc/authRequired";
import authNotRequired from "./authentication/hoc/authNotVisible";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={authNotRequired(Register)} />
          <Route path="/register" exact component={authNotRequired(Register)} />
          <Route path="/login" exact component={authNotRequired(Login)} />
          <Route path="/home" exact component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
