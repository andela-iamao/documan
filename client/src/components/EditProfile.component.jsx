import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Alert from './reusable/Alert.component.jsx';

import { getActiveUser, updateUser, clearError } from '../actions/users.action';

@connect(store => ({
  user: store.users,
  form: store.form,
  error: store.error.error,
  auth: store.auth,
  docs: store.documents,
  folder: store.folder
}))
 /**
  * @class EditProfile
  *
  */
class EditProfile extends React.Component {

  /**
   * constructor
   * @param {object} props - object properties of component
   */
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onCloseAlert = this.onCloseAlert.bind(this);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirm_password: '',
      error: null
    };
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
    }
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps - next props the component will recieve before
   * it re-renders
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.details) {
      this.setState({
        username: nextProps.user.details.username,
        firstname: nextProps.user.details.firstname,
        lastname: nextProps.user.details.lastname
      });
    }
  }

  /**
   * handleInputChange
   * @param {object} event - event properties of selected element
   * @return {void}
   */
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * validate
   * @param {object} values - object of fields to validate
   * @return {void}
   */
  validate(values) {
    if (values.username.length < 5) {
      this.setState({ error: 'Username cannot be less than 5' });
      return false;
    } else if (values.password.length < 8 && !values.password.length < 1) {
      this.setState({ error: 'Password cannot be less than 8' });
      return false;
    } else if (values.password !== values.confirm_password
    && !values.password.length < 1) {
      this.setState({ error: 'Passwords do not match' });
      return false;
    }
    return true;
  }

  /**
   * handleUpdate
   * @return {void}
   */
  handleUpdate() {
    const values = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password,
      confirm_password: this.confirm_password
    };
    if (this.validate(values)) {
      delete values.confirm_password;
      if (values.password.length < 1) {
        delete values.password;
      }
      this.props.dispatch(updateUser(
        this.props.user.details.id, values));
      this.props.dispatch(clearError());
      browserHistory.push('/app/dashboard');
    }
  }

  /**
   * onCloseAlert
   * @return {void}
   */
  onCloseAlert() {
    this.setState({ error: null });
    this.props.dispatch(clearError());
  }

  /**
   * render
   * @return {object} react element to render
   */
  render() {
    return (
      <div>
        <div className="content-display">
            <div className="z-depth-2" id="edit-form-title">
              {(this.state.error || this.props.user.error) ?
                <Alert
                  info={{ error: this.state.error || this.props.user.error }}
                  onClose={this.onCloseAlert}
                />
                :
                ''
              }
              <h5>EDIT INFORMATION</h5>
              {(this.props.user.details) ?
                <div id="edit-form">
                  <div className="row">
                    <div className="input-field col s12 m6 l6">
                      <input
                        className="validate"
                        name="firstname"
                        type="text"
                        value={this.state.firstname}
                        onChange={event => this.handleInputChange(event)}
                      />
                      <label>Firstname</label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <input
                        className="validate"
                        name="lastname"
                        type="text"
                        value={this.state.lastname}
                        onChange={event => this.handleInputChange(event)}
                      />
                      <label>Lastname</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m6 l6">
                      <input
                        className="validate"
                        name="email"
                        type="text"
                        value={this.props.user.details.email}
                        disabled
                      />
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <input
                        className="validate"
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={event => this.handleInputChange(event)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m6 l6">
                      <input
                        className="validate"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={event => this.handleInputChange(event)}
                      />
                      <label>Change your password</label>
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <input
                        className="validate"
                        name="confirm_password"
                        type="password"
                        value={this.state.confirm_password}
                        onChange={event => this.handleInputChange(event)}
                      />
                      <label>Confirm password</label>
                    </div>
                  </div>
                </div>
                :
                ''
              }
              <RaisedButton
                label="Update Info"
                primary
                keyboardFocused
                onTouchTap={this.handleUpdate}
              />
            </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
