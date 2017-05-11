/*
global expect:true
global thunk:true
global configureMockStore:true
global moxios:true
global sinon:true
*/
import signup from '../../src/actions/signup.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const payload = {
  username: 'username',
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'efdee@gmail.com',
  password: 'password'
};

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates CREATE_USER and CLEAR_ERROR action when user has been created',
  (done) => {
    const expectedActions = [
      { type: 'CREATE_USER',
        payload: Object.assign(
          {}, payload, { token: 'abc', password: undefined }) },
      { type: 'CLEAR_ERROR' },
    ];

    const store = mockStore({ auth: { loggedInUser: null, isAuthenticated: false } });

    store.dispatch(signup(payload)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: Object.assign({}, payload, { token: 'abc', password: undefined })
      });
    });
  });

  it('creates VALIDATION_ERROR action when user details are incorrect',
  (done) => {
    const expectedActions = [
      { type: 'VALIDATION_ERROR', payload: 'some error' }
    ];

    const store = mockStore({ auth: { loggedInUser: null, isAuthenticated: false } });

    store.dispatch(signup(payload)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: { message: 'some error' }
      });
    });
  });
});
