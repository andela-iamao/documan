/* global expect:true */

import error from '../../src/reducers/error.reducer';


describe('error reducer', () => {
  describe('VALIDATION_ERROR', () => {
    it('should change the state of a signed in user', (done) => {
      const initialState = {};
      const action = { type: 'VALIDATION_ERROR', payload: 'validation error' };
      const newState = error(initialState, action);
      expect(newState.error).to.be.an('object');
      expect(newState.error.data).to.eql('validation error');
      expect(initialState.error).to.eql(undefined);
      done();
    });
  });
  describe('CLEAR_ERROR', () => {
    it('should change the authentication state when active user is fetched', (done) => {
      const initialState = {
        error: {
          type: 'validation',
          data: 'validation error'
        }
      };
      const action = { type: 'CLEAR_ERROR', payload: { firstname: 'some' } };
      const newState = error(initialState, action);
      expect(newState.error).to.eql(null);
      expect(initialState.error).to.be.an('object');
      done();
    });
  });
  describe('DEFAULT', () => {
    it('should change the authentication state when a user is created', (done) => {
      const initialState = {};
      const action = { type: '', payload: { firstname: 'some' } };
      const newState = error(initialState, action);
      expect(newState).to.eql(initialState);
      done();
    });
  });
});
