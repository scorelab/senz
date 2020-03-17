import React, { Component } from "react";
import {Typography, Container, Link} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SenzLogo from "../assets/images/senz_logo.png";

const styles = theme => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  heading: {
    width: "100%",
    textAlign: "center",
    marginBottom: "30px"
  },
  logoImg: {
    maxHeight: "300px",
    marginBottom: "30px",
    opacity: "80%"
  }
});
class NotFound extends Component {
  render() {
    const {classes} = this.props;
    return(
      <Container className={classes.root}>
        <img src={SenzLogo} alt="SenZ Admin Panel" className={classes.logoImg} />
        <Typography variant="h6" component="h3" className={classes.heading}>
          This page doesn't exist
        </Typography>
        <Link href="/" variant="body1">Back to Home</Link>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NotFound);
