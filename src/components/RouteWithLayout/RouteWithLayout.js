import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../services/auth';

export const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        isAuthenticated() ? (
          <Layout>
            <Component {...matchProps} /> 
          </Layout>
        ): ( <Redirect to={{pathname: '/', state: {from: props.location } }}/> 
        ) 
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  location: PropTypes.any,
  path: PropTypes.string
};

export default RouteWithLayout;
