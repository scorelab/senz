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
import { withStyles } from "@material-ui/core/styles";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

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

//WON'T STORE DATA IN STORE

class Form extends Component {
  state = { checkedB: true };
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
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
                  variant="outlined"
                  label="Name"
                  margin="normal"
                  defaultValue="Project-1" //Update Project Name
                />
                <TextField
                  variant="outlined"
                  label="Description"
                  margin="normal"
                  defaultValue="Project Description" //Update Project Description
                  fullWidth
                />
                <br />
                <Button color="primary" variant="outlined">
                  Update
                </Button>
              </div>
            </div>
            <div className={classes.subSection}>
              <Typography variant="h6">Devices Detail</Typography>
              <Divider />
              <div className={classes.subHead}>
                <TextField
                  variant="outlined"
                  label="Public Key"
                  margin="normal"
                />
                <br />

                <Button color="primary" variant="outlined">
                  Add Device
                </Button>
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

const updateForm = reduxForm({
  form: "projectUpdate"
})(withStyles(styles, { withTheme: true })(Form));

export default connect(null)(updateForm);
