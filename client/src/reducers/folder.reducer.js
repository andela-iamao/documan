const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  folders: null,
  confirmDelete: null,
  folder: null,
  editFolder: false,
  documents: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_CURRENT_USER_FOLDERS': {
      return {
        ...state,
        folders: action.payload
      };
    }
    case 'GOT_FOLDER': {
      return {
        ...state,
        folder: action.payload
      };
    }
    case 'GOT_FOLDER_DOCUMENTS': {
      return {
        ...state,
        documents: action.payload
      };
    }
    case 'EDIT_FOLDER': {
      return {
        ...state,
        editFolder: action.payload
      };
    }
    case 'CLEAR_EDIT_FOLDER': {
      return {
        ...state,
        editFolder: false
      };
    }
    case 'UPDATED_FOLDER': {
      return Object.assign({}, state, {
        folders: { ...state.folders,
          results: [...state.folders.results].map((folder) =>
            (folder.id === action.payload.id) ?
              { ...folder, title: action.payload.title }
              : folder) } });
    }
    case 'CREATED_FOLDER': {
      return (state.folders.results.length < 8) ? Object.assign({}, state, {
        folders: {
          ...state.folders,
          results: [action.payload, ...state.folders.results] } })
          : { ...state }
    }
    case 'CONFIRM_DELETE_FOLDER': {
      return { ...state, confirmDelete: action.payload };
    }
    case 'DELETED_FOLDER': {
      return Object.assign({}, state, {
        folders: {
          ...state.folders,
          results: [...state.folders.results].filter(folder =>
            (folder.id !== action.payload)) } });
      // const cloneState = { ...state };
      // cloneState.data = [...state.data]
      //   .filter(data => (data.id !== action.payload));
      // return cloneState;
    }
    case 'CLEAR_FOLDER_DELETE_CONFIRMATION': {
      return { ...state, confirmDelete: null };
    }
    case 'ADDED_DOCUMENT_TO_FOLDER': {
      return {
        ...state
      };
    }
    case 'ERROR_ADDING_DOCUMENT_TO_FOLDER':
    case 'ERROR_CREATING_FOLDER':
    case 'ERROR_UPDATING_FOLDER': {
      return {
        ...state,
        error: action.payload
      };
    }
    case 'CLEAR_FOLDER_ERRORS': {
      return {
        ...state,
        error: null
      }
    }
    default: {
      return { ...state };
    }
  }
};
