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
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { RegisterAction } from "../../_actions/auth";
import { connect } from "react-redux";

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(5, 0, 2)
  }
});

class Register extends Component {

  state = {
    type: 'password',
    Icon: <VisibilityOffIcon/>
  }


  handleClick = () => this.setState(({type}) => ({
    Icon: type === 'text' ? <VisibilityOffIcon/> : <VisibilityIcon/> ,
    type: type === 'text' ? 'password' : 'text'
    
  }))

  renderInputError = ({ error, touched }) => {
    if (error && touched) return { error: true, message: error };
    else return { error: false, message: "" };
  };

  renderInput = ({ input, label, type, id, meta }) => {
    const { error, message } = this.renderInputError(meta);
    if (error) {
      return (
        <TextField
          {...input}
          autoComplete="off"
          variant="outlined"
          fullWidth
          type={type}
          id={id}
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
          type={type}
          id={id}
          required
          label={label}
        />
      );
    }
  };
  submit = ({ firstName, lastName, email, password }) => {
    const name = `${firstName} ${lastName}`;
    this.props.RegisterAction({ name, email, password }, this.props.history);
  };

  passwordCheckHandler = () => {
    alert(" Rules for a valid Password : \n 1- Minimum password length is 6. \n 2- Password must contain atleast an uppercase letter \n 3- Password must contain atleast an lowercase letter. \n 4- Password must contain atleast a digit. \n 5- Password must contain atleast a special character. (@,$,#,%,&)")
  }
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" data-test="RegisterComponent">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.props.handleSubmit(this.submit)}
            data-test="RegisterForm"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  component={this.renderInput}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  component={this.renderInput}
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  id="email"
                  label="Email Address"
                  component={this.renderInput}
                  type="text"
                />
              </Grid>
              <Grid item xs={8}>
                <Field
                  name="password"
                  id="password"
                  label="Password"
                  type={this.state.type}
                  component={this.renderInput}
                />
              </Grid>
              <IconButton aria-label="info" onClick = {this.handleClick}>
                  {this.state.Icon}
              </IconButton>
              <IconButton aria-label="info" onClick = {this.passwordCheckHandler}>
                <InfoIcon/>
              </IconButton>
              <Grid item xs={12}>
                <Field
                  name="cPassword"
                  id="cPassword"
                  label="Confirm Password"
                  type="password"
                  component={this.renderInput}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
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

const passwordValid = password => {
  const passwordCheck = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
  if (password === undefined || !(passwordCheck.test(password))) return false;
  return true;
};

const validate = ({ firstName, lastName, email, password, cPassword }) => {
  const errors = {};
  if (!firstName) errors.firstName = "Not given";
  if (!lastName) errors.lastName = "Not given";
  if (!emailValid(email)) errors.email = "Email not valid";
  if (!passwordValid(password)) errors.password = "Password invalid";
  if (cPassword !== password) errors.cPassword = "Password don't match";
  return errors;
};

const registerForm = reduxForm({
  form: "register",
  validate: validate
})(withStyles(styles, { withTheme: true })(Register));

export default connect(
  null,
  { RegisterAction }
)(registerForm);
