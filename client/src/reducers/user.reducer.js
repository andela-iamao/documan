const defaultState = {
  fetching: false,
  fetched: false,
  creating: false,
  created: false,
  details: null,
  error: null,
  user: null,
  users: null,
  confirmDelete: null,
  promotion: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GOT_USER': {
      return { ...state, user: action.payload };
    }
    case 'ACTIVE_USER': {
      return { ...state, details: action.payload };
    }
    case 'GOT_ALL_USERS': {
      return { ...state, users: action.payload };
    }
    case 'ERROR_FETCHING_USERS': {
      return { ...state, creating: false, error: action.payload };
    }
    case 'DELETE_USER': {
      return { ...state };
    }
    case 'ERROR_UPDATING_USER': {
      return { ...state, error: action.payload };
    }
    case 'CONFIRM_DELETE_USER': {
      return { ...state, confirmDelete: action.payload };
    }
    case 'CLEAR_CONFIRM_DELETE_USER': {
      return { ...state, confirmDelete: null };
    }
    case 'CONFIRM_USER_PROMOTION': {
      return { ...state, promotion: action.payload }
    }
    case 'CLEAR_CONFIRM_USER_PROMOTION': {
      return { ...state, promotion: null };
    }
    case 'CLEAR_USER_ERROR': {
      return { ...state, error: null };
    }
    default: {
      return { ...state };
    }
  }
};
