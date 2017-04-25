import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Navbar from './reusable/Navbar.component';
import { FroalaEditor } from './reusable/Fraola.component';
import CustomDrawer from './CustomDrawer.component';
import {
  getDoc,
  createDoc,
  deleteDoc,
  updateDoc,
  clearEditDoc,
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
class EditDocument extends React.Component {

  /**
   * constructor
   * @param {object} props - object properties of component
   */
  constructor(props) {
    super(props);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateDoc = this.handleUpdateDoc.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      title: '',
      content: '',
      accessId: ''
    };
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps - next props the component will recieve before
   * it re-renders
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.docs.doc) {
      this.setState({
        title: nextProps.docs.doc.title,
        content: nextProps.docs.doc.content,
        accessId: nextProps.docs.doc.accessId
      });
    }
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/app/login');
    } else if (!this.props.docs.editDoc) {
      browserHistory.push('/app/dashboard');
    } else {
      this.props.dispatch(getUser());
      this.props.dispatch(getDoc(this.props.params.id));
    }
  }

  /**
   * handleUpdateDoc
   * @param {object} values - values to update document with
   * @return {void}
   */
  handleUpdateDoc() {
    this.props.dispatch(updateDoc({
      ...this.state,
      id: this.props.docs.doc.id }, false));
    this.props.dispatch(clearEditDoc());
    browserHistory.push(`/app/document/${this.props.docs.doc.id}`);
  }

  /**
   * handleModelChange
   * @param {string} value - current values in text field
   * @return {void}
   */
  handleModelChange(value) {
    this.setState({ content: value });
  }

  /**
   * handleSubmit
   * @return {void}
   */
  handleSubmit() {
    const values = { ...this.state };
    this.props.onSubmit(values);
    browserHistory.goBack();
  }

  /**
   * handleClose
   * @return {void}
   */
  handleClose() {
    browserHistory.goBack();
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
        <CustomDrawer
          title="iAmDocuman"
          username={ this.props.user.users.details.username }
          fullname={
            `${this.props.user.users.details.firstname}
             ${this.props.user.users.details.lastname}`}
        />
          <div className="content-display">
            <div className="row">
              {
                (this.props.docs.doc) ?
                <div>
                  <div>
                    <div id="document-title">
                      <h5>{ this.state.title}</h5>
                    </div>
                    <div id="document-content">
                      <FroalaEditor
                        onModelChange={ this.handleModelChange }
                        model={ this.state.content } />
                    </div>
                    <div className="editor-actions">
                    <FlatButton
                      label="Cancel"
                      primary={ true }
                      onTouchTap={ this.handleClose }
                    />
                    <FlatButton
                      label="Update Document"
                      primary={ true }
                      keyboardFocused={ true }
                      onTouchTap={ this.handleUpdateDoc }
                    />
                    </div>
                  </div>
                </div>
                :
                <div className="circular-loading">
                  <CircularProgress />
                  <h6>Loading document</h6>
                </div>
              }
            </div>
          </div>
      </div>
    );
  }
}

export default EditDocument;
