import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import useStyles from './styles.js';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import CustomizedSnackbar from '../../components/Snackbar/'
import {
  Grid,
  Button,
  // IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import api from '../../services/api';


const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const override = css`
  border-color: #fff;
  display: flex;
  padding: 3.5px 0;
`;


const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    isLoading: false,
    loginFailed: false,
    openSnack: false,
    values: {},
    touched: {},
    errors: {}
  });
  useEffect(() => {

    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

  }, [formState.values]);

  // const handleBack = () => {
  //   history.goBack();
  // };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const user = {
      login: formState.values.email,
      password: formState.values.password
    };
    setFormState(formState => ({
      ...formState,
      isLoading: true,
    }));
    const response = await api.post('/users/login', user, {
      headers:{
        'Content-Type': 'application/json',
      }
    }).then( res => {
      return res;
    }).catch( err => {
      return err.response;
    });
    setFormState(formState => ({
      ...formState,
      isLoading: false,
    }));
    if(response){
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        history.push('/dashboard');
      }else{
        setFormState(formState => ({
          ...formState,
          loginFailed: true,
          openSnack: true
        }));
      }}else{
      setFormState(formState => ({
        ...formState,
        loginFailed: true,
        openSnack: true
      }));
    }
  };


  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  //Snackbar functions

  const handleSnackBarClose = () => {
    setFormState(formState => ({
      ...formState,
      openSnack: false,
    }));

  }


  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Takamaru Ayako
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            {/* <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div> */}
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sign in
                </Typography>


                <Typography
                  align="left"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  Login with email address
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  autoComplete="on"
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                 
                  { formState.isLoading ? (
                    <BeatLoader
                      color={'#fff'}
                      css={override}
                      size={15}
                    /> ) : (' Sign In') }
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Esqueceu sua senha?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Recuperar
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
      <CustomizedSnackbar
        duration={3000}
        handleClose={handleSnackBarClose}
        horizontal="right"
        message="Email ou senha inválidos"
        open={formState.openSnack}
        severity="error"
        variant= "outlined"
        vertical="top"
      />
    </div>

  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
