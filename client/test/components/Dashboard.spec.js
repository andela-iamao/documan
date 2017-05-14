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

import Dashboard from '../../src/components/Dashboard.component.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<Dashboard />', () => {
  let props;
  let store;
  let cloneStore;
  beforeEach(() => {
    require('fbjs/lib/ExecutionEnvironment').canUseDOM = true; //eslint-disable-line
    cloneStore = Object.assign({}, initialState, {
      documents: { ...initialState.documents, doc: { ownerId: 2, title: 'Alice', content: 'Wonder' } },
      folder: {
        ...initialState.folder,
        editFolder: { id: 2, title: 'new' },
        folders: {
          results: [{ ownerId: 2, title: 'new' }]
        } },
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
          <Dashboard { ...props } />
        </MuiThemeProvider>
      </Provider>
    );
    expect(wrapper.props().store.getState()).to.eql(cloneStore);
  });
  it('should render search if item is in search results', () => {
    const addSearch = Object.assign({}, cloneStore, {
      ...cloneStore,
      search: {
        ...cloneStore.search,
        results: {
          users: { users: { results: [{ id: 2, username: 'felix' }] } },
          documents: { documents: { results: [] } } } } });
    const secondStore = mockStore(addSearch);
    const wrapper = mount(
      <Provider store={secondStore} >
        <MuiThemeProvider>
          <Dashboard { ...props } />
        </MuiThemeProvider>
      </Provider>
    );
    expect(wrapper.find('.dashboard-container').props().children[0].props.data)
      .to.eql(addSearch.search.results);
    expect(wrapper.find('.dashboard-container').props().children[0].props.clearSearch)
      .to.be.an('function');
  });
  it('should render snack bar if errors were found', () => {
    const addError = Object.assign({}, cloneStore, {
      ...cloneStore,
      folder: {
        ...cloneStore.folder,
        error: 'folder exists'
      }
    });
    const secondStore = mockStore(addError);
    const wrapper = mount(
      <Provider store={secondStore} >
        <MuiThemeProvider>
          <Dashboard { ...props }/>
        </MuiThemeProvider>
      </Provider>
    );
    expect(wrapper.find('.dashboard-container').props().children[1].props.open)
      .to.eql(true);
    expect(wrapper.find('.dashboard-container').props().children[1].props.message)
      .to.eql('folder exists');
    expect(wrapper.find('.dashboard-container').props().children[1].props.onRequestClose)
      .to.be.an('function');
  });
});
