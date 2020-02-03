import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbar ({ handleClose, open, duration, severity, message  }){
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Snackbar
        autoHideDuration={duration}
        onClose={handleClose}
        open={open}
      >
        <Alert
          elevation={6}
          onClose={handleClose}
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
        
    </div>
  );
}
