import React, { Component } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  CssBaseline,
  Switch,
  FormGroup,
  FormControlLabel,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import {
  updateProjectInfoAction,
  addDeviceToProjectAction,
  deleteProjectAction,
  switchProjectStatus
} from "../../../_actions/project";
import { withStyles } from "@material-ui/core/styles";
import ReactLoading from 'react-loading';
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Notifier from "../../Notifier";

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#2196F3",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: "#2196F3",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  loader: {
    marginLeft: "42%"
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});

const styles = theme => ({
  main: {},
  subSection: {
    padding: 20
  },
  subHead: {
    border: "1px solid #9e9e9e",
    padding: 15,
    justifyContent: "space-between"
  },
  subHeadDelete: {
    border: "1px solid red",
    padding: 15,
    justifyContent: "space-between"
  }
});

class Form extends Component {
  state = {
    checkedB: true,
    name: this.props.project.name,
    description: this.props.project.description,
    added: false,
    updated: false,
    switch: false,
    openModal: false
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  handleClose = name => event => {
    this.setState({ [name]: false });
  };
  handleChange = name => event => {
    this.props.project.status = !this.props.project.status;
    this.props.switchProjectStatus(
      this.props.project._id,
      this.props.project.status,
      this.props.user.token
    );
    this.setState({ switch: true });
  };
  handleChangeInfo = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClickInfo = () => {
    const { name, description } = this.state;
    this.setState({ updated: true });
    this.props.updateProjectInfoAction(
      this.props.project._id,
      this.props.user.token,
      name,
      description
    );
  };
  renderInputError = ({ error, touched, active }) => {
    if (error && touched) return { error: true, message: error };
    if (error && active) return { error: true, message: error };
    else return { error: false, message: "" };
  };
  renderPublicKeyInput = ({ input, label, variant, margin, type, meta }) => {
    const { error, message } = this.renderInputError(meta);
    if (error) {
      return (
        <TextField
          {...input}
          label={message}
          variant={variant}
          margin={margin}
          type={type}
          error
        />
      );
    } else {
      return (
        <TextField
          {...input}
          label={label}
          variant={variant}
          margin={margin}
          required
          type={type}
        />
      );
    }
  };
  handlePubKeySubmit = ({ pubkey }) => {
    this.props.addDeviceToProjectAction(
      this.props.project._id,
      this.props.user.token,
      pubkey
    );
    this.setState({ added: true });
  };
  handleDelete = () => {
    const { project, user } = this.props;
    this.props.deleteProjectAction(project._id, user.id, user.token);
  };
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <CssBaseline />
        <Paper>
          <div className={classes.main} data-test="ProjectDetailSection">
            <div className={classes.subSection}>
              <Typography variant="h6">Project Details</Typography>
              <Divider />
              <div className={classes.subHead}>
                {this.props.updateloading ?
                  <ReactLoading type={'spinningBubbles'} color={'black'} height={40} width={40} className={classes.loader} />
                  :
                  <>
                    <TextField
                      name="name"
                      variant="outlined"
                      label="Name"
                      margin="normal"
                      value={this.state.name}
                      onChange={this.handleChangeInfo}
                    />
                    <TextField
                      name="description"
                      variant="outlined"
                      label="Description"
                      margin="normal"
                      value={this.state.description}
                      onChange={this.handleChangeInfo}
                      fullWidth
                    />
                    <br />
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={this.handleClickInfo}
                      disabled={this.state.updated}
                    >
                      Update
                </Button>
                  </>}
              </div>
            </div>
            <div className={classes.subSection}>
              <Typography variant="h6">Devices Detail</Typography>
              <Divider />
              <div className={classes.subHead}>
                <form
                  onSubmit={this.props.handleSubmit(this.handlePubKeySubmit)}
                >
                  <Field
                    name="pubkey"
                    variant="outlined"
                    label="Public Key"
                    margin="normal"
                    component={this.renderPublicKeyInput}
                    type="text"
                  />
                  <br />

                  <Button
                    color="primary"
                    disabled={this.state.added}
                    variant="outlined"
                    type="submit"
                  >
                    Add Device
                  </Button>
                </form>
              </div>
            </div>
            <div className={classes.subSection}>
              <Typography variant="h6">Danger Zone</Typography>
              <Divider />
              <div
                className={classes.subHeadDelete}
                data-test="ProjectSettingsSection"
              >
                <Typography variant="body1">Project Switch</Typography>
                {this.props.switchloading?
                 <ReactLoading type={'spinningBubbles'} color={'black'} height={40} width={40} className={classes.loader} />
                 :
                <FormGroup>
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Off</Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            checked={this.props.project.status}
                            onChange={this.handleChange("checkedB")}
                            value="checkedB"
                          />
                        }
                      />
                    </Grid>
                    <Grid item>On</Grid>
                  </Grid>
                </FormGroup>}
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={this.openModal}
                >
                  Delete Project
                </Button>
              </div>
            </div>
          </div>
        </Paper>
        <Notifier
          message="Device Added"
          done={this.state.added}
          handleClose={this.handleClose("added")}
        />
        <Notifier
          message="Details Updated"
          done={this.state.updated}
          handleClose={this.handleClose("updated")}
        />
        <Notifier
          message="Project Switched"
          done={this.state.switch}
          handleClose={this.handleClose("switch")}
        />
        
        {/* modal to ask for delete confimation from user*/}
        <Dialog
        open={this.state.openModal}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>
            Are you sure you want to delete this project?
          </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={this.handleClose("openModal")} 
            color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    );
  }
}

const MapStateToProp = state => {
  return {
    project: state.project.SelectedProject,
    devices: state.device.AllDevices,
    user: state.auth.user,
    updateloading: state.project.loading,
    switchloading:state.project.switchloading
  };
};
const validate = ({ pubkey }, props) => {
  const errors = {};
  const projectDevices = props.project.devices.map(device => {
    return device.pubkey;
  });
  const allDeviceKey = props.devices.map(device => {
    return device.pubkey;
  });
  if (projectDevices.indexOf(pubkey) !== -1) errors.pubkey = "Already Added";
  if (allDeviceKey.indexOf(pubkey) === -1) errors.pubkey = "Not found";
  return errors;
};

const updatedComponent = reduxForm({
  form: "addDevice",
  validate: validate
})(withStyles(styles, { withTheme: true })(Form));

export default connect(
  MapStateToProp,
  {
    updateProjectInfoAction,
    addDeviceToProjectAction,
    deleteProjectAction,
    switchProjectStatus
  }
)(updatedComponent);
