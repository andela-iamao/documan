import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Navbar from './reusable/Navbar.component';
import DocumentsGrid from './DocumentsGrid.component';
import CustomDrawer from './CustomDrawer.component';
import {
  getUserDocs,
  createDoc,
  confirmDeleteDoc,
  clearConfirmDeleteDoc,
  editDoc,
  clearEditDoc,
  updateDoc,
  deleteDoc
} from '../actions/document.action';
import {
  editFolder,
  clearEditFolder,
  updateFolder,
  getUserFolders,
  createFolder,
  confirmDeleteFolder,
  clearConfirmDeleteFolder,
  deleteFolder
} from '../actions/folder.action';
import {
  getUser
} from '../actions/users.action';

@connect(store => ({
  user: store,
  form: store.form,
  error: store.error.error,
  auth: store.auth,
  docs: store.documents,
  folder: store.folder
}))
/**
 * React component for
 * @class User
 */
class User extends React.Component {

  /**
   * constructor
   * @param {object} props - props/properties belonging to this component
   */
  constructor(props) {
    super(props);
    this.handleCreateFolder = this.handleCreateFolder.bind(this);
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    this.handleDeleteDoc = this.handleDeleteDoc.bind(this);
    this.handleCreateDoc = this.handleCreateDoc.bind(this);
    this.handleConfirmDeleteDoc = this.handleConfirmDeleteDoc.bind(this);
    this.handleConfirmDeleteFolder = this.handleConfirmDeleteFolder.bind(this);
    this.clearDeleteConfirmation = this.clearDeleteConfirmation.bind(this);
    this.handleEditDoc = this.handleEditDoc.bind(this);
    this.handleUpdateDoc = this.handleUpdateDoc.bind(this);
    this.handleClearEditDoc = this.handleClearEditDoc.bind(this);
    this.handleEditFolder = this.handleEditFolder.bind(this);
    this.handleUpdateFolder = this.handleUpdateFolder.bind(this);
    this.handleClearEditFolder = this.handleClearEditFolder.bind(this);
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/app/login');
    } else {
      this.props.dispatch(getUser());
      this.props.dispatch(getUserFolders());
      this.props.dispatch(getUserDocs());
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
   * handleEditDoc
   * @param {object} values - values to render dialog with
   * @return {void}
   */
  handleEditDoc(values) {
    this.props.dispatch(editDoc(values));
  }

  /**
   * handleUpdateDoc
   * @param {object} values - values to update document with
   * @return {void}
   */
  handleUpdateDoc(values) {
    this.props.dispatch(updateDoc(values));
  }

  /**
   * handleEditFolder
   * @param {object} values - values to render dialog with
   * @return {void}
   */
  handleEditFolder(values) {
    this.props.dispatch(editFolder(values));
  }

  /**
   * handleClearEditFolder
   * @return {void}
   */
  handleClearEditFolder() {
    this.props.dispatch(clearEditFolder());
  }

  /**
   * handleUpdateFolder
   * @param {object} values - values to update folder with
   * @return {void}
   */
  handleUpdateFolder(values) {
    this.props.dispatch(updateFolder(values));
  }

  /**
   * handleDeleteDoc
   * @param {object} id - document id to delete
   * @return {void}
   */
  handleDeleteDoc(id) {
    this.props.dispatch(deleteDoc(id));
  }

  /**
   * handleClearEditDoc
   * @return {void}
   */
  handleClearEditDoc() {
    this.props.dispatch(clearEditDoc());
  }

  /**
   * handleConfirmDeleteDoc
   * @param {object} values - object to render confirmation dialog with
   * @return {void}
   */
  handleConfirmDeleteDoc(values) {
    this.props.dispatch(confirmDeleteDoc(values));
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
   * @param {object} values - object to render confirmation dialog with
   * @return {void}
   */
  handleConfirmDeleteFolder(values) {
    this.props.dispatch(confirmDeleteFolder(values));
  }

  /**
   * handleCreateFolder
   * @param {object} values - object to create folder with
   * @return {void}
   */
  handleCreateFolder(values) {
    this.props.dispatch(createFolder(values));
  }

  /**
   * handleDeleteFolder
   * @param {object} value - folder data to render confirmation dialog with
   * @return {void}
   */
  handleDeleteFolder(value) {
    this.props.dispatch(deleteFolder(value));
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
           username: this.props.user.users.details.username,
           userPage: '/app/dashboard'
         } }
         showSignout={ false }
        />
        <div className="close-drawer">
        </div>
        <CustomDrawer
          title="iAmDocuman"
          username={ this.props.user.users.details.username }
          fullname={
            `${this.props.user.users.details.firstname}
             ${this.props.user.users.details.lastname}`}
        />
        <DocumentsGrid
          docs={ this.props.docs.data || null }
          folders={ this.props.folder.data || null }
          onFolderCreate={ this.handleCreateFolder }
          onEditFolder={ this.handleEditFolder }
          toEditFolder={ this.props.folder.editFolder }
          clearEditFolder={ this.handleClearEditFolder }
          onFolderDelete={ this.handleDeleteFolder }
          onUpdateFolder={ this.handleUpdateFolder }
          openDeleteDialog={
            this.props.folder.confirmDelete
            || this.props.docs.confirmDelete
          }
          onConfirmFolderDelete={ this.handleConfirmDeleteFolder }
          onDocCreate={ this.handleCreateDoc }
          onDocDelete={ this.handleDeleteDoc }
          onConfirmDocDelete={ this.handleConfirmDeleteDoc }
          clearDeleteConfirmation={ this.clearDeleteConfirmation }
          onEditDoc={ this.handleEditDoc }
          toEdit={ this.props.docs.editDoc }
          clearEdit={ this.handleClearEditDoc }
          onUpdateDoc={ this.handleUpdateDoc }
        />
      </div>
    );
  }
}

export default User;
