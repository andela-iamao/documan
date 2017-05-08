import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DocCard from './Document/DocCard.component.jsx';
import FolderCard from './FolderCard.component.jsx';
import CreateFolder from './Folder/CreateFolder.component.jsx';
import CreateDoc from './Document/CreateDoc.component.jsx';
import EditFolder from './EditFolder.component.jsx';
import DeleteDialog from './DeleteDialog.component.jsx';
import { renderFromProp } from '../util/helper';

/**
 * React component for
 * @class DocumentGrid
 */
class DocumentGrid extends React.Component {

  /**
   * constructor
   * @param {object} props - props belonging to component
   */
  constructor(props) {
    super(props);
    this.renderDocs = this.renderDocs.bind(this);
    this.renderFolders = this.renderFolders.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = { page: 1 };
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
    this.props.handleNextPage(value);
  }

  /**
   * paginate
   * @param {number} pageCount - number of pages
   * @return {array} array of menu items
   */
  paginate(pageCount) {//eslint-disable-line
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
   * renderFolders
   * @param {Array} folders - folders data retrieved from endpoint
   * @return {Array} mapped folders
   */
  renderFolders(folders) {
    const self = this;
    return folders.results.map((folder, index) =>
      (
        <div className="col s4 m3 l2" key={`root-div-${folder.title} ${index}`}>
          <FolderCard
            title={folder.title}
            key={folder.title + index}
            id={folder.id}
            onDelete={self.props.onConfirmFolderDelete}
            onEdit={self.props.onEditFolder}
            />
        </div>));
  }

  /**
   * renderDocs
   * @param {Array} documents - documents data retrieved from endpoint
   * @return {Array} mapped documents
   */
  renderDocs(documents) {
    const self = this;
    return documents.results.map((doc, index) => (
      (doc.folderId === null || self.props.showOnlyDoc) ?
        <div className="col s4 m3 l2" key={`root-div-${doc.title} ${index}`}>
          <DocCard
            title={doc.title}
            key={doc.title + index}
            id={doc.id}
            accessId={doc.accessId}
            content={doc.content}
            onDelete={self.props.onConfirmDocDelete}
            onEdit={self.props.onEditDoc}
            />
        </div>
        : ''
    ));
  }

  /**
   * render
   * @return {object} react element to render
   */
  render() {
    const pageCount = (this.props.docs && this.props.folders) ? Math.max(
      this.props.docs.paginationMeta.page_count,
      this.props.folders.paginationMeta.page_count
    ) : 0;
    return (
      <div className="content-display">
        <div className="row">
          <CreateFolder onCreate={this.props.onFolderCreate} />
          <CreateDoc
            onCreate={this.props.onDocCreate}
          />
        </div>
        <EditFolder
          onEdit={this.props.onUpdateFolder}
          edit={this.props.toEditFolder}
          open={!!this.props.toEditFolder}
          onClose={this.props.clearEditFolder}
        />
        <DeleteDialog
          onDelete={
            (renderFromProp(
              this.props.openDeleteDialog,
              'type') === 'folder') ?
              this.props.onFolderDelete
              :
              this.props.onDocDelete
          }
          onDeleteConfirmation={this.props.openDeleteDialog}
          clearDeleteConfirmation={this.props.clearDeleteConfirmation}
        />
        <hr />
        <div className="row ">
          {
            (this.props.folders && !this.props.views.showOnlyDoc) ?
              this.renderFolders(this.props.folders)
              : ''
          }
          {
            (this.props.docs && !this.props.views.showOnlyFolder) ?
              this.renderDocs(this.props.docs)
              : ''
          }
        </div>
        <div className="pagination">
          <DropDownMenu value={this.state.page} onChange={this.handlePageChange}>
            {(this.props.docs) ?
              this.paginate(pageCount) : ''}
          </DropDownMenu>
        </div>
      </div>
    );
  }
}

DocumentGrid.defaultProps = {
  views: {
    showOnlyFolder: false,
    showOnlyDoc: false
  }
};

DocumentGrid.propTypes = {
  data: PropTypes.array,
  docs: PropTypes.object,
  folder: PropTypes.array,
  openDeleteDialog: PropTypes.object,
  clearDeleteConfirmation: PropTypes.func,
  onFolderDelete: PropTypes.func,
  onDocDelete: PropTypes.func,
  onFolderCreate: PropTypes.func,
  onDocCreate: PropTypes.func,
  onUpdateFolder: PropTypes.func,
  onUpdateDoc: PropTypes.func,
  clearEditFolder: PropTypes.func,
  editFolder: PropTypes.func
};

export default DocumentGrid;
