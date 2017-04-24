const defaultState = {
  fetching: false,
  fetched: false,
  creating: false,
  created: false,
  details: {},
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GOT_USER': {
      console.log(action.payload);
      return {
        ...state,
        details: action.payload
      };
    }
    case 'FETCH_ALL_USER': {
      return { ...state, creating: true };
    }
    case 'USERS_ARE_FETCHED': {
      return {
        ...state,
        creating: false,
        created: true,
        users: action.payload
      };
    }
    case 'ERROR_FETCHING_USERS': {
      return { ...state, creating: false, error: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
