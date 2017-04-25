import React from 'react';
import { browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { List, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import { blue500 } from 'material-ui/styles/colors';
import PageCenter from './reusable/PageCenter.component';

/**
 * React component for
 * @class CustomDrawer
 */
class CustomDrawer extends React.Component {

  /**
   * constructor
   * @param {Object} props - props of the component
   */
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <Drawer
        open={ this.state.open }
        containerClassName="dark-drawer"
        containerStyle={ {
          backgroundColor: this.props.bgColor
        } }
      >
        <PageCenter>
          <h4 className="white-text">
            { this.props.title }
          </h4>
          <br /><br />
          <div id="user-basic-info">
            <Avatar size={ 60 }>
              { this.props.username[0].toUpperCase()}
            </Avatar>
            <h5>{ this.props.fullname }</h5>
            <h6>{ this.props.username }</h6>
            <div id="user-options-list">
              <List>
                <div onClick={ () => {
                  this.props.showAll();
                  browserHistory.push('/app/dashboard');
                } }>
                  <ListItem
                    leftAvatar={
                      <Avatar icon={
                        <Dashboard />
                      }
                      />
                    }
                    primaryText="Dashboard"
                  />
                </div>
                <Divider inset={ true } />
                <div onClick={ this.props.showOnlyFolder }>
                  <ListItem
                    leftAvatar={
                      <Avatar icon={
                        <FileFolder />
                      }
                      />
                    }
                    primaryText="Folders"
                  />
                </div>
                <Divider inset={ true } />
                <div onClick={ this.props.showOnlyDoc }>
                  <ListItem
                    leftAvatar={
                      <Avatar icon={
                        <ActionAssignment />
                        }
                        backgroundColor={ blue500 }
                      />
                    }
                    primaryText="Documents"
                  />
                </div>
                <Divider inset={ true } />
                <ListItem
                  leftAvatar={
                    <Avatar icon={
                      <span className="fa fa-user"></span>
                      }
                      backgroundColor={ blue500 }
                    />
                  }
                  primaryText="Edit Info"
                />
              </List>
            </div>
            <div className="fix-bottom">
              <FloatingActionButton
                secondary={ true }
                onTouchTap={ () => browserHistory.push('/app/logo')}
              >
                <span className="fa fa-power-off"></span>
              </FloatingActionButton>
            </div>
          </div>
        </PageCenter>
      </Drawer>
    );
  }
}

CustomDrawer.defaultProps = {
  username: 'Lorem',
  fullname: 'Ipsum Dolor',
  title: window.location.origin.split('//')[1],
  showAll: () => browserHistory.push('/app/dashboard'),
  showOnlyDoc: () => null,
  showOnlyFolder: () => null
};

export default CustomDrawer;
