const initialState = {
  error: null,
  documents: null,
  allDocuments: null,
  confirmDelete: null,
  doc: null,
  editDoc: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_CURRENT_USER_DOCS': {
      return {
        ...state,
        documents: action.payload
      };
    }
    case 'EDIT_DOCUMENT': {
      return {
        ...state,
        editDoc: action.payload
      };
    }
    case 'CLEAR_EDIT_DOCUMENT': {
      return {
        ...state,
        editDoc: false
      };
    }
    case 'UPDATED_DOCUMENT': {
      return Object.assign({}, state, {
        documents: {
          ...state.documents,
          results: [...state.documents.results].map(document =>
          (document.id === action.payload.id) ?
            { title: action.payload.title } : document) } });
    }
    case 'GOT_DOCUMENT': {
      return {
        ...state,
        doc: action.payload
      };
    }
    case 'CONFIRM_DELETE_DOCUMENT': {
      return {
        ...state,
        confirmDelete: action.payload
      };
    }
    case 'DELETED_DOCUMENT': {
      if (action.payload.userDoc) {
        return Object.assign({}, state, {
          documents: {
            ...state.documents,
            results: [...state.documents.results].filter(document =>
            (parseInt(document.id, 10) !== parseInt(action.payload.id, 10))) } });
      }
      return Object.assign({}, state, {
        allDocuments: {
          ...state.allDocuments,
          results: [...state.allDocuments.results].filter(document =>
          (parseInt(document.id, 10) !== parseInt(action.payload.id, 10))) } });
    }
    case 'CREATED_DOC': {
      return Object.assign({}, state, {
        documents: {
          ...state.documents,
          results: [...state.documents.results, action.payload]
        }
      });
    }
    case 'CLEAR_CONFIRM_DELETE_DOCUMENT': {
      return {
        ...state,
        confirmDelete: null
      };
    }
    case 'GOT_ALL_DOCUMENTS': {
      return {
        ...state,
        allDocuments: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
};
