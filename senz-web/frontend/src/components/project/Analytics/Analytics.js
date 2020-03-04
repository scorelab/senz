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
          heading="Analytics"
          description="This contains all the error codes alongwith their meaning. The graph plots the respective errors from the past 7 days in different colors as given in the table."
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
