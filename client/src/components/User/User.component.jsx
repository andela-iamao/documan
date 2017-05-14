import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import PageCenter from '../reusable/PageCenter.component.jsx';
import DocCard from '../Document/DocCard.component.jsx';
import Paginate from '../reusable/Paginate.component.jsx';
import { getActiveUser, getUser } from '../../actions/users.action';
import { getUserDocs } from '../../actions/document.action';


@connect(store => ({
  user: store.users,
  document: store.documents.documents
}))
 /**
  * @class User
  */
class User extends React.Component {

  /**
   * constructor
   * @param {Object} props - properties of the component
   */
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = { page: 1 };
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    this.props.dispatch(getActiveUser());
    this.props.dispatch(getUserDocs(this.props.params.id, 18));
    this.props.dispatch(getUser(this.props.params.id));
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
    const offset = 18 * (value - 1);
    this.props.dispatch(getUserDocs(this.props.params.id, 18, offset));
  }

  /**
   * renderDocs
   * @param {Array} documents - documents data retrieved from endpoint
   * @return {Array} mapped documents
   */
  renderDocs(documents) {
    const self = this;
    let count = 0;
    return documents.results.map((document, index) => (
      <div className="col s4 m3 l2" key={`root-div-${document.id}`}>
        <DocCard
          title={document.title}
          id={document.id}
          accessId={document.accessId}
          content={document.content}
          showActions={false}
        />
      </div>
        : ''
    ));
  }

  /**
   * render
   * @return {Object} - react elements to render
   */
  render() {
    const users = this.props.user;
    const documents = this.props.document;
    return (
      <div className="content-display">
        <div className="row">
          {(users.details && users.user && documents ) ?
            <div>
              <div className="basic-uinfo">
                <img
                  className="basic-uinfo-icon"
                  src={(users.user.Role.title === 'admin') ?
                    '/images/admin.png' : '/images/person.png'
                  } />
                <span className="basic-uinfo-text">
                  <b>{users.user.firstname} {users.user.lastname}</b>
                  <i>{users.user.username}</i>
                </span>
              </div>
              <hr />
              <div>
                {this.renderDocs(documents)}
              </div>
              <Paginate
                pageCount={documents.paginationMeta.page_count}
                page={this.state.page}
                handlePageChange={this.handlePageChange}
              />
            </div>
            :
            <PageCenter>
              <CircularProgress />
            </PageCenter>
          }
        </div>
      </div>
    );
  }
}

export default User;
