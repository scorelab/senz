import React, { Component, Fragment } from "react";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../_actions/heading";
import ProjectList from "./ProjectList";
import Intro from "./Intro";

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
  toolbar: theme.mixins.toolbar,
  table: {
    marginLeft: 100
  }
});

class AllProject extends Component {
  state = {
    projects: [
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" },
      { name: "Project1", devices: 12, date: "23-05-2019", status: "ON" }
    ]
  };
  componentWillMount = () => {
    //Update projects from the redux store
    this.props.toggleHeadingAction({ heading: "All Projects" });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavBar />
        <SideBar />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Intro
            heading="Projects"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it."
          />
          <div className={classes.table}>
            <ProjectList projects={this.state.projects} />
          </div>
        </main>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(withStyles(styles, { withTheme: true })(AllProject));
