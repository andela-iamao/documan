import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

export default function Paginate({ pageCount, handlePageChange, page }) {
  const paginated = [];
  for (let count = 0; count < pageCount; count += 1) {
    paginated.push(
      <MenuItem
        value={count + 1}
        primaryText={`Page ${count + 1}`}
        key={`Page${count + 1}`}/>
    );
  }
  return (
    <div className="pagination">
      <DropDownMenu value={page} onChange={handlePageChange}>
        {paginated}
      </DropDownMenu>
    </div>
  );
}
