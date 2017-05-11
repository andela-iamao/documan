/*
global expect:true
global thunk:true
global configureMockStore:true
global moxios:true
global sinon:true
*/
import * as userAction from '../../src/actions/users.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const payload = { id: 2 };
const state = {
  users: {
    creating: false,
    created: false,
    details: null,
    error: null,
    user: null,
    users: null,
    confirmDelete: null,
    promotion: null
  }
};

describe('Users actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('getAllUsers::Action', () => {
    it('creates GOT_ALL_USERS when all users are retrieved',
    (done) => {
      const expectedActions = [
        { type: 'GOT_ALL_USERS', payload: { users: { paginationMeta: [], results: [] } } }
      ];

      const store = mockStore(state);

      store.dispatch(userAction.getAllUsers(payload)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { users: { paginationMeta: [], results: [] } } });
      });
    });
  });

  describe('getUserDocs::Action', () => {
    it('creates FETCHED_DOCUMENTS after retrieving user documnets',
    (done) => {
      const expectedActions = [
        { type: 'FETCHED_DOCUMENTS',
          payload: { paginationMeta: [], results: [] } }
      ];

      const store = mockStore(state);

      store.dispatch(userAction.getUserDocs(2)).then(() => {
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
  });

  describe('getActiveUser::Action', () => {
    it('creates ACTIVE_USER when a document has been retrieved',
    (done) => {
      const expectedActions = [
        {
          type: 'ACTIVE_USER',
          payload: { id: 1, firstname: 'abc' }
        }
      ];

      const store = mockStore(state);

      store.dispatch(userAction.getActiveUser())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { id: 1, firstname: 'abc' } });
      });
    });
  });

  describe('getUser::Action', () => {
    it('creates GOT_USER when a user was retrieved',
    (done) => {
      const values = { id: 2, firstname: 'abc' };
      const expectedActions = [
        {
          type: 'GOT_USER',
          payload: values
        }
      ];

      const store = mockStore(state);

      store.dispatch(userAction.getUser(2))
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
  });

  describe('deleteUser::Action', () => {
    it('creates DELETE_USER when a user has been deleted',
    (done) => {
      const expectedActions = [
        {
          type: 'DELETE_USER',
          payload: undefined
        }
      ];

      const store = mockStore(state);

      store.dispatch(userAction.deleteUser(2))
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
  });

  describe('updateUser::Action', () => {
    it('creates UPDATE_USER_INFO when a user has been updated',
    (done) => {
      const expectedActions = [
        {
          type: 'UPDATE_USER_INFO',
          payload: undefined
        }
      ];

      const store = mockStore(state);

      store.dispatch(userAction.updateUser(2))
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
  });

  describe('confirmPromotion::Action', () => {
    it('creates CONFIRM_USER_PROMOTION when truing to promote a user', (done) => {
      const action = userAction.confirmPromotion({ id: 2, firstname: 'abc' });
      expect(action).to.deep.equal({
        type: 'CONFIRM_USER_PROMOTION',
        payload: { id: 2, firstname: 'abc' }
      });
      done();
    });
  });

  describe('confirmDeleteUser::Action', () => {
    it('creates CONFIRM_DELETE_DOCUMENT when user is about to be deleted',
    (done) => {
      const action = userAction.confirmDeleteUser({ id: 2 });
      expect(action).to.deep.equal({
        type: 'CONFIRM_DELETE_USER',
        payload: { id: 2 }
      });
      done();
    });
  });

  describe('clearConfirmDeleteUser::Action', () => {
    it('creates CLEAR_CONFIRM_DELETE_USER when user is no more in delete mode',
    (done) => {
      const action = userAction.clearConfirmDeleteUser();
      expect(action).to.deep.equal({
        type: 'CLEAR_CONFIRM_DELETE_USER'
      });
      done();
    });
  });

  describe('clearConfirmPromotion::Action', () => {
    it('creates CLEAR_CONFIRM_USER_PROMOTION when user is no more in promotion mode',
    (done) => {
      const action = userAction.clearConfirmPromotion();
      expect(action).to.deep.equal({
        type: 'CLEAR_CONFIRM_USER_PROMOTION'
      });
      done();
    });
  });

  describe('clearError::Action', () => {
    it('creates CLEAR_USER_ERROR when clearing users errors',
    (done) => {
      const action = userAction.clearError();
      expect(action).to.deep.equal({
        type: 'CLEAR_USER_ERROR'
      });
      done();
    });
  });
});
