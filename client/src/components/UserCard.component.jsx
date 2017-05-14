import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

/**
 * React component for
 * @class UserCard
 */
class UserCard extends React.Component {

  /**
   * render
   * @return {object} react components to render
   */
  render() {
    const props = this.props;
    return (
      <div className="doc-card-root">
        <div className="doc-icon-action-wrapper">
          <div className="doc-card-icon" onClick={() =>
            browserHistory.push(`/app/user/${props.id}`)
          }>
            <img src={props.icon} />
          </div>
        </div>
        <div className="truncate doc-card-info chip tooltipped"
          data-position="bottom"
          data-delay="20"
          data-tooltip={props.title}
          >
          <span>{props.title}</span>
        </div>
      </div>
    );
  }
}

UserCard.defaultProps = {
  title: 'Lorem Ipsum Dolor',
  icon: '/images/person.png'
};

UserCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default UserCard;
