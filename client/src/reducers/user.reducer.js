const defaultState = {
  fetching: false,
  fetched: false,
  creating: false,
  created: false,
  user: null,
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_USER': {
      return {
        ...state,
        creating: true };
    }
    case 'USER_IS_CREATED': {
      return {
        ...state,
        creating: false,
        created: true,
        user: action.payload
      };
    }
    case 'ERROR_CREATING_USER': {
      return { ...state, creating: false, error: action.payload };
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
