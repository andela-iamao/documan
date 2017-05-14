const initialState = {
  isAuthenticated: false,
  loggedInUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
    case 'ACTIVE_USER':
    case 'CREATE_USER': {
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload
      };
    }
    case 'SIGN_OUT_USER': {
      return {
        ...state,
        isAuthenticated: false,
        loggedInUser: null
      };
    }
    default: {
      return { ...state };
    }
  }
};
