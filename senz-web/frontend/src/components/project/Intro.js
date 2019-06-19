import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  divider: {
    height: 2,
    backgroundColor: "#23344e"
  }
}));

function PaperSheet(props) {
  const classes = useStyles();

  return (
    <div data-test="IntroComponent">
      <div className={classes.root}>
        <Typography variant="h6" component="h3">
          <b>{props.heading}</b>
        </Typography>
        <Divider className={classes.divider} />
        <Typography component="p" variant="body2">
          {props.description}
        </Typography>
      </div>
    </div>
  );
}

PaperSheet.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string
};

export default PaperSheet;
