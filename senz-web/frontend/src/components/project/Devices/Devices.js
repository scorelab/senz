import React, { Component } from "react";
import Intro from "../Intro";
import DevicesList from "./DevicesList";
import { Grid, Container, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";
import { removeProjectDevices } from "../../../_actions/project";

class Devices extends Component {
  state = {
    done: false,
    devices: [] //This should have id of devices to be removed
  };
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Devices" });
  };
  handleCheck = id => {
    var remDevices = [];
    if (this.state.devices.includes(id)) {
      remDevices = this.state.devices.filter(stateId => {
        return id !== stateId;
      });
      this.setState({ devices: remDevices });
    } else {
      remDevices = [...this.state.devices, id];
      this.setState({ devices: remDevices });
    }
  };
  handleRemove = () => {
    this.props.removeProjectDevices(
      this.props.project._id,
      this.state.devices,
      this.props.user.token
    );
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
              <DevicesList handleCheck={this.handleCheck} />
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
