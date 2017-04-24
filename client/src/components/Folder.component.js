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
  getFolder,
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
    folders: store.folder
  };
})
/**
 * React component for
 * @class User
 */
class Folder extends React.Component {

  constructor(props) {
    super(props);
    this.handleCreateFolder = this.handleCreateFolder.bind(this);
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    // this.handleDeleteDoc = this.handleDeleteDoc.bind(this);
    this.handleCreateDoc = this.handleCreateDoc.bind(this);
    this.handleConfirmDeleteDoc = this.handleConfirmDeleteDoc.bind(this);
    this.handleConfirmDeleteFolder = this.handleConfirmDeleteFolder.bind(this);
    this.clearDeleteConfirmation = this.clearDeleteConfirmation.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/app/login');
    } else {
      this.props.dispatch(getFolder(this.props.params.id));
    }
  }

  handleCreateDoc(values) {
    this.props.dispatch(createDoc(values));
  }

  handleConfirmDeleteDoc(values) {
    this.props.dispatch(confirmDeleteDoc(values));
  }

  clearDeleteConfirmation() {
    this.props.dispatch(clearConfirmDeleteDoc());
    this.props.dispatch(clearConfirmDeleteFolder());
  }

  handleConfirmDeleteFolder(values) {
    this.props.dispatch(confirmDeleteFolder(values));
  }

  handleCreateFolder(values) {
    this.props.dispatch(createFolder(values));
  }

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

export default Folder;
