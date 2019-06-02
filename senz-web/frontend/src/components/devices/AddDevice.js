import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../_actions/heading";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { withStyles } from "@material-ui/core/styles";
import Intro from "../project/Intro";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
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
  }
});

class AddDevice extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Register Device" });
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
  submit = ({ name, publicKey }) => {
    //Project Add Action here
    console.log(name, publicKey);
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
              heading="Register Device"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it."
            />
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
              <Button color="primary" variant="outlined" type="submit">
                Add
              </Button>
            </form>
          </main>
        </Paper>
      </Fragment>
    );
  }
}

const validate = ({ name, description }) => {
  const errors = {};
  if (!name) errors.name = "Required";
  if (!description) errors.description = "Required";
  return errors;
};

const updatedForm = reduxForm({
  form: "addDevice",
  validate: validate
})(withStyles(styles, { withTheme: true })(AddDevice));

export default connect(
  null,
  { toggleHeadingAction }
)(updatedForm);
