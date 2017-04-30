import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import PowerButton from 'material-ui/svg-icons/action/power-settings-new';
import PersonPin from 'material-ui/svg-icons/maps/person-pin';

const style = {
  backgroundColor: '#222222',
  opacity: 0.7,
  position: 'fixed',
  top: 0,
  zIndex: 10,
  paddingRight: 40
};

const isAuthenticated = props => (
  <div className="row navbar-right-element" style= {{ marginBottom: 0 }}>
    {
      (props.showSearch) ?
      <div className="col m8 l9 search-navbar">
        <form>
          <div className="input-field col s12">
            <input
              id="search"
              type="search"
              onChange={ props.handleSearch }
              required />
            <label htmlFor="search">
              search
            </label>
            <i className="material-icons">
              <span className="fa fa-close"></span>
            </i>
          </div>
        </form>
      </div>
      : ''
    }
    <div className={
      (props.showSearch) ?
      'col m4 l3 navbar-right-buttons' : ''
    }>
      <div>
        <IconMenu
          onKeyboardFocus={null}
          keyboardFocused={null}
          iconButtonElement={
            <IconButton>
              <Avatar size={30}>
                <span>
                  { props.isAuthenticated.username[0].toUpperCase()}
                </span>
              </Avatar>
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            focusState="none"
            primaryText="View Profile"
            leftIcon={<PersonPin />}
            onTouchTap={() =>
              browserHistory.push(props.isAuthenticated.userPage)}
          />
          <MenuItem
            focusState="none"
            primaryText="Sign out"
            leftIcon={<PowerButton />}
            onTouchTap={() => props.onSignout()}
          />
        </IconMenu>
      </div>
    </div>
  </div>
);

const notAuthenticated = props => (
  <div>
    {
      (props.showLogin) ?
        <Link to={props.loginLink} className="navbar-login-btn">
          <RaisedButton
            label="Login"
            primary
            style={{ marginRight: '15px' }}
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
            primary
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
        className="react-navbar"
        iconStyleLeft={{ display: 'none' }}
        style={ this.props.style }
        title={
          this.props.title
        }
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
  showSignout: true,
  signoutLink: '/logout',
  isAuthenticated: null,
  title: window.location.origin.split('//')[1],
  style
};

Navbar.propTypes = {
  title: PropTypes.string,
  handleSearch: PropTypes.func,
  loginLink: PropTypes.string,
  signupLink: PropTypes.string,
  isAuthenticated: PropTypes.object,
  showLogin: PropTypes.bool,
  showSignup: PropTypes.bool,
  showSignout: PropTypes.bool
};

export default Navbar;

// <Link to={ props.isAuthenticated.userPage } >
//   <h6>
//     Hello { props.isAuthenticated.username }!
//   </h6>
// </Link>
// {
//   (props.showSignout) ?
//   <Link to={ '/app/logout' } >
//     <RaisedButton
//       label="Sign Out"
//       primary={ true }
//     />
//   </Link>
