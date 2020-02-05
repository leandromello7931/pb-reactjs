import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbar = props => {
  const { handleClose, open, duration, severity, message, vertical, horizontal  } = props;
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Snackbar
        anchorOrigin = {{vertical, horizontal}}
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

CustomizedSnackbar.propTypes = {
  duration: PropTypes.number,
  handleClose: PropTypes.func,
  horizontal: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
  severity: PropTypes.string,
  vertical: PropTypes.string,
 
}

export default CustomizedSnackbar;
