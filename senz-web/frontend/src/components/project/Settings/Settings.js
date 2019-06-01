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
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it."
        />
        <Form />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(Settings);
