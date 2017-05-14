import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { renderFromProp } from '../util/helper';


const customContentStyle = {
  width: '30%',
  maxWidth: 'none',
  textAlign: 'center'
};

/**
 * @class DeleteDialog
 *
 */
class DeleteDialog extends React.Component {

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { open: false };
  }

  /**
   * handleOpen - changes the state open of the Dialog from
   * false to true
   * @return {void}
   */
  handleOpen() {
    this.setState({ open: true });
  }

  /**
   * componentWillReceiveProps - before the next set of props is passed
   * to the component, it checks the delete confirmation action is calculated
   * and the current state is not open. It then opens the dialog
   * @param {object} nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.onDeleteConfirmation
      && typeof nextProps.onDeleteConfirmation.id
      && !this.state.open) {
      this.handleOpen();
    }
  }

  /**
   * handleClose - changes the state open of the dialog from true to
   * false. Then it calls the clearDeleteConfirmation props
   * @return {void}
   */
  handleClose() {
    this.setState({ open: false });
    this.props.clearDeleteConfirmation();
  }

  /**
   * handleSubmit - happens when the submit action is clicked
   * it checks if the deleteButton props is passed in or not,
   * then sends it with the neccessary argument
   * @return {void}
   */
  handleSubmit() {
    if (this.props.deleteButton) {
      this.props.onDelete(this.props.deleteButton.id);
    } else {
      this.props.onDelete(this.props.onDeleteConfirmation.id);
    }
    this.handleClose();
  }

  /**
   * render
   * @return {object} returns a react object
   */
  render() {
    const actions = [
      <RaisedButton
        className="dialog-actions"
        label="NO"
        primary
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        className="dialog-actions delete-btn"
        label="YES"
        secondary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];
    const icons = {
      folder: '/images/folder.png',
      document: '/images/file.png',
      user: '/images/person.png',
      admin: '/images/admin.png'
    };
    const icon = icons[renderFromProp(this.props.onDeleteConfirmation, 'type')];
    return (
      <div>
        {(this.props.deleteButton) ?
          <div className="delete-btn" onClick={this.props.openDialog}>
            <FloatingActionButton mini onTouchTap={this.props.openDialog}>
              <DeleteIcon />
            </FloatingActionButton>
          </div>
          :
          ''
        }
        <Dialog
          title={this.props.title || `Delete ${
            renderFromProp(this.props.onDeleteConfirmation, 'type')
          }`}
          contentStyle={customContentStyle}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={icon} className="dialog-icon" />
          <p>
            <b className="dialog-doc-title">
              {renderFromProp(this.props.onDeleteConfirmation, 'title')}
            </b>
          </p>
          <h5>
            {this.props.message ||
              <span>
                Are you sure you want to delete this
                {` ${renderFromProp(this.props.onDeleteConfirmation, 'type')}`}?
              </span>
            }
        </h5>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
