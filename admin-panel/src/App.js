import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/theme";
import NavBarTop from "./components/navbar/NavBarTop";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Devices from "./components/devices/Devices";
import About from "./components/about/About";

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <NavBarTop />
          <div className="App">
            <Route path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/about" component={About} />
            <Route exact path="/devices" component={Devices} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
