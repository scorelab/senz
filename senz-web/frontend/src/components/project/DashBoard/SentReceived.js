import React, { Component } from "react";
import { Polar } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});

class SentReceived extends Component {
  state = {
    data: {
      datasets: [
        {
          data: [11, 16],
          backgroundColor: ["#bbdefb", "#64b5f6"],
          hoverBackgroundColor: ["#bbdefb", "#64b5f6"],
          label: "My dataset" // for legend
        }
      ],
      labels: ["Sent", "Received"]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h6" component="h3">
            <b>Send and Receive Requests</b>
          </Typography>
          <br />
          <div>
            <Polar
              data={this.state.data}
              options={this.state.options}
              height={200}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SentReceived);
