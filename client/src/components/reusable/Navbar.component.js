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
        style={ style }
        title={ this.props.title }
        iconElementRight={
          <div>
            <Link to={ this.props.loginLink } >
              <RaisedButton
                label="Login"
                primary={ true }
                style={ { marginRight: '15px' } }
              />
            </Link>

            <RaisedButton
              onClick={ () => browserHistory.push('/app/login') }
              label="Sign Up"
              primary={ true }
            />
          </div>
        }
      />
    );
  }
}

Navbar.PropTypes = {
  title: PropTypes.string,
  loginLink: PropTypes.string
};

export default Navbar;
