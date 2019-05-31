import React, { Component, Fragment } from "react";
import NavBar from "./layout/NavBar";
import SideBar from "./layout/SideBar";
import { withStyles } from "@material-ui/core/styles";
import ProjectTab from "./layout/ProjectTab";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginLeft: drawerWidth
  },
  toolbar: theme.mixins.toolbar
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavBar />
        <SideBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ProjectTab />
        </main>
      </Fragment>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Home);
