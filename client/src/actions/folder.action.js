import axios from 'axios';

export function getUserFolders(limit = 8, offset = 0) {
  return (dispatch) => {
    axios.get(`/api/v1/folders/?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch({
          type: 'FETCHED_CURRENT_USER_FOLDERS',
          payload: response.data.folders
        });
      });
  };
}

export function createFolder(value, folderCount, pageNum = 1) {
  return (dispatch) => {
    axios.post('/api/v1/folders', value)
      .then((response) => {
        dispatch({
          type: 'CREATED_FOLDER',
          payload: response.data
        });
        if (folderCount === 8) {
          dispatch(getUserFolders(8, 8 * (pageNum - 1)));
        }
      }).catch((error) => {
        dispatch({
          type: 'ERROR_CREATING_FOLDER',
          payload: error.response.data.message
        });
      });
  };
}

export function deleteFolder(id) {
  return (dispatch) => {
    axios.delete(`/api/v1/folders/${id}`)
      .then(() => {
        dispatch({
          type: 'DELETED_FOLDER',
          payload: id
        });
      }).catch((error) => {
        dispatch({
          type: 'ERROR_DELETING_FOLDER',
          payload: error.response.data
        });
      });
  };
}

export function getFolder(id) {
  return (dispatch) => {
    axios.get(`/api/v1/folders/${id}`)
      .then((response) => {
        dispatch({
          type: 'GOT_FOLDER',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_GETTING_FOLDER',
          payload: error.response.data
        });
      });
  };
}

export function confirmDeleteFolder(values) {
  return {
    type: 'CONFIRM_DELETE_FOLDER',
    payload: values
  };
}

export function clearConfirmDeleteFolder() {
  return {
    type: 'CLEAR_FOLDER_DELETE_CONFIRMATION'
  };
}

export function editFolder(values) {
  return {
    type: 'EDIT_FOLDER',
    payload: values
  };
}

export function updateFolder(values, type = 'multiple') {
  return (dispatch) => {
    axios.put(`/api/v1/folders/${values.id}`, values)
      .then((response) => {
        if (type === 'multiple') {
          dispatch({
            type: 'UPDATED_FOLDER',
            payload: values
          });
        } else {
          dispatch({
            type: 'UPDATED_SINGLE_FOLDER',
            payload: values
          });
        }

      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_UPDATING_FOLDER',
          payload: error.response.data.message
        });
      });
  };
}

export function clearEditFolder() {
  return {
    type: 'CLEAR_EDIT_FOLDER'
  };
}

export function getFolderDocs(id) {
  return (dispatch) => {
    axios.get(`/api/v1/folders/${id}/documents`)
      .then((response) => {
        dispatch({
          type: 'GOT_FOLDER_DOCUMENTS',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_GETTING_FOLDER_DOCUMENTS',
          payload: error.response.data
        });
      });
  };
}

export function removeFromFolder(docId, folderId) {
  return (dispatch) => {
    axios.put(`/api/v1/folders/${folderId}/remove`, { id: docId })
      .then((response) => {
        dispatch({
          type: 'REMOVED_DOCUMENT_FROM_FOLDER',
          payload: docId
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_REMOVING_DOCUMENT_FROM_FOLDER',
          payload: error.response.data.message
        });
      });
  }
}

export function addDoc(folderId, doc) {
  return (dispatch) => {
    axios.put(`/api/v1/folders/${folderId}/add`, doc)
      .then((response) => {
        dispatch(getFolderDocs(folderId));
        dispatch({
          type: 'ADDED_DOCUMENT_TO_FOLDER',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_ADDING_DOCUMENT_TO_FOLDER',
          payload: error.response.data
        });
      });
  };
}

export function clearFolderError() {
  return {
    type: 'CLEAR_FOLDER_ERRORS'
  };
}
