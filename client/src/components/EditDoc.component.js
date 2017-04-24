import React from 'react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Fraola from './reusable/Fraola.component';


const customContentStyle = {
  width: '70%',
  maxWidth: 'none',
  marginTop: 20,
  textAlign: 'center'
};

/**
 * @class EditDoc
 */
class EditDoc extends React.Component {

  /**
   * constructor
   * @param {object} props - props belonging to component
   */
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.state = {
      open: this.props.open,
      title: '',
      content: '',
      accessId: 1
    };
  }


  /**
   * handleOpen
   * @param {object} props - default values of input fields
   * @return {void}
   */
  handleOpen(props) {
    this.setState({
      open: true,
      title: props.edit.title,
      content: props.edit.content,
      accessId: props.edit.accessId
    });
  }

  /**
   * handleClose
   * @return {void}
   */
  handleClose() {
    this.setState({ open: false });
    this.props.onClose();
  }

  /**
   * handleSubmit
   * @param {object} event - object of target element
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    const values = { ...this.state };
    delete values.open;
    values.id = this.props.edit.id;
    this.props.onEdit(values);
    this.handleClose();
  }

  /**
   * handleChange
   * @param {object} event - object of target element
   * @return {void}
   */
  handleChange(event) {
    const value = event.target.value;
    // const {newFieldValue} = { ...this.state }[field]
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
   * handleContentChange
   * @param {object} content - current content of fraola text editor
   * @return {void}
   */
  handleContentChange(content) {
    this.setState({ content });
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps - Next sets of props to be
   * passed into the component
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      if (nextProps.open) {
        this.handleOpen(nextProps);
      } else {
        this.handleClose();
      }
    }
  }

  /**
   * render
   *  @return {object} react element to render
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Update Document"
        primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this.handleSubmit }
      />,
    ];

    return (
      <div>
        <Dialog
          title="Edit Document"
          contentStyle={ customContentStyle }
          actions={
            actions
          }
          modal={false}
          open={this.state.open}
          onRequestClose={ this.handleClose }
          autoScrollBodyContent={true}
          bodyClassName="create-doc"
        >
        <div className="row container">
          <div className="input-field col s6 m6 l6">
            <label>Document Title</label>
            <input
              type="text"
              name="title"
              value={ this.state.title }
              onChange={
                event => this.handleChange(event)
              }
            />
          </div>
          <div className="input-field col l6 m6 s5">
            <SelectField
              floatingLabelText="Select Access Level"
              value={this.state.accessId}
              onChange={this.handleSelectChange}
            >
              <MenuItem value={1} primaryText="PUBLIC" />
              <MenuItem value={2} primaryText="PRIVATE" />
            </SelectField>
          </div>
        </div>
          <Fraola
            tag='textarea'
            model={ this.state.content }
            onModelChange={ this.handleContentChange }
          />
        </Dialog>
      </div>
    );
  }
}

export default EditDoc;
