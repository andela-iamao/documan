import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import Navbar from './reusable/Navbar.component';
import Paginate from './reusable/Paginate.component';
import CustomDrawer from './CustomDrawer.component';
import DeleteDialog from './DeleteDialog.component';
import {
  getActiveUser,
  getAllUsers,
  updateUser,
  deleteUser,
  confirmDeleteUser,
  clearConfirmDeleteUser,
  confirmPromotion,
  clearConfirmPromotion
} from '../actions/users.action';
import { getAllDocs, deleteDoc, clearConfirmDeleteDoc, confirmDeleteDoc } from '../actions/document.action';
import getUserInfo from '../util/getUserInfo';
import paginate from '../util/paginate';

@connect(store => ({
  user: store.users,
  form: store.form,
  error: store.error.error,
  auth: store.auth,
  docs: store.documents,
  folder: store.folder,
  views: store.views
}))
/**
*
* Compoent to diplay and manage users
* @class ManageUser
*/
class ManageUser extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserPageChange = this.handleUserPageChange.bind(this);
    this.handleConfirmDeleteDoc = this.handleConfirmDeleteDoc.bind(this);
    this.clearDeleteConfirmation = this.clearDeleteConfirmation.bind(this);
    this.handleDeleteDoc = this.handleDeleteDoc.bind(this);
    this.clearDeleteUserConfirmation = this.clearDeleteUserConfirmation.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleConfirmDeleteUser = this.handleConfirmDeleteUser.bind(this);
    this.handleDocPageChange= this.handleDocPageChange.bind(this);
    this.confirmPromotion = this.confirmPromotion.bind(this);
    this.clearConfirmPromotion = this.clearConfirmPromotion.bind(this);
    this.handlePromoteUser = this.handlePromoteUser.bind(this);
    this.state = { value: 'users', user_page: 1, doc_page: 1 };
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
      this.props.dispatch(getAllUsers(7, 0));
      this.props.dispatch(getAllDocs(7, 0));
    }
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps - next properties the component will recieve
   * before render
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.details) {
      if (nextProps.user.details.roleId
        && nextProps.user.details['Role.title'] !== 'admin') {
        browserHistory.push('/app/dashboard');
      }
    }
  }

  handlePromoteUser(id) {
    this.props.dispatch(updateUser(id, { roleId: 1 }));
  }

  handleDeleteUser(id) {
    this.props.dispatch(deleteUser(id));
  }

  handleChange(value) {
    this.setState({ value });
  }

   /**
    * handleConfirmDeleteUser - send an action to confirm user delete
    * @param {Object} values - information to pass to the delete dialog
    */
   handleConfirmDeleteUser(values) {
     this.props.dispatch(confirmDeleteUser(values));
   }

   /**
    * clearDeleteUserConfirmation
    * @return {void}
    */
   clearDeleteUserConfirmation() {
     this.props.dispatch(clearConfirmDeleteUser());
   }

  /**
   * handleConfirmDeleteDoc
   * @param {object} values - object to render confirmation dialog with
   * @return {void}
   */
  handleConfirmDeleteDoc(values) {
    this.props.dispatch(confirmDeleteDoc({
      id: values.id,
      title: values.title,
      type: 'document'
    }));
  }

  /**
   * clearDeleteConfirmation
   * @return {void}
   */
  clearDeleteConfirmation() {
    this.props.dispatch(clearConfirmDeleteDoc());
  }

  /**
   * handleDeleteDoc
   * @param {object} id - document id to delete
   * @return {void}
   */
  handleDeleteDoc(id) {
    this.props.dispatch(deleteDoc(id));
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
  handleUserPageChange(event, index, value) {
    this.setState({ user_page: value });
    const offset = 7 * (value - 1);
    this.props.dispatch(getAllUsers(7, offset));
  }

  /**
   * handleDocPageChange - set the state of the component to the
   * current value of the selected option and dispatch a page change
   * action
   * @param {object} event - properties of the select fields
   * @param {number} index - index number of selected option
   * @param {string} value - value of the selected option
   * @return {void}
   */
  handleDocPageChange(event, index, value) {
    this.setState({ doc_page: value });
    const offset = 7 * (value - 1);
    this.props.dispatch(getAllDocs(7, offset));
  }

  /**
   * confirmPromotion
   * @param {Object} values - information to render promotion
   * dialog with
   * @return {void}
   */
  confirmPromotion(values) {
    this.props.dispatch(confirmPromotion(values));
  }

  /**
   * clearConfirmPromotion
   * @return {void}
   */
  clearConfirmPromotion() {
    this.props.dispatch(clearConfirmPromotion());
  }

  renderTable(users) {
    const self = this;
    return users.users.results.map((user, index) => (
      <TableRow key={`${index}tablerow-user`}>
        <TableRowColumn>
          {user.id}
        </TableRowColumn>
        <TableRowColumn>
          {user.firstname}
        </TableRowColumn>
        <TableRowColumn>
          {user.lastname}
        </TableRowColumn>
        <TableRowColumn>
          {user.username}
        </TableRowColumn>
        <TableRowColumn>{
          (user.roleId === 1) ?
            'Admin' :
            <FlatButton
              label="Promote"
              primary
              onTouchTap={() => self.confirmPromotion({
                id:user.id,
                title: user.username,
                type: 'admin'
              })}
            />
          }
        </TableRowColumn>
        <TableRowColumn key={index + user.id + user.firstname}>
          {user.email}</TableRowColumn>
        <TableRowColumn key={index + user.id + user.firstname}>{
          (user.roleId === 1) ?
            '' :
            <FlatButton
              key={`${index}flat${user.id}`}
              label="Delete"
              secondary
              onTouchTap={() => self.handleConfirmDeleteUser({
                id: user.id,
                title: user.username,
                type: 'user'
              })}
            />
          }
        </TableRowColumn>
      </TableRow>
    ));
  }

  renderDocuments(docs) {
    const self = this;
    const accessLevels = {
      1: 'Public',
      2: 'Private',
      3: 'Role'
    };
    return docs.results.map((doc, index) => (
      <TableRow key={`${doc.id}${doc.title}`}>
        <TableRowColumn>
          {doc.id}
        </TableRowColumn>
        <TableRowColumn>
          {doc.title}
        </TableRowColumn>
        <TableRowColumn>
          <FlatButton
            key={`${index}flat-view${doc.id}`}
            primary
            onTouchTap={() => browserHistory.push(`/app/document/${doc.id}`)}
            label="View"
          />
        </TableRowColumn>
        <TableRowColumn>
          {accessLevels[doc.accessId]}
        </TableRowColumn>
        <TableRowColumn>
          {doc.User.username}
        </TableRowColumn>
        <TableRowColumn>
          {(doc.User.roleId === 1
              && doc.ownerId !== doc.User.id) ?
            ''
            :
            <FlatButton
              key={`${index}flat${doc.id}`}
              label="Delete"
              secondary
              onTouchTap={() => self.handleConfirmDeleteDoc({
                id: doc.id,
                title: doc.title
              })}
            />
          }
        </TableRowColumn>
      </TableRow>
    ));
  }

  /**
   * render
   * @return {object} react elements to render
   */
  render() {
    const users = this.props.user.users;
    const allDocuments = this.props.docs.allDocuments;
    return (
      <div>
        <DeleteDialog
          onDelete={this.handleDeleteUser}
          openDialog={this.handleConfirmDeleteUser}
          onDeleteConfirmation={this.props.user.confirmDelete}
          clearDeleteConfirmation={this.clearDeleteUserConfirmation}
        />
        <DeleteDialog
          onDelete={this.handleDeleteDoc}
          openDialog={this.handleConfirmDeleteDoc}
          onDeleteConfirmation={this.props.docs.confirmDelete}
          clearDeleteConfirmation={this.clearDeleteConfirmation}
        />
        <DeleteDialog
          title="Promote User"
          onDelete={this.handlePromoteUser}
          openDialog={this.confirmPromotion}
          onDeleteConfirmation={this.props.user.promotion}
          clearDeleteConfirmation={this.clearConfirmPromotion}
          message="Are you sure you want to promote this user?"
        />
        {(this.props.user.users && this.props.docs.allDocuments) ?
          <div>
            <div className="content-display users-table">
              <Tabs value={this.state.value} onChange={this.handleChange}>
                <Tab label="Manage Users" value="users">
                  <div>
                    <Table selectable={false}>
                      <TableHeader displayRowCheckbox={false}>
                        <TableRow>
                          <TableHeaderColumn>ID</TableHeaderColumn>
                          <TableHeaderColumn>First Name</TableHeaderColumn>
                          <TableHeaderColumn>Last Name</TableHeaderColumn>
                          <TableHeaderColumn>Username</TableHeaderColumn>
                          <TableHeaderColumn>Role</TableHeaderColumn>
                          <TableHeaderColumn>Email</TableHeaderColumn>
                          <TableHeaderColumn>Delete</TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody displayRowCheckbox={false}>
                        {this.renderTable(users)}
                      </TableBody>
                    </Table>
                    <div style={{
                      display: (this.state.value === 'users') ?
                          'block': 'none'
                      }}>
                      <Paginate
                        pageCount={users.users.paginationMeta.page_count}
                        page={this.state.user_page}
                        handlePageChange={this.handleUserPageChange}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab label="Manage Documents" value="docs">
                  <Table selectable={false}>
                    <TableHeader displayRowCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Content</TableHeaderColumn>
                        <TableHeaderColumn>Access Level</TableHeaderColumn>
                        <TableHeaderColumn>Author</TableHeaderColumn>
                        <TableHeaderColumn>Delete</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {this.renderDocuments(this.props.docs.allDocuments)}
                    </TableBody>
                  </Table>
                  <div style={{
                    display: (this.state.value === 'docs') ?
                        'block': 'none'
                    }}>
                    <Paginate
                      pageCount={allDocuments.paginationMeta.page_count}
                      page={this.state.doc_page}
                      handlePageChange={this.handleDocPageChange}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          :
          ''
        }
      </div>
    );
  }
}

export default ManageUser;
