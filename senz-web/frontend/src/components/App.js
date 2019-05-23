import React, { Component, Fragment } from "react";
import NavBar from "./layout/NavBar";
import Drawer from "./layout/Drawer";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Drawer />
      </Fragment>
    );
  }
}

export default App;
