import React from 'react';
import { connect } from 'react-redux';
import Navbar from './reusable/Navbar.component';
import { getActiveUser } from '../actions/users.action';
import { getCurrentPath } from '../util/helper';
import signout from '../actions/signout.action';

@connect(store => ({
  auth: store.auth
}))
/**
 * Template
 * @class
 */
class Template extends React.Component {

  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!this.props.auth.loggedInUser) {
      this.props.dispatch(getActiveUser());
    }
  }

  signout() {
    window.localStorage.clear();
    this.props.dispatch(signout());
  }

  /**
   * render
   * @return {object} react elements to be rendered
   */
  render() {
    const pathsForSearch = ['/app/dashboard', '/app/manage', '/app/public'];
    return (
      <div>
        <Navbar
         type="dark"
         title="iAmDocuman"
         showLogin={getCurrentPath() !== '/app/login'}
         showSignup={getCurrentPath() !== '/app/signup'}
         showSearch={pathsForSearch.indexOf(getCurrentPath) !== -1}
         loginLink="/app/login"
         signupLink="/app/signup"
         onSignout={this.signout}
         isAuthenticated={
           (this.props.auth.loggedInUser
             && this.props.auth.loggedInUser.username) ?
           {
             username: this.props.auth.loggedInUser.username,
             userPage: '/app/dashboard'
           } : null
         }
        />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Template;
