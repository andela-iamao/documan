import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Edit from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { FroalaEditorView } from './reusable/Fraola.component.jsx';
import FolderDialog from './FolderDialog.component.jsx';
import DeleteDialog from './DeleteDialog.component.jsx';
import {
  getDoc,
  createDoc,
  deleteDoc,
  editDoc,
  confirmDeleteDoc,
  clearConfirmDeleteDoc
} from '../actions/document.action';
import { addDoc, getUserFolders } from '../actions/folder.action';
import { getActiveUser } from '../actions/users.action';

@connect(store =>
  ({
    docs: store.documents,
    folders: store.folder,
    user: store.users
  }))
/**
 * React component for
 * @class User
 */
class Document extends React.Component {

  /**
   * constructor
   * @param {object} props - object properties of component
   */
  constructor(props) {
    super(props);
    this.handleAddDoc = this.handleAddDoc.bind(this);
    this.handleEditDoc = this.handleEditDoc.bind(this);
    this.handleGetUsersFolders = this.handleGetUsersFolders.bind(this);
    this.handleDeleteDoc = this.handleDeleteDoc.bind(this);
    this.handleConfirmDeleteDoc = this.handleConfirmDeleteDoc.bind(this);
    this.clearDeleteConfirmation = this.clearDeleteConfirmation.bind(this);
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
      this.props.dispatch(getDoc(this.props.params.id));
      this.props.dispatch(getUserFolders(100, 0));
    }
  }

  /**
   * handleGetUsersFolders
   * @return {void}
   */
  handleGetUsersFolders() {
    this.props.dispatch(getUserFolders());
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
   * handleDeleteDoc
   * @param {object} id - document id to delete
   * @return {void}
   */
  handleDeleteDoc(id) {
    this.props.dispatch(deleteDoc(id, false, true));
    browserHistory.push('/app/dashboard');
  }

  /**
   * handleConfirmDeleteDoc
   * @param {object} id - id of document to delete
   * @return {void}
   */
  handleConfirmDeleteDoc() {
    const values = {
      id: this.props.params.id,
      title: this.props.docs.doc.title,
      type: 'document'
    };
    this.props.dispatch(confirmDeleteDoc(values));
  }

  /**
   * clearDeleteConfirmation
   * @return {void}
   */
  clearDeleteConfirmation() {
    this.props.dispatch(clearConfirmDeleteDoc());
  }

  /**
   * handleEditDoc
   * @return {void}
   */
  handleEditDoc() {
    this.props.dispatch(editDoc({
      id: this.props.docs.doc.id,
      title: this.props.docs.doc.title,
      content: this.props.docs.doc.content
    }));
    browserHistory.push(`/app/edit/${this.props.docs.doc.id}`);
  }

  /**
   * handleAddDoc
   * @param {number} folderId - id of folder to add document to
   * @return {void}
   */
  handleAddDoc(folderId) {
    this.props.dispatch(addDoc(folderId, { id: this.props.docs.doc.id }));
    browserHistory.push(`/app/folder/${folderId}`);
  }

  /**
   * @return {object} react element to render
   */
  render() {
    const documents = this.props.docs;
    return (
      <div className="grey-bg document">
          <div className="content-display">
            <div className="row">
              {(documents.doc && this.props.folders.folders) ?
                <div className="view-documents">
                  {(documents.doc.ownerId === this.props.user.details.id) ?
                    <div className="toolbar">
                      <FolderDialog
                        folders={this.props.folders.folders.results}
                        onAddDoc={this.handleAddDoc}
                      />
                      <div className="col s3 m3 l1 edit-document">
                        <FloatingActionButton
                          mini
                          onTouchTap={() => this.handleEditDoc()}
                        >
                          <Edit />
                        </FloatingActionButton>
                      </div>
                      <div className="col s3 m3 l1 del-document">
                        <FloatingActionButton
                          mini
                          onTouchTap={this.handleConfirmDeleteDoc}>
                          <DeleteIcon />
                        </FloatingActionButton>
                      </div>
                      <div className="clear">
                        <DeleteDialog
                          onDelete={this.handleDeleteDoc}
                          openDialog={this.handleConfirmDeleteDoc}
                          onDeleteConfirmation={documents.confirmDelete}
                          clearDeleteConfirmation={this.clearDeleteConfirmation}
                        />
                      </div>
                      <hr />
                    </div>
                    :
                    ''
                  }
                  <div className="document-page z-depth-2">
                    <div className="document-title">
                      <h5>{documents.doc.title}</h5>
                    </div>
                    <div className="document-content">
                      <FroalaEditorView model={documents.doc.content} />
                    </div>
                  </div>
                </div>
                :
                ''
              }
            </div>
          </div>
      </div>
    );
  }
}

export default Document;
