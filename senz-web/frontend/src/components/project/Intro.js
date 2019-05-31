import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

function PaperSheet(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h6" component="h3">
          <b>{props.heading}</b>
        </Typography>
        <Typography component="p" variant="body2">
          {props.description}
        </Typography>
      </div>
    </div>
  );
}

export default PaperSheet;
