import React from 'react';
import PropTypes from 'prop-types';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Index from './Index.component';
import Login from './Login.component';
import Signup from './Signup.component';
import Logout from './reusable/Logout.component';
// import User from '../containers/User.container';

const routes = [
  {
    path: '/app/',
    component: Index
  },
  {
    path: '/app/login',
    component: Login
  },
  {
    path: '/app/signup',
    component: Signup
  },
  {
    path: '/app/logout',
    component: Logout
  }
];

@connect(store => ({
  user: store,
  form: store.form
}))
/**
 * React component for
 * @class App
 */
class App extends React.Component {

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <MuiThemeProvider>
        <Router history={ this.props.history } routes={ routes } />
      </MuiThemeProvider>
    );
  }
}

App.defaultProps = {
  history: browserHistory
};

App.propTypes = {
  history: PropTypes.object
};

export default App;

// <Route exact path='/app/user' component={ User } />
