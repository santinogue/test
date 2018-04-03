import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import './Layout.scss';

const Layout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <div className="layout">
        <SearchInput />
        {Component && <Component {...matchProps} />}
      </div>
    )}
  />
);

Layout.defaultProps = {
  component: () => (null),
};

Layout.propTypes = {
  component: PropTypes.func,
};

export default Layout;
