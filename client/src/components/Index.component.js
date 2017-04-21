import React from 'react';
import Navbar from './reusable/Navbar.component';
import IntroText from './reusable/IntroText.component';
import FullPageSlider from './reusable/FullPageSlider.component';

const text = 'Store, share and manage all your business files on the cloud.';

/**
 * React component for
 * @class Index
 */
class Index extends React.Component {

  /**
   * constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.currentUser = this.currentUser.bind(this);
  }

  /**
   * @return {Object} user details
   * @return {null} if no token is found
   */
  currentUser() {
    if (window.localStorage.getItem('token')) {
      return JSON.parse(window.localStorage.getItem('user')).data;
    }
    return null;
  }

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <div>
         <Navbar
          type="dark"
          title="iAmDocuman"
          loginLink="/app/login"
          isAuthenticated={
            (this.currentUser()) ?
            {
              username: this.currentUser().username,
              userPage: '/app/user'
            } : null
          }
         >
         </Navbar>
         <FullPageSlider />
         <IntroText
          color={ '#EFEFEF' }
          title={ 'Create, Manage and Extend' }
          text={ text }
          link={ { href: '/', label: 'Documentation' } }
         />
      </div>
    );
  }
}

export default Index;
