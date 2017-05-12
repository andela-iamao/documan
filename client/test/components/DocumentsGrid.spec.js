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
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DocumentsGrid from '../../src/components/DocumentsGrid.component.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<DocumentsGrid />', () => {
  let props;
  let cloneStore;
  beforeEach(() => {
    cloneStore = Object.assign({}, initialState, {
      documents: { ...initialState.documents, doc: { ownerId: 2, title: 'Alice', content: 'Wonder' } },
      folder: { ...initialState.folders, folders: { results: [{ ownerId: 2, title: 'new' }] } },
      users: { ...initialState.users, details: { id: 2 } }
    });
    props = {
      toEditFolder: { title: 'abc', id: 2 },
      onDocCreate: sinon.spy(),
      onFolderCreate: sinon.spy()
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
});
