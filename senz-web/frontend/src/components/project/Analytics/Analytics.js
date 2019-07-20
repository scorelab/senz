import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";
import Intro from "../Intro";
import StatusDetails from "./StatusDetails";
import InfoGraph from "./InfoGraph";
import { Grid, Container } from "@material-ui/core";

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
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <StatusDetails />
              </Grid>
              <Grid item xs={6}>
                <InfoGraph />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </div>
    );
  }
}

export default connect(
  null,
  { toggleHeadingAction }
)(Analytics);
