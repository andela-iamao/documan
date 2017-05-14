/* global expect:true */

import auth from '../../src/reducers/auth.reducer';

describe('auth reducer', () => {
  describe('LOGIN_USER', () => {
    it('should change the state of a signed in user', (done) => {
      const initialState = {
        isAuthenticated: false,
        loggedInUser: null
      };
      const action = { type: 'LOGIN_USER', payload: { firstname: 'some' } };
      const newState = auth(initialState, action);
      expect(newState.isAuthenticated).to.eql(true);
      expect(newState.loggedInUser).to.be.an('object');
      expect(newState.loggedInUser.firstname).to.eql('some');
      expect(initialState.isAuthenticated).to.eql(false);
      expect(initialState.loggedInUser).to.eql(null);
      done();
    });
  });
  describe('ACTIVE_USER', () => {
    it('should change the authentication state when active user is fetched', (done) => {
      const initialState = {
        isAuthenticated: false,
        loggedInUser: null
      };
      const action = { type: 'ACTIVE_USER', payload: { firstname: 'some' } };
      const newState = auth(initialState, action);
      expect(newState.isAuthenticated).to.eql(true);
      expect(newState.loggedInUser).to.be.an('object');
      expect(newState.loggedInUser.firstname).to.eql('some');
      expect(initialState.isAuthenticated).to.eql(false);
      expect(initialState.loggedInUser).to.eql(null);
      done();
    });
  });
  describe('CREATE_USER', () => {
    it('should change the authentication state when a user is created', (done) => {
      const initialState = {
        isAuthenticated: false,
        loggedInUser: null
      };
      const action = { type: 'CREATE_USER', payload: { firstname: 'some' } };
      const newState = auth(initialState, action);
      expect(newState.isAuthenticated).to.eql(true);
      expect(newState.loggedInUser).to.be.an('object');
      expect(newState.loggedInUser.firstname).to.eql('some');
      expect(initialState.isAuthenticated).to.eql(false);
      expect(initialState.loggedInUser).to.eql(null);
      done();
    });
  });
  describe('SIGN_OUT_USER', () => {
    it('should change the state of a signed in user', (done) => {
      const initialState = {
        isAuthenticated: true,
        loggedInUser: {
          firstname: 'abc',
          lastname: 'csd'
        }
      };
      const action = { type: 'SIGN_OUT_USER' };
      const newState = auth(initialState, action);
      expect(newState.isAuthenticated).to.eql(false);
      expect(newState.loggedInUser).to.eql(null);
      expect(initialState.isAuthenticated).to.eql(true);
      expect(initialState.loggedInUser).to.eql({
        firstname: 'abc',
        lastname: 'csd'
      });
      done();
    });
  });
});
