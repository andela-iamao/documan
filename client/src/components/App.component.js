import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Index from './Index.component';
// import Login from '../containers/Login.container';
// import User from '../containers/User.container';

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
 * propTypes
 * @property {array} selectable counrty list
 */
  static get propTypes() {
    return {
      countries: React.PropTypes.array
    };
  }

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <MuiThemeProvider>
        <Router history={ this.props.history }>
          <Route path="/app/"component={ Index } />
        </Router>
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

// <Route exact path='/app/login' component={ Login } />
// <Route exact path='/app/user' component={ User } />
