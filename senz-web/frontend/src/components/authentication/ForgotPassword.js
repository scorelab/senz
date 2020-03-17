import React, { Component } from "react";
import {
  Container,
  Typography,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Avatar
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { ResetPasswordAction } from "../../_actions/auth";
import { connect } from "react-redux";
import Notifier from "../Notifier";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(5)
  },
  submit: {
    margin: theme.spacing(5, 0, 2)
  }
});

class ForgotPassword extends Component {

  state = {
    done: false,
    notifier_message: ''
  }

  renderInputError = ({ error, touched }) => {
    if (error && touched) return { error: true, message: error };
    else return { error: false, message: "" };
  };

  renderInput = ({ input, label, meta }) => {
    const { error, message } = this.renderInputError(meta);
    if (error) {
      return (
        <TextField
          {...input}
          autoComplete="off"
          variant="outlined"
          fullWidth
          error
          label={message}
        />
      );
    } else {
      return (
        <TextField
          {...input}
          autoComplete="off"
          variant="outlined"
          fullWidth
          required
          label={label}
        />
      );
    }
  };

  submit = (email) => {
    this.props.ResetPasswordAction(email)
    .then(()=> { // show notification after getting response from the server
      const { password_resetted } = this.props;
      if(password_resetted) {
        this.setState({notifier_message: "A recovery email has been sent to your email address."})
      }
      else {
        this.setState({notifier_message: "There is no account associated with this email address."})
      }
      this.setState({ done: true });
    });
  };

  handleClose = () => {
    this.setState({ done: false });
  };

  render() {
    const { classes, invalid } = this.props;
    return (
      <Container component="main" maxWidth="xs" data-test="ForgotPasswordComponent">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.props.handleSubmit(this.submit)}
            data-test="ForgotPasswordForm"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  id="email"
                  label="Email Address"
                  component={this.renderInput}
                  type="text"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled = {invalid}
            >
              Submit
            </Button>
            <Grid container justify="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  Back to Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Notifier
          done={this.state.done}
          message={this.state.notifier_message}
          handleClose={this.handleClose}
        />
      </Container>
    );
  }
}

const emailValid = email => {
  const pattern = new RegExp(
    "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
  );
  return pattern.test(email);
};

const validate = ({email}) => {
  const errors = {};
  if (!emailValid(email)) errors.email = "Email not valid";
  return errors;
};

const MapStateToProp = state => {
  return {
    password_resetted: state.auth.password_resetted
  };
};

export default reduxForm({
  form: "forgotPassword",
  validate: validate,
})(connect(
  MapStateToProp,
  { ResetPasswordAction }
  )(withStyles(styles, { withTheme: true })(ForgotPassword)));
