import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PageCenter from '../reusable/PageCenter.component';
import DocCard from '../DocCard.component';
import { getAllDocs } from '../../actions/document.action';
import { clearSearch } from '../../actions/search.action';

@connect(store => ({
  docs: store.documents,
  search: store.search
}))
class PublicDocuments extends React.Component {

  /**
   * constructor
   * @param {object} props - objects belonging to the component
   */
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.state = { page: 1 };
  }

  /**
   * componentDidMount - just after the component renders, it will
   * dispatch an action to get all documents from the server
   * @return {void}
   */
  componentDidMount() {
    this.getDocuments();
  }

  /**
   * paginate - render a pagination system based on the
   * number of pages
   * @param {number} pageCount - total number of pages
   * @return {array} paginated - array jsx element to render
   */
  paginate(pageCount) {
    const paginated = [];
    for (let count = 0; count < pageCount; count += 1) {
      paginated.push(
        <MenuItem
          value={count + 1}
          primaryText={`Page ${count + 1}`}
          key={`Page${count + 1}`}/>
      );
    }
    return paginated;
  }


 /**
  * getDocuments - sends a dispatch action to fetch all documents.
  * @param {number} limit - number of documents to fetch
  * @param {number} offset - document number to start from
  * @return {void}
  */
  getDocuments(limit = 18, offset = 0) {
    this.props.dispatch(getAllDocs(limit, offset));
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
    this.setState({ page: value });
    const offset = 18 * (value - 1);
    this.getDocuments(18, offset);
  }

  /**
   * renderDocuments - this maps the arrat of all documents that was fetched
   * and passes essential data from them to the DocCard component
   * @param {Array} documents - documents information to maps
   * @return {Array} mapped document
   */
  renderDocuments(documents) {
    return documents.map(document => (
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

  /**
   * clearSearch
   * @return {void}
   */
  clearSearch() {
    this.props.dispatch(clearSearch());
  }

  /**
   * render
   * @return {object} - react components to render
   */
  render() {
    return (
      <div>
        <div className="content-display">
          <div className="row">
            {(this.props.docs.allDocuments) ?
                <div>
                  {this.renderDocuments(this.props.docs.allDocuments.results)}
                  <div className="pagination">
                    <DropDownMenu
                      value={this.state.page}
                      onChange={this.handlePageChange}
                    >
                    {(this.props.docs) ?
                      this.paginate(
                        this.props.docs.allDocuments.paginationMeta.page_count)
                        : ''}
                    </DropDownMenu>
                  </div>
                </div>
                :
                <PageCenter>
                  <CircularProgress />
                </PageCenter>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PublicDocuments;
