import React, { Component } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import { LoginAction } from "../../_actions/auth";
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
    marginTop: theme.spacing(5)
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
  submit = ({ email, password }) => {
    this.props.LoginAction({ email, password }, this.props.history);
  };
  render() {
    const { classes} = this.props;
    return (
      <Container component="main" maxWidth="xs" data-test="LoginComponent">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.props.handleSubmit(this.submit)}
            data-test="LoginForm"
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
              <Grid item xs={10}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
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

const validate = ({ firstName, lastName, email, password, cPassword }) => {
  const errors = {};
  if (!emailValid(email)) errors.email = "Email not valid";
  return errors;
};

const registerForm = reduxForm({
  form: "register",
  validate: validate
})(withStyles(styles, { withTheme: true })(Register));

export default connect(
  null,
  { LoginAction }
)(registerForm);
