import React from 'react';

/**
 * React component for
 * @class PageCenter
 */
class PageCenter extends React.Component {

  /**
   * render - description
   *
   * @return {object}  description
   */
  render() {
    return (
      <div className="valign-wrapper view-height center-align">
        <div className="valign view-width">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default PageCenter;
