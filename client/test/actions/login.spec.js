/*
global expect:true
global thunk:true
global configureMockStore:true
global moxios:true
global sinon:true
*/
import login from '../../src/actions/login.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates LOGIN_USER and CLEAR_ERROR action when user has been validated',
  (done) => {
    const expectedActions = [
      { type: 'LOGIN_USER', payload: { token: 'abc' } },
      { type: 'CLEAR_ERROR' },
    ];

    const store = mockStore({ auth: { loggedInUser: null, isAuthenticated: false } });

    store.dispatch(login({
      email: 'efdee@gmail.com',
      password: 'password'
    })).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { token: 'abc' }
      });
    });
  });

  it('creates VALIDATION_ERROR action when user details are incorrect',
  (done) => {
    const expectedActions = [
      { type: 'VALIDATION_ERROR', payload: 'email/passwords do not match' }
    ];

    const store = mockStore({ auth: { loggedInUser: null, isAuthenticated: false } });

    store.dispatch(login({
      email: 'wromgemail@gmail.com',
      password: 'password'
    })).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: { message: 'email/passwords do not match' }
      });
    });
  });
});
