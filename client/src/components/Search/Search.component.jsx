import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DocCard from '../Document/DocCard.component.jsx';
import UserCard from '../UserCard.component.jsx';
import { changeSearchPage } from '../../actions/search.action';

 /**
  * @class Search
  *
  */
class Search extends React.Component {

  /**
   * constructor
   * @param {object} props - properties of the component
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = { show: 'all' };
  }

  /**
   * renderUserSearch
   * @param {Object} users - object containing information about users
   * for rendering
   * @return {Array} mapped
   */
  renderUserSearch(users) {
    return users.users.results.map(user => (
      <div className="col s4 m3 l2" key={`${user.username}${user.id}`}>
        <UserCard title={user.username} id={user.id} />
      </div>
    ));
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  handleChange(event, index, value) {
    this.setState({ show: value });
  }

  handlePageChange(event, index, value) {
    this.props.dispatch(changeSearchPage(value));
  }

  renderDocSearch(docs) {
    return docs.documents.results.map(document => (
      <div className="col s4 m3 l2" key={`${document.title} ${document.id}`}>
        <DocCard
          title={document.title}
          id={document.id}
          accessId={document.accessId}
          content={document.content}
          showActions={false}
        />
      </div>
    ));
  }

  render() {
    const documents = this.props.data.docs;
    const users = this.props.data.users;
    return (
      <div className="content-display search-view">
        <div className="input-field col l6 m6 s6">
          <SelectField
            floatingLabelText="Select Access Level"
            value={this.state.show}
            onChange={this.handleChange}
          >
            <MenuItem value="all" primaryText="ALL" />
            <MenuItem value="users" primaryText="USERS" />
            <MenuItem value="documents" primaryText="DOCUMENTS" />
          </SelectField>
        </div>
        <hr />
        <div className="row">
        {(users && (this.state.show === 'all' || this.state.show === 'users')) ?
          this.renderUserSearch(users) : ''
        }
        {(documents
          && (this.state.show === 'all' || this.state.show === 'documents')) ?
            this.renderDocSearch(documents)
            : ''
        }
        </div>
      </div>
    );
  }
}

export default Search;
