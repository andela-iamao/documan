/* global expect:true */

import search from '../../src/reducers/search.reducers';


describe('search reducer', () => {
  let searchUsers;
  let searchDocs;
  beforeEach((done) => {
    searchUsers = {
      users: {
        paginationMeta: {
          page_count: 1,
          total_count: 1,
          page_size: 10,
          page: 1
        },
        results: [
          {
            id: 4,
            username: 'johndoe',
            firstname: 'Johnathan',
            lastname: 'Doe',
            email: 'johndoe@gmail.com',
            roleId: 2,
            password: '$2a$10$P43Sb6AD41r64OpPWy3/tOfKwvGlhXCo0R6KB9/lFMiedGVVdaUKS',
            createdAt: '2017-05-07T14:57:12.870Z',
            updatedAt: '2017-05-07T14:59:43.747Z'
          }
        ]
      }
    };
    searchDocs = {
      documents: {
        paginationMeta: {
          page_count: 1,
          total_count: 1,
          page_size: 10,
          page: 1
        },
        results: [
          {
            id: 39,
            title: 'cscscscssc',
            content: '<p>cscscssssssssss</p>',
            accessId: 1,
            ownerId: 1,
            createdAt: '2017-05-07T20:53:42.686Z',
            updatedAt: '2017-05-07T20:53:42.686Z',
            folderId: null
          }
        ]
      }
    };
    done();
  });
  describe('USERS_SEARCH_RESULT', () => {
    it('should add results from search to the user search state', (done) => {
      const initialState = {
        results: {
          users: null,
          docs: null,
        },
        searchPage: 1
      };

      const action = { type: 'USERS_SEARCH_RESULT', payload: searchUsers };
      const newState = search(initialState, action);
      expect(newState.results.users).to.be.an('object');
      expect(newState.results.users).to.eql(searchUsers);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
  describe('DOCUMENTS_SEARCH_RESULT', () => {
    it('should add results from search to the user search state', (done) => {
      const initialState = {
        results: {
          users: null,
          docs: null,
        },
        searchPage: 1
      };

      const action = { type: 'DOCUMENTS_SEARCH_RESULT', payload: searchDocs };
      const newState = search(initialState, action);
      expect(newState.results.docs).to.be.an('object');
      expect(newState.results.docs).to.eql(searchDocs);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
  describe('CLEAR_SEARCH', () => {
    it('should add results from search to the user search state', (done) => {
      const initialState = {
        results: {
          users: searchUsers,
          docs: searchDocs,
        },
        searchPage: 1
      };

      const action = { type: 'CLEAR_SEARCH' };
      const newState = search(initialState, action);
      expect(newState.results.docs).to.eql(null);
      expect(newState.results.users).to.eql(null);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
  describe('NOT_FOUND_DOCS', () => {
    it('should add results from search to the user search state', (done) => {
      const initialState = {
        results: {
          users: searchUsers,
          docs: searchDocs,
        },
        searchPage: 1
      };

      const action = { type: 'NOT_FOUND_DOCS' };
      const newState = search(initialState, action);
      expect(newState.results.docs).to.eql(null);
      expect(newState.results.users).to.eql(searchUsers);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
  describe('NOT_FOUND_USERS', () => {
    it('should add results from search to the user search state', (done) => {
      const initialState = {
        results: {
          users: searchUsers,
          docs: searchDocs,
        },
        searchPage: 1
      };

      const action = { type: 'NOT_FOUND_USERS' };
      const newState = search(initialState, action);
      expect(newState.results.users).to.eql(null);
      expect(newState.results.docs).to.eql(searchDocs);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
});
