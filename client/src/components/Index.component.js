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
   * @return {ReactElement} jf
   */
  render() {
    return (
      <div>
         <Navbar
          type="dark"
          title="iAmDocuman"
          loginLink="/app/login"
         />
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
