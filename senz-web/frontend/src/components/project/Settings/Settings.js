import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";
import Intro from "../Intro";
import Form from "./Form";

class Settings extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Settings" });
  };
  render() {
    return (
      <Fragment>
        <Intro
          heading="Settings"
          description="This contains the settings related to the selected project. You can change the name and description of the project. You can add multiple devices by using their public key. The danger zone contains the delete project button and switch status toggle. "
        />
        <Form data-test="FormComponent" />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(Settings);
