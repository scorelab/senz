import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";

class Settings extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Settings" });
  };
  render() {
    return <div>Settings Coming Soon</div>;
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(Settings);
