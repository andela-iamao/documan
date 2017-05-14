/* global expect:true */
/* global shallow:true */
/* global mount:true
   global sinon:true
*/

import React from 'react';//eslint-disable-line

import DeleteDialog from '../../src/components/DeleteDialog.component.jsx';

describe('<DeleteDialog />', () => {
  const props = {
    onDeleteConfirmation: {
      type: 'document',
      title: 'docA'
    },
    openDialog: sinon.spy()
  };
  it('should display a delete button if deleteButton prop is true', () => {
    const wrapper = shallow(
      <DeleteDialog deleteButton { ...props } />
    );
    wrapper.find('.delete-btn').simulate('click');
    expect(props.openDialog.calledOnce)
      .to.eql(true);
  });

  it('should display a document icon if the type of dialog is documents',
  () => {
    const wrapper = shallow(
      <DeleteDialog deleteButton { ...props } />
    );

    expect(wrapper.find('.dialog-icon').props().src)
      .to.eql('/images/file.png');
  });

  it('should display the documents name', () => {
    const wrapper = shallow(
      <DeleteDialog deleteButton { ...props } />
    );
    expect(wrapper.find('.dialog-doc-title').props().children)
      .to.eql('docA');
  });
});
