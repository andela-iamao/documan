import { jsdom } from 'jsdom'; //eslint-disable-line
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import faker from 'faker';
import * as chai from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';
import moxios from 'moxios';
import { mount, shallow, render } from 'enzyme';

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

chai.use(spies);

global.window.localStorage = {
  getItem: () => {
    return 'abc';
  }
}

global.initialState = {
  users: {
    creating: false,
    created: false,
    details: null,
    error: null,
    user: null,
    users: null,
    confirmDelete: null,
    promotion: null
  },
  form: {},
  error: {},
  auth: {
    isAuthenticated: false,
    loggedInUser: null
  },
  folder: {
    error: null,
    folders: null,
    confirmDelete: null,
    folder: null,
    editFolder: false,
    documents: null
  },
  documents: {
    error: null,
    documents: null,
    allDocuments: null,
    confirmDelete: null,
    doc: null,
    editDoc: false
  },
  views: {
    showOnlyDoc: false,
    showOnlyFolder: false
  },
  search: {
    results: {
      users: null,
      docs: null,
    },
    searchPage: 1
  }
};
global.sinon = sinon;
global.expect = chai.expect;
global.thunk = thunk;
global.configureMockStore = configureMockStore;
global.nock = nock;
global.mount = mount;
global.shallow = shallow;
global.render = render;
global.spy = spies;
global.faker = faker;
global.moxios = moxios;
global.navigator = {
  userAgent: 'node.js'
};
