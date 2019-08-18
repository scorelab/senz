import React, { Component, Fragment } from "react";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../_actions/heading";
import { fetchProjectAction, setProjectAction } from "../../_actions/project";
import ProjectList from "./ProjectList";
import Intro from "./Intro";
import PropTypes from "prop-types";
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
  state = { pId: "" };
  componentWillMount = () => {
    //Update projects from the redux store
    this.props.toggleHeadingAction({ heading: "All Projects" });
    this.props.fetchProjectAction(this.props.user.id, this.props.user.token);
    const modifiedProject = this.props.projects.map(project => {
      if (project.status)
        return {
          ...project,
          status: "ON",
          devices: project.devices.length,
          date: project.date.substr(0, 10)
        };
      else
        return {
          ...project,
          status: "OFF",
          devices: project.devices.length,
          date: project.date.substr(0, 10)
        };
    });
    this.setState({ projects: modifiedProject });
  };
  handleClick = () => {
    this.props.setProjectAction(this.state.pId, this.props.user.token);
  };
  handleOpen = pId => {
    this.setState({ pId });
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
            description="List all the projects of the user. Each row contains the name,number of devices,creation date and status. You can change all the details from the project settings."
          />
          <div className={classes.table}>
            <ProjectList
              handleClick={this.handleClick}
              handleOpen={this.handleOpen}
              projects={this.state.projects}
            />
          </div>
        </main>
      </Fragment>
    );
  }
}

const MapStateToProp = state => {
  return { projects: state.project.AllProject, user: state.auth.user };
};

AllProject.propTypes = {
  toggleHeadingAction: PropTypes.func,
  fetchProjectAction: PropTypes.func,
  projects: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction, fetchProjectAction, setProjectAction }
)(withStyles(styles, { withTheme: true })(AllProject));
