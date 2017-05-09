import React from 'react';
import PropTypes from 'prop-types';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Template from './Template.component.jsx';
import Index from './Index.component.jsx';
import Login from './Login.component.jsx';
import Signup from './Signup.component.jsx';
import Logout from './reusable/Logout.component.jsx';
import Dashboard from './Dashboard.component.jsx';
import ViewDocument from './Document.component.jsx';
import Folder from './Folder/Folder.component.jsx';
import ManageUsers from './ManageUsers.component.jsx';
import EditDocument from './EditDocument.component.jsx';
import EditProfile from './EditProfile.component.jsx';
import PublicDocuments from './public-doc/PublicDocuments.component.jsx';
import User from './User/User.component.jsx';

const routes = (
  <Route exact path="/app/" component={Template}>
    <IndexRoute component={Index} />
    <Route path="/app/login" component={Login} />
    <Route path="/app/signup" component={Signup} />
    <Route path="/app/logout" compoent={Logout} />
    <Route path="/app/dashboard" component={Dashboard} />
    <Route path="/app/document/:id" component={ViewDocument} />
    <Route path="/app/folder/:id" component={Folder} />
    <Route path="/app/edit/:id" component={EditDocument} />
    <Route path="/app/public" component={PublicDocuments} />
    <Route path="/app/manage" component={ManageUsers} />
    <Route path="/app/user/:id" component={User} />
    <Route path="/app/user/:id/edit" component={EditProfile} />
  </Route>
);

@connect(store => ({
  user: store,
  form: store.form
}))
/**
 * React component for
 * @class App
 */
class App extends React.Component {

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <MuiThemeProvider>
        <Router history={this.props.history} routes={routes} />
      </MuiThemeProvider>
    );
  }
}

App.defaultProps = {
  history: browserHistory
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
