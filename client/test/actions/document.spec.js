/*
global expect:true
global thunk:true
global configureMockStore:true
global moxios:true
global sinon:true
*/
import * as docAction from '../../src/actions/document.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const payload = { id: 2 };
const state = {
  documents: {
    error: null,
    documents: null,
    allDocuments: null,
    confirmDelete: null,
    doc: null,
    editDoc: false
  }
};

describe('Documents actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates FETCHED_CURRENT_USER_DOCS when user documents has been retrieved',
  (done) => {
    const expectedActions = [
      { type: 'FETCHED_CURRENT_USER_DOCS', payload: { paginationMeta: [], results: [] } }
    ];

    const store = mockStore(state);

    store.dispatch(docAction.getUserDocs(payload)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { documents: { paginationMeta: [], results: [] } } });
    });
  });
  it('creates CREATED_DOC when a document has been created',
  (done) => {
    const expectedActions = [
      {
        type: 'CREATED_DOC',
        payload: { title: 'abc', content: 'blah', ownerId: 2 }
      }
    ];

    const store = mockStore(state);

    store.dispatch(docAction.createDoc({ title: 'abc', content: 'blah' }, 8, 1, 2))
    .then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { title: 'abc', content: 'blah', ownerId: 2 } });
    });
  });
  it('creates ERROR_CREATING_DOCUMENT when error occurs creating document',
  (done) => {
    const expectedActions = [
      { type: 'ERROR_CREATING_DOCUMENT', payload: { message: 'error' } }
    ];

    const store = mockStore(state);

    store.dispatch(docAction.createDoc(payload)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { message: 'error' } });
    });
  });

  describe('gotDoc action', () => {
    it('creates GOT_DOCUMENT when a document has been retrieved',
    (done) => {
      const expectedActions = [
        {
          type: 'GOT_DOCUMENT',
          payload: { title: 'abc', content: 'blah', ownerId: 2 }
        }
      ];

      const store = mockStore(state);

      store.dispatch(docAction.getDoc(2))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { title: 'abc', content: 'blah', ownerId: 2 } });
      });
    });
    it('creates ERROR_GETTING_DOCUMENT when error occured when getting docs',
    (done) => {
      const expectedActions = [
        {
          type: 'ERROR_GETTING_DOCUMENT',
          payload: { message: 'error' }
        }
      ];

      const store = mockStore(state);

      store.dispatch(docAction.getDoc(2))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { message: 'error' } });
      });
    });
  });

  describe('editDoc::Action', () => {
    it('creates EDIT_DOCUMENT when docment is in edit mode', (done) => {
      const action = docAction.editDoc({ id: 2 });
      expect(action).to.deep.equal({
        type: 'EDIT_DOCUMENT',
        payload: { id: 2 }
      });
      done();
    });
  });

  describe('updateDoc::Action', () => {
    it('creates UPDATED_DOCUMENT when a document has been updated',
    (done) => {
      const values = { title: 'abc', content: 'blah', id: 2 };
      const expectedActions = [
        {
          type: 'UPDATED_DOCUMENT',
          payload: values
        }
      ];

      const store = mockStore(state);

      store.dispatch(docAction.updateDoc(values, false))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: values });
      });
    });
    it('creates ERROR_UPDATING_DOCUMENT when error occured during updateing doc',
    (done) => {
      const expectedActions = [
        {
          type: 'ERROR_UPDATING_DOCUMENT',
          payload: { message: 'error' }
        }
      ];

      const store = mockStore(state);

      store.dispatch(docAction.updateDoc({ id: 2, title: 'blah' }))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { message: 'error' } });
      });
    });
  });

  describe('deleteDoc::Action', () => {
    it('creates DELETED_DOCUMENT and REMOVED_DOCUMENT_FROM_FOLDER when a document has been deleted',
    (done) => {
      const values = { id: 2, userDoc: 'single' };
      const expectedActions = [
        {
          type: 'DELETED_DOCUMENT',
          payload: values
        },
        {
          type: 'REMOVED_DOCUMENT_FROM_FOLDER',
          payload: 2
        }
      ];

      const store = mockStore(state);

      store.dispatch(docAction.deleteDoc(2, false, 'single'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 204 });
      });
    });
    it('creates ERROR_DELETING_DOCUMENT when error occured during deleting doc',
    (done) => {
      const expectedActions = [
        {
          type: 'ERROR_DELETING_DOCUMENT',
          payload: { message: 'error' }
        }
      ];

      const store = mockStore(state);

      store.dispatch(docAction.deleteDoc(2, false, null))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { message: 'error' } });
      });
    });
  });

  describe('confirmDeleteDoc::Action', () => {
    it('creates CONFIRM_DELETE_DOCUMENT when docment is about to be deleted',
    (done) => {
      const action = docAction.confirmDeleteDoc({ id: 2 });
      expect(action).to.deep.equal({
        type: 'CONFIRM_DELETE_DOCUMENT',
        payload: { id: 2 }
      });
      done();
    });
  });

  describe('clearConfirmDeleteDoc::Action', () => {
    it('creates CLEAR_CONFIRM_DELETE_DOCUMENT when docment is no more in delete mode',
    (done) => {
      const action = docAction.clearConfirmDeleteDoc();
      expect(action).to.deep.equal({
        type: 'CLEAR_CONFIRM_DELETE_DOCUMENT'
      });
      done();
    });
  });
});
