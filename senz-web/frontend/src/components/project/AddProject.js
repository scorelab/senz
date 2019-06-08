import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../_actions/heading";
import { fetchProjectAction, addProjectAction } from "../../_actions/project";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { withStyles } from "@material-ui/core/styles";
import Intro from "./Intro";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar
} from "@material-ui/core";
import { reduxForm, Field } from "redux-form";

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
  form: {
    padding: 50,
    border: "1px solid #9e9e9e"
  },
  close: {
    padding: theme.spacing(0.5)
  }
});

class AddProject extends Component {
  state = { done: false };
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "New Project" });
    this.props.fetchProjectAction(this.props.user.id, this.props.user.token);
  };
  renderInputError = ({ error, touched }) => {
    if (error && touched) return { error: true, message: error };
    else return { error: false, message: "" };
  };
  renderInput = ({ input, label, margin, fullWidth, variant, meta }) => {
    //Fix double clicking of button
    const { error, message } = this.renderInputError(meta);
    if (error) {
      return (
        <TextField
          {...input}
          label={message}
          margin={margin}
          fullWidth={fullWidth}
          variant={variant}
          autoComplete="off"
          error
        />
      );
    } else {
      return (
        <TextField
          {...input}
          label={label}
          margin={margin}
          fullWidth={fullWidth}
          variant={variant}
          autoComplete="off"
          required
        />
      );
    }
  };
  submit = async ({ name, description }) => {
    //Project Add Action here
    const newProject = { name: name, description: description };
    this.props.addProjectAction(
      newProject,
      this.props.user.id,
      this.props.user.token
    );
    this.setState({ done: true });
  };
  handleClose = () => {
    this.setState({ done: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavBar />
        <SideBar />
        <Paper>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Intro
              heading="Add Project"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it."
            />
            <form
              className={classes.form}
              onSubmit={this.props.handleSubmit(this.submit)}
            >
              <Typography variant="body1">Project Details</Typography>
              <Field
                name="name"
                label="Name"
                margin="normal"
                fullWidth={false}
                component={this.renderInput}
                variant="outlined"
              />
              <br />
              <Field
                name="description"
                label="Description"
                margin="normal"
                fullWidth={true}
                component={this.renderInput}
                variant="outlined"
              />
              <br />
              <br />
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                disabled={this.state.done}
              >
                Add
              </Button>
            </form>
          </main>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.done}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Project Created</span>}
        />
      </Fragment>
    );
  }
}

const validate = ({ name, description }, props) => {
  const errors = {};
  if (!name) errors.name = "Required";
  if (!description) errors.description = "Required";
  if (
    props.projects
      .map(project => {
        return project.name;
      })
      .indexOf(name) !== -1
  )
    errors.name = "Already Exist";
  return errors;
};

const updatedForm = reduxForm({
  form: "addProject",
  validate: validate
})(withStyles(styles, { withTheme: true })(AddProject));

const MapStateToProp = state => {
  return {
    user: state.auth.user,
    projects: state.project.AllProject
  };
};
export default connect(
  MapStateToProp,
  { toggleHeadingAction, fetchProjectAction, addProjectAction }
)(updatedForm);
