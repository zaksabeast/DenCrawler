import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    padding: '0.75rem',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

export const ButtonGridItem = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      xs={12}
      sm={4}
      justify="center"
      className={classes.buttonContainer}
      {...props}
    />
  );
};
