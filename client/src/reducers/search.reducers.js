const initialState = {
  results: {
    users: null,
    docs: null,
  },
  searchPage: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USERS_SEARCH_RESULT': {
      return Object.assign({}, state, { results: {
        ...state.results,
        users: action.payload
      } });
    }
    case 'DOCUMENTS_SEARCH_RESULT': {
      return Object.assign({}, state, { results: {
        ...state.results,
        docs: action.payload
      } });
    }
    case 'CLEAR_SEARCH': {
      return {
        ...state,
        results: {
          users: null,
          docs: null
        }
      };
    }
    case 'NOT_FOUND_DOCS': {
      return Object.assign({}, state, { results: {
        ...state.results,
        docs: null
      } });
    }
    case 'NOT_FOUND_USERS': {
      return Object.assign({}, state, { results: {
        ...state.results,
        users: null
      } });
    }
    default: {
      return { ...state };
    }
  }
};
