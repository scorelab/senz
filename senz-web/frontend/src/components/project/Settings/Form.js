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
  Grid
} from "@material-ui/core";
import {
  updateProjectInfoAction,
  addDeviceToProjectAction
} from "../../../_actions/project";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

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
    description: this.props.project.description
  };
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };
  handleChangeInfo = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClickInfo = () => {
    const { name, description } = this.state;
    this.props.updateProjectInfoAction(
      this.props.project._id,
      this.props.user.token,
      name,
      description
    );
  };
  renderInputError = ({ error, touched }) => {
    if (error && touched) return { error: true, message: error };
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
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <CssBaseline />
        <Paper>
          <div className={classes.main}>
            <div className={classes.subSection}>
              <Typography variant="h6">Project Details</Typography>
              <Divider />
              <div className={classes.subHead}>
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
                >
                  Update
                </Button>
              </div>
            </div>
            <div className={classes.subSection}>
              <Typography variant="h6">Devices Detail</Typography>
              <Divider />
              <div className={classes.subHead}>
                <form>
                  <Field
                    name="pubkey"
                    variant="outlined"
                    label="Public Key"
                    margin="normal"
                    component={this.renderPublicKeyInput}
                    type="text"
                  />
                  <br />

                  <Button color="primary" variant="outlined">
                    Add Device
                  </Button>
                </form>
              </div>
            </div>
            <div className={classes.subSection}>
              <Typography variant="h6">Danger Zone</Typography>
              <Divider />
              <div className={classes.subHeadDelete}>
                <Typography variant="body1">Project Switch</Typography>
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
                            checked={this.state.checkedB}
                            onChange={this.handleChange("checkedB")}
                            value="checkedB"
                          />
                        }
                      />
                    </Grid>
                    <Grid item>On</Grid>
                  </Grid>
                </FormGroup>
                <Button size="small" color="secondary" variant="outlined">
                  Delete Project
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    );
  }
}

const MapStateToProp = state => {
  return {
    project: state.project.SelectedProject,
    user: state.auth.user
  };
};
const validate = ({ pubkey }, props) => {
  const errors = {};
  if (props.project.devices.indexOf(pubkey) !== -1) {
    errors.pubkey = "Already exists";
  } //DO THIS AFTER DOING ALL DEVICES
  return errors;
};

const updatedComponent = reduxForm({
  form: "addDevice",
  validate: validate
})(withStyles(styles, { withTheme: true })(Form));

export default connect(
  MapStateToProp,
  { updateProjectInfoAction, addDeviceToProjectAction }
)(updatedComponent);
