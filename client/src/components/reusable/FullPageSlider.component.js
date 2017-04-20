/* globals $:true */

import React from 'react';
import PropTypes from 'prop-types';

/**
* Get zIndex of a component based on the position prop
* @param {Object} props - props of the component
* @return {Object} returns calculated style
*/
function position(props) {
  return {
    zIndex: (props.position === 'back') ? -10 : 10
  };
}

/**
 * React component for FullPageSlider
 * A component that renders a fullpage slide show
 * @class FullPageSlider
 */
class FullPageSlider extends React.Component {

  /**
   * React componentDidMount lifecycle method.
   * It starts the slideshow just after the component renders.
   * @return {void}
   */
  componentDidMount() {
    this.props.startSlider();
  }

  /**
   * React render method. Renders the component
   * @return {ReactElement} JSX react element for FullPageSlider component
   */
  render() {
    return (
    <div>
      <div className="fullpage-overlay">
      </div>
      <div
        className="slider fullscreen"
        style={ position(this.props) }>
        <ul className="slides">
          <li>
            <img src="/images/carousel_image_1.jpg" />
          </li>
          <li>
            <img src="/images/carouserl_image_2.jpg" />
          </li>
          <li>
            <img src="/images/carousel_image_3.jpeg" />
          </li>
          <li>
            <img src="http://lorempixel.com/580/250/nature/4" />
          </li>
        </ul>
      </div>
    </div>
    );
  }
}

FullPageSlider.defaultProps = {
  style: {},
  position: 'back',
  startSlider() {
    $(document).ready(() => {
      $('.slider').slider();
    });
  }
};

FullPageSlider.propTypes = {
  style: PropTypes.object,
  position: PropTypes.string,
  startSlider: PropTypes.func
};

export default FullPageSlider;
