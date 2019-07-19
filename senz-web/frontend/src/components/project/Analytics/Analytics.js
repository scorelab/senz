import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";
import Intro from "../Intro";

//TODO: fetch the SelectedProject stats and update states
class Analytics extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Analytics" });
  };

  render() {
    return (
      <div>
        <Intro
          heading="Devices"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it."
        />
      </div>
    );
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(Analytics);
