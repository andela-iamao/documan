import React from 'react';
import { connect } from 'react-redux';
import Navbar from './reusable/Navbar.component';
import CustomDrawer from './CustomDrawer.component';
import { getActiveUser } from '../actions/users.action';
import { getCurrentPath } from '../util/helper';
import signout from '../actions/signout.action';
import { searchUser, searchDocs, clearSearch } from '../actions/search.action';
import {
  showOnlyFolder,
  showOnlyDoc,
  showAll
} from '../actions/views.action';

@connect(store => ({
  auth: store.auth,
  user: store.users,
  search: store.search
}))
/**
 * Template
 * @class
 */
class Template extends React.Component {

  constructor(props) {
    super(props);
    this.handleShowAll = this.handleShowAll.bind(this);
    this.handleShowOnlyDoc = this.handleShowOnlyDoc.bind(this);
    this.handleShowOnlyFolder = this.handleShowOnlyFolder.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.signout = this.signout.bind(this);
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!this.props.auth.loggedInUser) {
      this.props.dispatch(getActiveUser());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search.searchPage !== this.props.search.searchPage) {
      this.handlePageChange(nextProps.search.searchPage);
    }
  }

  signout() {
    window.localStorage.clear();
    this.props.dispatch(signout());
  }

  handleShowOnlyFolder() {
    this.props.dispatch(showOnlyFolder());
  }

  handleShowOnlyDoc() {
    this.props.dispatch(showOnlyDoc());
  }

  handleShowAll() {
    this.props.dispatch(showAll());
  }

  handleClearSearch() {
    this.props.dispatch(clearSearch());
  }

  handleSearch(query) {
    if (query.target.value.length > 0) {
      this.props.dispatch(searchDocs(9, 0, query.target.value));
      this.props.dispatch(searchUser(9, 0, query.target.value));
    } else {
      this.handleClearSearch();
    }
  }

  handlePageChange(pageNum) {
    const page = pageNum || this.state.searchPage;
    this.props.dispatch(searchDocs(9, 9 * (page - 1), query.target.value));
    this.props.dispatch(searchUser(9, 9 * (page - 1), query.target.value));
  }

  /**
   * render
   * @return {object} react elements to be rendered
   */
  render() {
    const pathsForSearch = [
    '/app/dashboard',
    '/app/folder',
  ];
    const pathsForNoDrawers = ['/app/login', '/app/signup', '/app/'];
    return (
      <div>
        <Navbar
         type="dark"
         title="iAmDocuman"
         showLogin={getCurrentPath() !== '/app/login'}
         showSignup={getCurrentPath() !== '/app/signup'}
         showSearch={pathsForSearch.indexOf(getCurrentPath()) !== -1}
         loginLink="/app/login"
         signupLink="/app/signup"
         onSignout={this.signout}
         handleSearch={this.handleSearch}
         isAuthenticated={
           (this.props.auth.loggedInUser
             && this.props.auth.loggedInUser.username) ?
           {
             username: this.props.auth.loggedInUser.username,
             userPage: `/app/user/${this.props.auth.loggedInUser.id}/edit`,
             dashboardPage: '/app/dashboard'
           } : null
         }
        />
        {
          (pathsForNoDrawers.indexOf(getCurrentPath()) === -1
            && this.props.auth.loggedInUser) ?
            <CustomDrawer
              title="iAmDocuman"
              showAll={this.handleShowAll}
              showOnlyDoc={this.handleShowOnlyDoc}
              id={this.props.auth.loggedInUser.id}
              userRole={this.props.auth.loggedInUser['Role.title']}
              showOnlyFolder={this.handleShowOnlyFolder}
              username={this.props.auth.loggedInUser.username}
              fullname={
                `${this.props.auth.loggedInUser.firstname}
                 ${this.props.auth.loggedInUser.lastname}`}
            /> : ''
        }
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Template;
