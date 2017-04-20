import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';


const rootDivStyle = props => ({
  textAlign: 'center',
  height: '100vh',
  color: props.color
});

const centerDivStyle = {
  width: '100vw',
  padding: '10%',
  display: 'block'
};

/**
 * React component for IntroText
 * A component that renders a centered Introductory message
 * @class IntroText
 */
class IntroText extends React.Component {

  /**
   * React render method. Renders the component
   * @return {ReactElement} JSX react element for IntroText component
   */
  render() {
    return (
      <div style={ rootDivStyle(this.props) } className={ 'valign-wrapper' }>
        <div className={ 'valign' } style={ centerDivStyle }>
          <h3>{ this.props.title }</h3>
          <p className="header-text">{ this.props.text }</p>
          {
            (this.props.link) ?
            <a href={ this.props.link.href }>
              <RaisedButton
                label={ this.props.link.label }
                primary={ true }
              />
            </a>
            :
            ''
          }
        </div>
      </div>
    );
  }
}

IntroText.propTypes = {
  link: PropTypes.object,
  color: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
};

export default IntroText;
