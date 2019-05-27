import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./authentication/Register";
import Login from "./authentication/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
