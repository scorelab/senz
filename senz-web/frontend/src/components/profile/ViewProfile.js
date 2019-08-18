import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleHeadingAction } from "../../_actions/heading";
import Intro from "../project/Intro";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import { Paper, Divider, Typography } from "@material-ui/core";
import ContentTable from "./ContentTable";

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
    marginLeft: 10
  },
  paper: {
    border: "1px solid #9e9e9e",
    padding: 20
  },
  subclass: {
    padding: 30,
    paddingLeft: 300
  }
});

class MyProfile extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "My Profile" });
  };
  render() {
    const { classes } = this.props;
    const { email, name, signature } = this.props.user;
    return (
      <div>
        <NavBar />
        <SideBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Intro
            heading="View Profile"
            description="View your account information.It includes a signature which will be used to verify the query while sending it through the senz switch."
          />
          <div className={classes.table}>
            <Paper className={classes.paper}>
              <Typography variant="h6">User Details</Typography>
              <Divider />
              <ContentTable email={email} name={name} signature={signature} />
            </Paper>
          </div>
        </main>
      </div>
    );
  }
}

const styledComp = withStyles(styles, { withStyles: true })(MyProfile);

const MapStateToProp = state => {
  return { user: state.auth.user };
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction }
)(styledComp);
