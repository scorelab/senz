import React, { Component } from "react";
import Intro from "../Intro";
import DevicesList from "./DevicesList";
import { Grid, Container, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";
import { removeProjectDevices } from "../../../_actions/project";

class Devices extends Component {
  state = {
    devices: [],
    idDict: [],
    remDevices: [],
    done: false
  };
  componentWillMount = () => {
    //Fetch all devices of the project from the store
    var modidDict = [];
    this.props.toggleHeadingAction({ heading: "Devices" });
    const modifiedDevices = this.props.devices.map((device, index) => {
      if (device.status) {
        device.status = "ON";
        device.date = new Date(device.date).toLocaleDateString();
      } else {
        device.status = "OFF";
        device.date = new Date(device.date).toLocaleDateString();
      }
      const obj = { id: device._id };
      modidDict.push(obj);
      device.index = index + 1;
      return device;
    });
    this.setState({ devices: modifiedDevices, idDict: modidDict });
  };
  handleCheck = i => e => {
    const { idDict, remDevices } = this.state;
    if (remDevices.includes(idDict[i - 1].id)) {
      const modRemDevices = remDevices.filter(deviceId => {
        return deviceId !== idDict[i - 1].id;
      });
      this.setState({ remDevices: modRemDevices });
    } else {
      const modRemDevices = [...remDevices, idDict[i - 1].id];
      this.setState({ remDevices: modRemDevices });
    }
  };
  handleRemove = () => {
    this.props.removeProjectDevices(
      this.props.project._id,
      this.state.remDevices,
      this.props.user.token
    );
    const modDevices = this.state.devices.filter(device => {
      return !this.state.remDevices.includes(device._id);
    });
    this.setState({ done: true, devices: modDevices });
  };
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Intro
            heading="Devices"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it."
          />
        </Grid>
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleRemove}
              >
                Remove
              </Button>
            </Grid>
            <Grid item xs={12} style={{ padding: 30 }}>
              <DevicesList
                devices={this.state.devices}
                handleCheck={this.handleCheck}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const MapStateToProp = state => {
  return {
    devices: state.project.SelectedProject.devices,
    project: state.project.SelectedProject,
    user: state.auth.user
  };
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction, removeProjectDevices }
)(Devices);
