import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleHeadingAction } from "../../_actions/heading";
import Intro from "../project/Intro";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  TextField,
  Typography,
  Divider,
  Paper
} from "@material-ui/core";
import { updateUserData } from "../../_actions/auth";
import Notifier from "../Notifier";

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
  },
  formcontainer: {
    padding: 30,
    border: "1px solid #9e9e9e"
  },
  innercontainer: {
    padding: 30,
    paddingLeft: 300
  }
});

class EditProfile extends Component {
  state = { done: false };
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Edit Profile" });
  };
  renderInputError = ({ error, touched }) => {
    if (error && touched) return { error: true, message: error };
    else return { error: false, message: "" };
  };

  renderInput = ({ input, id, label, meta, type }) => {
    const { error, message } = this.renderInputError(meta);
    if (error) {
      return (
        <TextField
          {...input}
          autoComplete="off"
          variant="outlined"
          id={id}
          label={message}
          type={type}
          error
        />
      );
    } else {
      return (
        <TextField
          {...input}
          autoComplete="off"
          variant="outlined"
          id={id}
          label={label}
          type={type}
          required
        />
      );
    }
  };
  handleClose = () => {
    this.setState({ done: false });
  };
  submit = ({ name, oldPassword, newPassword }) => {
    const { user } = this.props;
    this.props.updateUserData(
      user.id,
      user.token,
      name,
      oldPassword,
      newPassword
    );
    this.setState({ done: true });
  };
  render() {
    const { classes } = this.props;
    return (
      <div data-test="ProfileComponent">
        <NavBar />
        <SideBar />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Intro
            heading="Edit Profile"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it."
          />
          <div className={classes.table}>
            <Paper>
              <div className={classes.formcontainer}>
                <Typography variant="h6">User Details</Typography>
                <Divider />

                <form
                  onSubmit={this.props.handleSubmit(this.submit)}
                  className={classes.innercontainer}
                >
                  <br />
                  <Field
                    name="oldPassword"
                    id="oldPassword"
                    label="Enter Old Password"
                    component={this.renderInput}
                    type="password"
                  />
                  <br />
                  <br />
                  <Field
                    name="newPassword"
                    id="newPassword"
                    label="Enter New Password"
                    component={this.renderInput}
                    type="password"
                  />
                  <br />
                  <br />
                  <Field
                    name="newCPassword"
                    id="newCPassword"
                    label="Confirm Password"
                    component={this.renderInput}
                    type="password"
                  />
                  <br />
                  <br />
                  <Button
                    color="primary"
                    variant="outlined"
                    type="submit"
                    disabled={this.state.done}
                  >
                    Update
                  </Button>
                </form>
              </div>
            </Paper>
          </div>
        </main>
        <Notifier
          message="Details Updated"
          done={this.state.done}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}
const passwordValid = password => {
  if (password === undefined) return false;
  return password.length > 4;
};

const validate = ({ name, oldPassword, newPassword, newCPassword }) => {
  const errors = {};
  if (!name) errors.name = "Required";
  if (!passwordValid(oldPassword)) errors.oldPassword = "Incorrect";
  if (!passwordValid(newPassword)) errors.newPassword = "Too weak";
  if (newPassword !== newCPassword)
    errors.newCPassword = "Passwords don't match";

  return errors;
};

const updatedComponent = reduxForm({
  form: "editProfile",
  validate: validate
})(withStyles(styles, { withTheme: true })(EditProfile));

const MapStateToProp = state => {
  return { user: state.auth.user };
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction, updateUserData }
)(updatedComponent);
