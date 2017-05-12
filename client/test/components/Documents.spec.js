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

import Document from '../../src/components/Document.component.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<Document />', () => {
  let props;
  let store;
  let cloneStore;
  beforeEach(() => {
    cloneStore = Object.assign({}, initialState, {
      documents: { ...initialState.documents, doc: { ownerId: 2, title: 'Alice', content: 'Wonder' } },
      folder: { ...initialState.folders, folders: { results: [{ ownerId: 2, title: 'new' }] } },
      users: { ...initialState.users, details: { id: 2 } }
    });
    store = mockStore(cloneStore);
    props = {
      params: { id: 2 },
      dispatch: sinon.spy()
    };
  });
  it('should connect to the redux store', () => {
    const wrapper = mount(
      <Provider store={store} >
        <MuiThemeProvider>
          <Document { ...props } />
        </MuiThemeProvider>
      </Provider>
    );
    expect(wrapper.props().store.getState()).to.eql(cloneStore);
  });
  it('should display the toolbars', () => {
    const wrapper = mount(
      <Provider store={store} >
        <MuiThemeProvider>
          <Document { ...props } />
        </MuiThemeProvider>
      </Provider>
    );
    expect(wrapper.find('.toolbar').props().children)
      .to.have.length(5);
    expect(wrapper.find('.toolbar').props().children[1].props.className)
      .to.eql('col s3 m3 l1 edit-document');
    expect(//eslint-disable-line
      wrapper.find('.toolbar').props().children[1].props.children.props.onTouchTap)
      .to.be.a.Function;
    expect(wrapper.find('.toolbar').props().children[2].props.className)
      .to.eql('col s3 m3 l1 del-document');
    expect(//eslint-disable-line
      wrapper.find('.toolbar').props().children[2].props.children.props.onTouchTap)
      .to.be.a.Function;
    expect(wrapper.find('.toolbar').props().children[3].props.className)
      .to.eql('clear');
  });
  it('should display the title and content', () => {
    const wrapper = mount(
      <Provider store={store} >
        <MuiThemeProvider>
          <Document { ...props } />
        </MuiThemeProvider>
      </Provider>
    );
    expect(wrapper.find('.document-title').props().children.props.children)
      .to.eql('Alice');
    expect(wrapper.find('.document-content').props().children.props.model)
      .to.eql('Wonder');
  });
});
