import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Loader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress />
        <br />
        <LinearProgress color="secondary" />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Loader);
