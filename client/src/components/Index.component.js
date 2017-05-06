import React from 'react';
import { connect } from 'react-redux';
import { getActiveUser } from '../actions/users.action';
import IntroText from './reusable/IntroText.component';
import FullPageSlider from './reusable/FullPageSlider.component';

const text = 'Store, share and manage all your business files on the cloud.';

@connect(store => ({
  user: store.auth
}))
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
   * componentDidMount
   * This runs just after the component has been rendered
   * It dispatches the getActiveUser action to fetch the current user
   * @return {void}
   */
  componentDidMount() {
    this.props.dispatch(getActiveUser());
  }

  /**
   * @return {Object} user details
   * @return {null} if no token is found
   */
  currentUser() {
    return this.props.user.loggedInUser || null;
  }

  /**
   * @return {Object} react element to be rendered to the DOM
   */
  render() {
    return (
      <div>
         <FullPageSlider>
           <li>
             <img src="/images/carousel_image_1.jpg" />
           </li>
           <li>
             <img src="/images/carouserl_image_2.jpg" />
           </li>
           <li>
             <img src="/images/carousel_image_3.jpeg" />
           </li>
         </FullPageSlider>
         <IntroText
          color={'#EFEFEF'}
          title={'Create, Manage and Extend'}
          text={text}
          link={{ href: '/', label: 'Documentation' }}
         />
      </div>
    );
  }
}

export default Index;
