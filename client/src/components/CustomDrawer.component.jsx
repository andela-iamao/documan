import React from 'react';
import { browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { List, ListItem } from 'material-ui/List';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import { blue500 } from 'material-ui/styles/colors';
import PageCenter from './reusable/PageCenter.component.jsx';

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

  /**
   * handleToggle
   * @return {void}
   */
  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  /**
   * @return {Object} return react element to render
   */
  render() {
    return (
      <Drawer
        open={this.state.open}
        containerClassName="dark-drawer"
        containerStyle={{ backgroundColor: this.props.bgColor }}
      >
        <PageCenter>
          <h5 className="white-text" onClick={() => browserHistory.push('/app/')}>
            {this.props.title}
          </h5>
          <br /><br />
          <div id="user-basic-info">
            <Avatar
              size={60}
              onTouchTap={() => browserHistory.push('/app/dashboard')}>
              {this.props.username[0].toUpperCase()}
            </Avatar>
            <h5>{this.props.fullname}</h5>
            <h6>{this.props.username}</h6>
            <div id="user-options-list" className="white-text">
              <List>
                <div
                  className="white-text"
                  onClick={() => {
                    this.props.showAll();
                    browserHistory.push('/app/dashboard');
                  }}>
                  <ListItem
                    leftAvatar={ <Avatar icon={<DashboardIcon />}/>}
                    primaryText="Dashboard"
                  />
                  <Divider inset />
                </div>
                <div onClick={this.props.showOnlyFolder}>
                  <ListItem leftAvatar={<Avatar icon={<FileFolder />}/>}
                    primaryText="Folders"
                  />
                  <Divider inset />
                </div>
                <div onClick={this.props.showOnlyDoc}>
                  <ListItem
                    leftAvatar={
                      <Avatar
                        icon={<ActionAssignment />}
                        backgroundColor={blue500}
                      />
                    }
                    primaryText="Documents"
                  />
                  <Divider inset />
                </div>
                <div onClick={() => browserHistory.push('/app/public')}>
                  <ListItem
                    leftAvatar={
                      <Avatar icon={
                        <span className="fa fa-user"></span>
                        }
                        backgroundColor={blue500}
                      />
                    }
                    primaryText="Public Documents"
                  />
                  <Divider inset />
                </div>
                <div onClick={() =>
                    browserHistory.push(`/app/user/${this.props.id}/edit`)
                  }>
                  <ListItem
                    leftAvatar={
                      <Avatar icon={
                        <span className="fa fa-user"></span>
                        }
                        backgroundColor={blue500}
                      />
                    }
                    primaryText="Edit Info"
                  />
                  <Divider inset />
                </div>
                {(this.props.userRole === 'admin') ?
                    <div onClick={() =>
                        browserHistory.push('/app/manage')
                      }>

                      <ListItem
                        className="manage"
                        leftAvatar={
                          <Avatar icon={
                            <span className="fa fa-users"></span>
                            }
                            backgroundColor={blue500}
                          />
                        }
                        primaryText="Manage"
                      />
                      <Divider inset />
                    </div>
                    :
                    undefined
                }
              </List>
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
