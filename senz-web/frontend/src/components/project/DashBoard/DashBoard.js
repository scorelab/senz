import React, { Component } from "react";
import Intro from "../Intro";
import { Grid, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import NumDevices from "./NumDevices";
import HourReport from "./weeklyReport";
import ProjectList from "./ProjectStat";
import DevicesInfo from "./DevicesInfo";
import { connect } from "react-redux";
import ReactLoading from 'react-loading';
import { toggleHeadingAction } from "../../../_actions/heading";

const useStyles = theme => ({
  loader: {
    marginLeft: "42%"
  }
})

class DashBoard extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Dashboard" });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid item xs={12}>
          <Intro
            heading="Dashboard"
            description="This contains the details about the selected project.The graph represents the number of requests in the past 7  days and number of devices offline and online respectively."
          />
        </Grid>
        {
          this.props.projectloading === true ?
            <ReactLoading type={'spinningBubbles'} color={'black'} height={40} width={40} className={classes.loader} />
            :
            <Container maxWidth="md">
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <HourReport />
                </Grid>
                <Grid item xs={6}>
                  <NumDevices />
                </Grid>
                <Grid item xs={6}>
                  <ProjectList />
                </Grid>
                <Grid item xs={6}>
                  <DevicesInfo />
                </Grid>
                <Grid item xs={6} />
              </Grid>
            </Container>
        }
      </div>
    );
  }
}

const MapStateToProp = state => {
  return {
    online: state.project.SelectedProject.devices.filter(device => {
      return device.status === true;
    }).length,
    offline: state.project.SelectedProject.devices.filter(device => {
      return device.status === false;
    }).length,
    projectloading: state.project.loading
  };
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction }
)(withStyles(useStyles, { withTheme: true })(DashBoard));
