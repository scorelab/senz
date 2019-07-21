import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Home from "./Home";
import AddProject from "./project/AddProject";
import authRequired from "./authentication/hoc/authRequired";
import authNotRequired from "./authentication/hoc/authNotVisible";
import AddDevice from "./devices/AddDevice";
import AllProject from "./project/AllProjects";
import AllDevice from "./devices/AllDevices";
import EditProfile from "./profile/EditProfile";
import ViewProfile from "./profile/ViewProfile";
import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
//TODO: Update all note cards
const theme = createMuiTheme({
  typography: {
    // Use the system font.
    fontFamily: "Fira Sans"
  }
});
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter data-test="AppComponent">
          <div>
            <Route path="/" exact component={Register} />
            <Route
              path="/register"
              exact
              component={authNotRequired(Register)}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/home" exact component={authRequired(Home)} />

            <Route
              path="/addProject"
              exact
              component={authRequired(AddProject)}
            />
            <Route
              path="/addDevice"
              exact
              component={authRequired(AddDevice)}
            />
            <Route
              path="/allProject"
              exact
              component={authRequired(AllProject)}
            />
            <Route
              path="/allDevice"
              exact
              component={authRequired(AllDevice)}
            />
            <Route
              path="/editProfile"
              exact
              component={authRequired(EditProfile)}
            />
            <Route
              path="/viewProfile"
              exact
              component={authRequired(ViewProfile)}
            />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
