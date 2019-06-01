import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";
import Devices from "./Devices";
import Intro from "../Intro";
class Analytics extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Analytics" });
  };
  state = {
    devices: [
      {
        name: "device1",
        key: "2343283hsdiash7",
        date: "23-06-2019",
        sent: 5,
        received: 7
      },
      {
        name: "device2",
        key: "234328sdssdiash7",
        date: "24-06-2019",
        sent: 2,
        received: 1
      },
      {
        name: "device3",
        key: "23432gggsdiash7",
        date: "23-06-2019",
        sent: 3,
        received: 1
      },
      {
        name: "device4",
        key: "2343283hsdippp7",
        date: "23-06-2019",
        sent: 2,
        received: 7
      },
      {
        name: "device5",
        key: "23432fdsdiash7",
        date: "28-06-2019",
        sent: 7,
        received: 9
      }
    ]
  };
  render() {
    return (
      <div style={{ marginTop: 15 }}>
        <Intro
          heading="Devices"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it."
        />
        <Devices devices={this.state.devices} />
      </div>
    );
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(Analytics);
