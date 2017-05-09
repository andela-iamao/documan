/*
global expect:true
global thunk:true
global configureMockStore:true
global nock:true
global sinon:true
*/
import login from '../../src/actions/login.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    nock('http://localhost:5000')
      .post('/api/v1/users/login', {
        email: 'efdee@gmail.com',
        password: 'password'
      })
      .reply(200, { token: 'fyodor' });

    const expectedActions = [
      { type: 'CLEAR_ERROR' },
      { type: 'LOGIN_USER', payload: { token: 'fyodor' } }
    ];

    const store = mockStore();
    const dispatch = sinon.spy(store, 'dispatch');
    const fn = login({ email: 'efdee@gmail.com', password: 'password' });

    fn(dispatch, store.getState);
    // setTimeout(() => {
    //   expect(store.getActions()).to.include(expectedActions);
    // }, 1500);
    expect(dispatch.calledWith(expectedActions[1])).to.eql(true);
  });
});
