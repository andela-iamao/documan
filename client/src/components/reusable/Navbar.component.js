import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  backgroundColor: '#222222',
  opacity: 0.7,
  position: 'fixed',
  top: 0,
  zIndex: 10
};

const isAuthenticated = props => (
  <div>
    <Link to={ props.isAuthenticated.userPage } >
      Hello { props.isAuthenticated.username }!
    </Link>
    <Link to={ '/app/logout' } >
      <RaisedButton
        label="Sign Out"
        primary={ true }
      />
    </Link>
  </div>
);

const notAuthenticated = props => (
  <div>
    {
      (props.showLogin) ?
        <Link to={ props.loginLink } className="navbar-login-btn">
          <RaisedButton
            label="Login"
            primary={ true }
            style={ { marginRight: '15px' } }
          />
        </Link>
      :
        ''
    }
    {
      (props.showSignup) ?
        <Link to={ props.signupLink } className="navbar-signup-btn" >
          <RaisedButton
            label="Sign Up"
            primary={ true }
          />
        </Link>
        :
        ''
    }
  </div>
);

/**
 * React component for
 * @class Navbar
 */
class Navbar extends React.Component {

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <AppBar
        iconStyleLeft={ { display: 'none' } }
        className="react-navbar"
        style={ this.props.style }
        title={ this.props.title }
        onTitleTouchTap={ () => browserHistory.push('/app/') }
        iconElementRight={
          (this.props.isAuthenticated) ?
            isAuthenticated(this.props) : notAuthenticated(this.props)
        }
      />
    );
  }
}

Navbar.defaultProps = {
  showLogin: true,
  loginLink: '/login',
  showSignup: true,
  signupLink: '/signup',
  isAuthenticated: null,
  title: window.location.origin.split('//')[1],
  style
};

Navbar.propTypes = {
  title: PropTypes.string,
  loginLink: PropTypes.string,
  signupLink: PropTypes.string,
  isAuthenticated: PropTypes.object,
  showLogin: PropTypes.bool,
  showSignup: PropTypes.bool
};

export default Navbar;
