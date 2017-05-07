import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import EditFolder from '../EditFolder.component';
import DeleteDialog from '../DeleteDialog.component';
import DocCard from '../Document/DocCard.component.jsx';
import Search from '../Search/Search.component.jsx';
import Paginate from '../reusable/Paginate.component.jsx';
import {
  deleteDoc,
  editDoc,
  confirmDeleteDoc,
  clearConfirmDeleteDoc
} from '../../actions/document.action';
import {
  getFolder,
  removeFromFolder,
  getFolderDocs,
  editFolder,
  clearEditFolder,
  updateFolder,
  confirmDeleteFolder,
  clearConfirmDeleteFolder,
  deleteFolder
} from '../../actions/folder.action';
import { getActiveUser } from '../../actions/users.action';
import { changeSearchPage, clearSearch } from '../../actions/search.action';

@connect(store => ({
  user: store,
  form: store.form,
  error: store.error.error,
  auth: store.auth,
  docs: store.documents,
  folders: store.folder,
  search: store.search
}))
/**
 * React component for
 * @class Folder
 */
class Folder extends React.Component {

  /**
   * constructor
   * @param {object} props - properties of object
   */
  constructor(props) {
    super(props);
    this.handleEditFolder = this.handleEditFolder.bind(this);
    this.handleClearEditFolder = this.handleClearEditFolder.bind(this);
    this.handleUpdateFolder = this.handleUpdateFolder.bind(this);
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    this.handleEditDoc = this.handleEditDoc.bind(this);
    this.handleDeleteDoc = this.handleDeleteDoc.bind(this);
    this.handleConfirmDeleteDoc = this.handleConfirmDeleteDoc.bind(this);
    this.clearDeleteConfirmation = this.clearDeleteConfirmation.bind(this);
    this.handleConfirmDeleteFolder = this.handleConfirmDeleteFolder.bind(this);
    this.removeFromFolder = this.removeFromFolder.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.state = { page: 1 };
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
      this.props.dispatch(getFolder(this.props.params.id));
      this.props.dispatch(getFolderDocs(this.props.params.id));
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
   * handleClearEditFolder
   * @return {void}
   */
  handleClearEditFolder() {
    this.props.dispatch(clearEditFolder());
  }

  /**
   * removeFromFolder
   * @param {number} docId - id of document to remove
   * @return {void}
   */
  removeFromFolder(docId) {
    this.props.dispatch(removeFromFolder(docId, this.props.params.id));
  }

  /**
   * handleDeleteDoc
   * @param {object} id - document id to delete
   * @return {void}
   */
  handleDeleteDoc(id) {
    this.props.dispatch(deleteDoc(id, {
      action: getFolderDocs,
      id: this.props.params.id
    }, true));
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
  handleConfirmDeleteFolder() {
    const values = {
      id: this.props.params.id,
      title: this.props.folders.folder.title,
      type: 'folder'
    };
    this.props.dispatch(confirmDeleteFolder(values));
  }

  /**
   * getFolderDocs - map the documents array into jsx react element
   * @param {Array} documents
   * @return {Array} mapped array to be displayed
   */
  getFolderDocs(documents) {
    const self = this;
    return documents.map(doc => (
        <div
          className="col s4 m3 l2"
          key={`folder-root-div-${doc.title} ${doc.id}`}>
          <DocCard
            title={doc.title}
            id={doc.id}
            accessId={doc.accessId}
            content={doc.content}
            onDelete={self.handleConfirmDeleteDoc}
            onEdit={self.handleEditDoc}
            remove={self.removeFromFolder}
          />
      </div>));
  }

  /**
   * handleDeleteFolder
   * @param {object} id - id of folder to delete
   * @return {void}
   */
  handleDeleteFolder(id) {
    this.props.dispatch(deleteFolder(id));
    browserHistory.push('/app/dashboard');
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
   * handleEditFolder
   * @param {object} values - values to render dialog with
   * @return {void}
   */
  handleEditFolder() {
    const values = {
      id: this.props.folders.folder.id,
      title: this.props.folders.folder.title
    };
    this.props.dispatch(editFolder(values));
  }

  /**
   * handleUpdateFolder
   * @param {object} values - values to update folder with
   * @return {void}
   */
  handleUpdateFolder(values) {
    this.props.dispatch(updateFolder(values, 'single'));
  }

  /**
   * handlePageChange - set the state of the component to the
   * current value of the selected option and dispatch a page change
   * action
   * @param {object} event - properties of the select fields
   * @param {number} index - index number of selected option
   * @param {string} value - value of the selected option
   * @return {void}
   */
  handlePageChange(event, index, value) {
    this.props.dispatch(changeSearchPage(value));
  }

  /**
   * @return {object} react element to render
   */
  render() {
    const folders = this.props.folders;
    return (
      <div>
        {(this.props.search.results.users
          || this.props.search.results.docs) ?
            <Search
              data={this.props.search.results}
              searchPage={this.props.search.searchPage}
              clearSearch={this.clearSearch}
            />
          :
          <div className="content-display">
            <div className="row">
              {(folders.folder && folders.documents) ?
                  <div>
                    <EditFolder
                      openDialog={this.handleEditFolder}
                      editButton={folders.folder}
                      onEdit={this.handleUpdateFolder}
                      edit={folders.editFolder}
                      open={!!folders.editFolder}
                      onClose={this.handleClearEditFolder}
                    />
                    <DeleteDialog
                      openDialog={this.handleConfirmDeleteFolder}
                      deleteButton={folders.folder}
                      onDelete={this.handleDeleteFolder}
                      onDeleteConfirmation={folders.confirmDelete}
                      clearDeleteConfirmation={this.clearDeleteConfirmation}
                    />
                    <DeleteDialog
                      onDelete={this.handleDeleteDoc}
                      onDeleteConfirmation={this.props.docs.confirmDelete}
                      clearDeleteConfirmation={this.clearDeleteConfirmation}
                    />
                    <hr />
                    <div>
                      <div id="document-title">
                        <Link to="/app/dashboard">
                          <b>Dashboard </b>
                        </Link>
                        >
                        <b>
                          <i>{folders.folder.title}</i>
                        </b>
                      </div>
                      <div>
                        {this.getFolderDocs(folders.documents.results)}
                      </div>
                    </div>
                    <Paginate
                      pageCount={folders.documents.paginationMeta.page_count}
                      page={this.state.page}
                      handlePageChange={this.handlePageChange}
                    />
                  </div>
                :
                  <div className="circular-loading">
                    <CircularProgress />
                    <h6>Loading folder</h6>
                  </div>
                }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Folder;
