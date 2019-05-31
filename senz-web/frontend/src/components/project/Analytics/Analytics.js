import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";

class Analytics extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Analytics" });
  };
  render() {
    return <div>Analytics Coming Soon</div>;
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(Analytics);
