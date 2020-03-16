import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHeadingAction } from "../../../_actions/heading";
import Intro from "../Intro";
import StatusDetails from "./StatusDetails";
import InfoGraph from "./InfoGraph";
import { Grid, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReactLoading from 'react-loading';

const useStyles = theme => ({
  loader: {
    marginLeft: "42%"
  }
})

class Analytics extends Component {
  componentWillMount = () => {
    this.props.toggleHeadingAction({ heading: "Analytics" });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Intro
          heading="Analytics"
          description="This contains all the error codes alongwith their meaning. The graph plots the respective errors from the past 7 days in different colors as given in the table."
        />
        {
          this.props.projectloading === true ?
            <ReactLoading type={'spinningBubbles'} color={'black'} height={40} width={40} className={classes.loader} />
            :
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
        }
      </div>
    );
  }
}
const MapStateToProp = state => {
  return {
    projectloading: state.project.loading
  };
};

export default connect(
  MapStateToProp,
  { toggleHeadingAction }
)(withStyles(useStyles, { withTheme: true })(Analytics));
