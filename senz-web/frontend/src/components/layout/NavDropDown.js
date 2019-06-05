import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { fetchProjectAction, setProjectAction } from "../../_actions/project";
import { connect } from "react-redux";

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
  }
});

class NavDropDown extends Component {
  state = {
    project: ""
  };
  componentWillMount = () => {
    this.props.fetchProjectAction(this.props.user.id, this.props.user.token);
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
  //this.props.projects
  render() {
    const { classes } = this.props;
    const selectProject = this.props.projects.map((project, index) => {
      return (
        <MenuItem key={project._id} value={project._id}>
          {project.name}
        </MenuItem>
      );
    });
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="Selection">Select Project</InputLabel>
          <Select
            inputProps={{
              name: "project",
              id: "Selection"
            }}
            onChange={this.handleChange}
            value={this.state.project}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
    user: state.auth.user
  };
};

export default connect(
  MapStateToProp,
  { fetchProjectAction, setProjectAction }
)(styledNavDrop);
