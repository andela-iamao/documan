import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { FroalaEditor } from './reusable/Fraola.component.jsx';
import PageCenter from './reusable/PageCenter.component.jsx';
import { getDoc, updateDoc, clearEditDoc } from '../actions/document.action';
import { getActiveUser } from '../actions/users.action';

@connect(store => ({
  docs: store.documents,
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
    this.handleSelectChange = this.handleSelectChange.bind(this);
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
      this.props.dispatch(getActiveUser());
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
   * handleChange
   * @param {object} event - properties of element
   * @return {void}
   */
  handleChange(event) {
    event.persist();
    const value = event.target.value;
    this.setState({ title: value });
  }

  /**
   * handleSelectChange
   * @param {object} event - event properties of selected option
   * @param {number} index - index location of selected option
   * @param {string} value - current option from SelectField
   * @return {void}
   */
  handleSelectChange(event, index, value) {
    this.setState({ accessId: value });
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
  handleClose() { //eslint-disable-line
    browserHistory.goBack();
  }

  /**
   * render
   * @return {Object} react elements to render
   */
  render() {
    const state = this.state;
    return (
        <div>
          <div className="content-display edit-document-view">
            <div className="row">
              {(this.props.docs.doc) ?
                <div className="edit-document">
                  <div className="edit-title-access">
                    <form className="col s12">
                      <div className="row">
                        <div className="input-field col s8 m8">
                          <input
                            id="edit-title"
                            name="title"
                            type="text"
                            value={state.title}
                            onChange={event => this.handleChange(event)}
                          />
                        </div>
                        <div className="input-field col s4 m4">
                          <SelectField
                            floatingLabelText="Select Access Level"
                            value={state.accessId}
                            onChange={this.handleSelectChange}
                          >
                            <MenuItem value={1} primaryText="PUBLIC" />
                            <MenuItem value={2} primaryText="PRIVATE" />
                            <MenuItem value={3} primaryText="ROLE" />
                          </SelectField>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="editor-view">
                    <FroalaEditor
                      tag='textarea'
                      onModelChange={this.handleModelChange}
                      model={state.content} />
                  </div>
                  <div className="edit-actions">
                    <RaisedButton
                      className="dialog-actions"
                      label="Cancel"
                      secondary
                      onTouchTap={this.handleClose}
                    />
                    <RaisedButton
                      className="dialog-actions update-document"
                      label="Update Document"
                      primary
                      keyboardFocused
                      onTouchTap={this.handleUpdateDoc}
                    />
                  </div>
                </div>
                :
                <PageCenter>
                  <CircularProgress />
                  <h6>Loading document...</h6>
                </PageCenter>
              }
            </div>
          </div>
        </div>
    );
  }
}

export default EditDocument;
