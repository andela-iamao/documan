import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import DocumentsGrid from './DocumentsGrid.component.jsx';
import Search from './Search/Search.component.jsx';
import { clearSearch } from '../actions/search.action';
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
  deleteFolder,
  clearFolderError
} from '../actions/folder.action';
import { getActiveUser } from '../actions/users.action';

@connect(store => ({
  user: store.users,
  form: store.form,
  error: store.error.error,
  auth: store.auth,
  docs: store.documents,
  folders: store.folder,
  views: store.views,
  search: store.search
}))
/**
 * React component for
 * @class Dashboard
 */
class Dashboard extends React.Component {

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
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleClearFolderError = this.handleClearFolderError.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/app/login');
    } else {
      this.props.dispatch(getActiveUser());
      this.props.dispatch(getUserFolders());
    }
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps - next properties to be recieved by the
   * component
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.details && !this.props.docs.documents) {
      this.props.dispatch(getUserDocs(nextProps.user.details.id));
    }
  }

  /**
   * clearSearch
   * @return {void}
   */
  clearSearch() {
    this.props.dispatch(clearSearch());
  }

  /**
   * handleCreateDoc
   * @param {object} values - values to create document with
   * @return {void}
   */
  handleCreateDoc(values) {
    const documentCount = this.props.docs.documents.results.length;
    const pageNum = this.props.docs.documents.paginationMeta.page;
    const userId = this.props.user.details.id;
    this.props.dispatch(createDoc(values, documentCount, pageNum, userId));
  }

  /**
   * handleClearEditDoc
   * @return {void}
   */
  handleClearEditDoc() {
    this.props.dispatch(clearEditDoc());
  }

  /**
   * handleEditDoc
   * @param {object} values - values to render dialog with
   * @return {void}
   */
  handleEditDoc(values) {
    this.props.dispatch(editDoc(values));
    browserHistory.push(`/app/edit/${values.id}`);
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
   * handleClearFolderError
   * @return {void}
   */
  handleClearFolderError() {
    this.props.dispatch(clearFolderError());
  }

  /**
   * handleDeleteDoc
   * @param {object} id - document id to delete
   * @return {void}
   */
  handleDeleteDoc(id) {
    this.props.dispatch(deleteDoc(id, false, true));
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
    const folderCount = this.props.folders.folders.results.length;
    const pageNum = this.props.folders.folders.paginationMeta.page;
    this.props.dispatch(createFolder(values, folderCount, pageNum));
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
   * handleNextPage
   * @param {number} page - page numbet to navigate to
   * @return {void}
   */
  handleNextPage(page) {
    this.props.dispatch(getUserFolders(8, 8 * (page - 1)));
    this.props.dispatch(getUserDocs(this.props.user.details.id, 10, 10 * (page - 1)));
  }

  /**
   * @return {object} react element to render
   */
  render() {
    return (
      <div>
        {
          (this.props.user.details) ?
            <div>
              {(this.props.search.results.users
                || this.props.search.results.docs) ?
                <Search
                  data={this.props.search.results}
                  clearSearch={this.clearSearch}/>
                :
                <DocumentsGrid
                  views={this.props.views}
                  docs={this.props.docs.documents || null}
                  folders={this.props.folders.folders || null}
                  onFolderCreate={this.handleCreateFolder}
                  onEditFolder={this.handleEditFolder}
                  toEditFolder={this.props.folders.editFolder}
                  clearEditFolder={this.handleClearEditFolder}
                  onFolderDelete={this.handleDeleteFolder}
                  onUpdateFolder={this.handleUpdateFolder}
                  openDeleteDialog={
                    this.props.folders.confirmDelete
                    || this.props.docs.confirmDelete
                 }
                  onConfirmFolderDelete={this.handleConfirmDeleteFolder}
                  onDocCreate={this.handleCreateDoc}
                  onDocDelete={this.handleDeleteDoc}
                  onConfirmDocDelete={this.handleConfirmDeleteDoc}
                  clearDeleteConfirmation={this.clearDeleteConfirmation}
                  onEditDoc={this.handleEditDoc}
                  toEdit={this.props.docs.editDoc}
                  clearEdit={this.handleClearEditDoc}
                  onUpdateDoc={this.handleUpdateDoc}
                  handleNextPage={this.handleNextPage}
                />
             }
             <Snackbar
              open={!!this.props.folders.error}
              message={this.props.folders.error || ''}
              onRequestClose={this.handleClearFolderError}
            />
           </div> : ''
        }
      </div>
    );
  }
}

export default Dashboard;
