import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Doughnut } from "react-chartjs-2";

const styles = {
  card: {
    width: 300,
    height: 310,
    borderRadius: 15
  },
  media: {
    height: 140,
    padding: 10
  },
  sameLineText: {
    display: "inline-block",
    padding: 3
  },
  button: {
    marginTop: -2,
    marginLeft: 8
  }
};

class Devices extends Component {
  handleClick = key => {
    console.log(key);
  };
  renderHelper = () => {
    const { classes } = this.props;
    return this.props.devices.map((device, index) => {
      const data = {
        labels: ["Sent", "Received"],
        datasets: [
          {
            data: [device.sent, device.received],
            backgroundColor: ["#bbdefb", "#64b5f6"],
            hoverBackgroundColor: ["#bbdefb", "#64b5f6"]
          }
        ]
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      };

      return (
        <Grid item xs={4} key={index}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} src="removeWarning">
                <Doughnut data={data} options={options} />
              </CardMedia>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  <b>Name:</b> {device.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Key:</b> {device.key}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.sameLineText}
                  gutterBottom
                >
                  <b>Sent:</b> {device.sent}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.sameLineText}
                  gutterBottom
                >
                  <b>Received:</b> {device.received}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                variant="outlined"
                onClick={() => {
                  this.handleClick(device.key);
                }}
                className={classes.button}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };
  render() {
    return (
      <Grid container spacing={2}>
        {this.renderHelper()}
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Devices);
