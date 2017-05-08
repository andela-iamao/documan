import React from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Edit from 'material-ui/svg-icons/image/edit';
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
  width: '30%',
  maxWidth: 'none',
  textAlign: 'center'
};

/**
 * @class EditFolder
 *
 */
class EditFolder extends React.Component {

  /**
   * constructor
   * @param {object} props - props belonging to component
   */
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { open: false, folderName: '' };
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
        this.handleOpen(nextProps.edit.title);
      }
    }
  }

  /**
   * handleOpen
   * @param {string} title - previous folder name
   * @return {void}
   */
  handleOpen(title) {
    this.setState({ open: true, folderName: title });
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
   * @param {object} event - properties of target element
   * @return {void}
   */
  handleSubmit(event) {
    event.persist();
    event.preventDefault();
    this.props.onEdit({
      id: this.props.edit.id,
      title: this.state.folderName
    });
    this.handleClose();
  }

  /**
   * handleChange
   * @param {object} event - properties of target element
   * @return {void}
   */
  handleChange(event) {
    const value = event.target.value;
    this.setState({ folderName: value });
  }

  /**
   * render
   * @return {object} react element to render
   */
  render() {
    const actions = [
      <RaisedButton className="dialog-actions" label="Cancel" secondary onTouchTap={this.handleClose} />,
      <RaisedButton
        className="dialog-actions"
        label="Rename Folder"
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];

    const props = this.props;

    return (
      <div className="col s3 m3 l1">
        {(this.props.editButton) ?
            <FloatingActionButton mini onTouchTap={
              () => props.openDialog(props.edit.title)}>
              <Edit />
            </FloatingActionButton>
            :
            ''
        }
        <Dialog
          title="Rename Folder"
          contentStyle={customContentStyle}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src="/images/folder.png" style={{ width: '35%' }} />
          <h6>{this.props.edit.title}</h6>
          <form onSubmit={event => this.handleSubmit(event)}>
            <input
              type="text"
              name="title"
              placeholder={this.state.folderName}
              onChange={this.handleChange}
            />
            <label>Enter folder name</label>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default EditFolder;
