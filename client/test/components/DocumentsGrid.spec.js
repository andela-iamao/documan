/*
global expect:true
global shallow:true
global mount:true
global configureMockStore:true
global thunk:true
global initialState:true
global sinon:true
*/

import React from 'react';//eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DocumentsGrid from '../../src/components/DocumentsGrid.component.jsx';

describe('<DocumentsGrid />', () => {
  let props;
  beforeEach(() => {
    props = {
      toEditFolder: { title: 'abc', id: 2 },
      onDocCreate: sinon.spy(),
      onFolderCreate: sinon.spy(),
      onEditFolder: () => null,
      onConfirmFolderDelete: () => null,
      folders: {
        results: [{ title: 'abc', id: 1 }, { title: 'new', id: 2 }],
        paginationMeta: { page_count: 2 }
      },
      docs: {
        results: [{ title: 'abc', id: 1 }, { title: 'new', id: 2 }],
        paginationMeta: { page_count: 2 }
      }
    };
  });
  it('should have a button to create folder',
  () => {
    const wrapper = mount(
        <MuiThemeProvider>
          <DocumentsGrid { ...props } />
        </MuiThemeProvider>
    );
    expect(wrapper.find('.row').first().props().children[0].props.onCreate.calledOnce)
      .to.eql(sinon.spy().calledOnce);
  });
  it('should have a button to create documents',
  () => {
    const wrapper = mount(
        <MuiThemeProvider>
          <DocumentsGrid { ...props } />
        </MuiThemeProvider>
    );
    expect(wrapper.find('.row').first().props().children[1].props.onCreate.calledOnce)
      .to.eql(sinon.spy().calledOnce);
  });
  it('should pass all folders into the Folderasrd component',
  () => {
    const folderCardProps = {
      title: 'abc',
      id: 1,
      icon: '/images/folder.png',
    };
    const wrapper = mount(
        <MuiThemeProvider>
          <DocumentsGrid { ...props } />
        </MuiThemeProvider>
    );
    expect(wrapper.find('.row').last().props().children[0][0].props.children.props.title)
      .to.eql(folderCardProps.title);
    expect(wrapper.find('.row').last().props().children[0][0].props.children.props.id)
      .to.eql(folderCardProps.id);
    expect(wrapper.find('.row').last().props().children[0][0].props.children.props.icon)
      .to.eql(folderCardProps.icon);
  });
});
