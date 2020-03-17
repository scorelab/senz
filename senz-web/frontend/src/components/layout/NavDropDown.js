import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { fetchProjectAction, setProjectAction } from "../../_actions/project";
import { fetchAllDeviceAction } from "../../_actions/device";
import { connect } from "react-redux";
import _ from "lodash";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  drop: {
    color: "#ffffff"
  }
});

class NavDropDown extends Component {
  state = {
    project: ""
  };
  componentWillMount = () => {
    if(this.props.user) {
      this.props.fetchProjectAction(this.props.user.id, this.props.user.token);
      this.props.fetchAllDeviceAction(this.props.user.id, this.props.user.token);
    }
  };
  handleChange = e => {
    this.setState(prevState => {
      this.props.setProjectAction(e.target.value, this.props.user.token);
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };
  render() {
    const { classes } = this.props;
    const selectProject = this.props.projects.map(project => {
      return (
        <MenuItem key={project._id} value={project._id}>
          {project.name}
        </MenuItem>
      );
    });
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="Selection" className={classes.drop}>
            {_.isEmpty(this.props.project)
              ? "Select Project"
              : this.props.project.name}
          </InputLabel>
          <Select
            inputProps={{
              name: "project",
              id: "Selection"
            }}
            onChange={this.handleChange}
            value={this.state.project}
            className={classes.drop}
          >
            {selectProject}
          </Select>
        </FormControl>
      </form>
    );
  }
}

const styledNavDrop = withStyles(styles, { withTheme: true })(NavDropDown);
const MapStateToProp = state => {
  return {
    projects: state.project.AllProject,
    project: state.project.SelectedProject,
    user: state.auth.user
  };
};

export default connect(
  MapStateToProp,
  { fetchProjectAction, setProjectAction, fetchAllDeviceAction }
)(styledNavDrop);
