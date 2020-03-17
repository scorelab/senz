import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../_actions/heading";
import { withStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { reduxForm, Field } from "redux-form";
import {
  editDeviceAction,
  fetchAllDeviceAction,
  toggleIsEditingDevice
} from "../../_actions/device";
import Notifier from "../Notifier";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    marginTop: "auto",
    marginBottom: "auto",
    top: 0,
    bottom: 0
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
  button: {
    margin: theme.spacing(1)
  }
});

class EditDevice extends Component {
  state = { done: false };
  componentWillMount = () => {
    this.props.initialize({
      name: this.props.name,
      publicKey: this.props.pubkey
    });
    this.props.fetchAllDeviceAction(this.props.user.id, this.props.user.token);
    this.props.toggleHeadingAction({ heading: "Editing Device" });
  };
  renderInputError = ({ error, touched }) => {
    if (error && touched) return { error: true, message: error };
    else return { error: false, message: "" };
  };
  renderInput = ({ input, label, margin, fullWidth, variant, meta }) => {
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
  submit = async ({ name, publicKey }) => {
    await this.props.editDeviceAction(
      name,
      publicKey,
      this.props.deviceId,
      this.props.user.token,
      this.props.user.id
    );
    await this.setState({ done: true });
    this.props.toggleIsEditingDevice(false);
    this.props.toggleHeadingAction({ heading: "All Devices" });
  };
  handleClose = () => {
    this.setState({ done: false });
  };
  onCancel = () => {
    this.props.toggleIsEditingDevice(false);
    this.props.toggleHeadingAction({ heading: "All Devices" });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <form
              className={classes.form}
              onSubmit={this.props.handleSubmit(this.submit)}
            >
              <Typography variant="body1">Device Details</Typography>
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
                name="publicKey"
                label="Public Key"
                margin="normal"
                fullWidth={false}
                component={this.renderInput}
                variant="outlined"
              />
              <br />
              <br />
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                className={classes.button}
                disabled={this.state.done}
              >
                Done
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                className={classes.button}
                onClick={this.onCancel}
              >
                Cancel
              </Button>
            </form>
          </main>
        </Paper>
        <Notifier
          done={this.state.done}
          message="Done Changes"
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

const validate = ({ name, publicKey }, prop) => {
  const errors = {};
  if (!name) errors.name = "Required";
  if (!publicKey) errors.publicKey = "Required";
  const pubKeyAll = prop.devices.map(device => {
    return device.pubkey;
  });
  if (pubKeyAll.indexOf(publicKey) !== -1 && publicKey !== prop.pubkey)
    errors.publicKey = "Already Exists";
  return errors;
};

const updatedForm = reduxForm({
  form: "editDevice",
  validate: validate
})(withStyles(styles, { withTheme: true })(EditDevice));

const MapStateToProp = state => {
  return { user: state.auth.user, devices: state.device.AllDevices };
};

export default connect(MapStateToProp, {
  toggleHeadingAction,
  editDeviceAction,
  fetchAllDeviceAction,
  toggleIsEditingDevice
})(updatedForm);
