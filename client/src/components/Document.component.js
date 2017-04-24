import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Navbar from './reusable/Navbar.component';
import DocumentsGrid from './DocumentsGrid.component';
import CustomDrawer from './CustomDrawer.component';
import {
  getDoc,
  createDoc,
  confirmDeleteDoc,
  clearConfirmDeleteDoc
} from '../actions/document.action';
import {
  getUserFolders,
  createFolder,
  confirmDeleteFolder,
  clearConfirmDeleteFolder,
  deleteFolder
} from '../actions/folder.action';

@connect((store) => {
  return {
    user: store,
    form: store.form,
    error: store.error.error,
    auth: store.auth,
    docs: store.documents,
    folder: store.folder
  };
})
/**
 * React component for
 * @class User
 */
class User extends React.Component {

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/app/login');
    } else {
      this.props.dispatch(getDoc(this.props.params.id));
    }
  }

  /**
   * handleCreateDoc
   * @param {object} values - values to create document with
   * @return {void}
   */
  handleCreateDoc(values) {
    this.props.dispatch(createDoc(values));
  }

  /**
   * handleConfirmDeleteDoc
   * @param {object} id - id of document to delete
   * @return {void}
   */
  handleConfirmDeleteDoc(id) {
    this.props.dispatch(confirmDeleteDoc(id));
  }

  /**
   * clearDeleteConfirmation
   * @return {void}
   */
  clearDeleteConfirmation() {
    this.props.dispatch(clearConfirmDeleteDoc());
    this.props.dispatch(clearConfirmDeleteFolder());
  }

  /**
   * handleConfirmDeleteFolder
   * @param {object} values - values needed by
   * confirmation dialog of folder to delete
   * @return {void}
   */
  handleConfirmDeleteFolder(values) {
    this.props.dispatch(confirmDeleteFolder(values));
  }

  /**
   * handleCreateFolder
   * @param {object} values - data to create folder with
   * @return {void}
   */
  handleCreateFolder(values) {
    this.props.dispatch(createFolder(values));
  }

  /**
   * handleDeleteFolder
   * @param {object} id - id of folder to delete
   * @return {void}
   */
  handleDeleteFolder(id) {
    this.props.dispatch(deleteFolder(id));
  }

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <div>
        <Navbar
         type="dark"
         title="iAmDocuman"
         isAuthenticated={ {
           username: 'asheAmao',
           userPage: '/app/dashboard'
         } }
         showSignout={ false }
        />
        <div className="close-drawer">
        </div>
        <CustomDrawer />
        <h2>Document</h2>
      </div>
    );
  }
}

export default User;
