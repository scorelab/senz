import React, { Component } from "react";
import Intro from "../Intro";
import DevicesList from "./DevicesList";
import ActionSelector from "./ActionSelector";
import { Grid, Container } from "@material-ui/core";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";

class Devices extends Component {
  state = {
    devices: [
      {
        name: "device1",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "offline"
      },
      {
        name: "device2",
        key: "27y1essd78",
        date: "30-05-2019",
        status: "online"
      },
      {
        name: "device3",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "online"
      },
      {
        name: "device3",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "online"
      },
      {
        name: "device3",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "online"
      },
      {
        name: "device3",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "online"
      },
      {
        name: "device3",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "online"
      },
      {
        name: "device3",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "online"
      },
      {
        name: "device3",
        key: "27y1ehwd72",
        date: "23-05-2019",
        status: "online"
      }
    ]
  };
  componentWillMount = () => {
    //Fetch all devices of the project from the store
    this.props.toggleHeadingAction({ heading: "Devices" });
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
              <ActionSelector />
            </Grid>
            <Grid item xs={12} style={{ padding: 30 }}>
              <DevicesList devices={this.state.devices} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(Devices);
