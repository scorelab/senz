import React, { Component } from "react";
import Intro from "../Intro";
import { Grid, Container } from "@material-ui/core";
import NumDevices from "./NumDevices";
import HourReport from "./weeklyReport";
import Info from "./Info";
import ProjectList from "./ProjectStat";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";

class DashBoard extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Dashboard" });
  };
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Intro
            heading="Dashboard"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it."
          />
        </Grid>
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
              <Info
                firstLine={`Number of devices online: ${this.props.online}`}
                secondLine={`Number of devices offline: ${this.props.offline}`}
                heading="Device Details"
              />
            </Grid>
            <Grid item xs={6} />
          </Grid>
        </Container>
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
    }).length
  };
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction }
)(DashBoard);
