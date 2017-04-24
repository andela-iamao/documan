import axios from 'axios';

export function getUserFolders() {
  return (dispatch) => {
    axios.get('/api/v1/folders')
      .then((response) => {
        dispatch({
          type: 'FETCHED_CURRENT_USER_FOLDERS',
          payload: response.data
        });
      });
  };
}

export function createFolder(value) {
  return (dispatch) => {
    axios.post('/api/v1/folders', value)
      .then((response) => {
        dispatch({
          type: 'CREATED_FOLDER',
          payload: response.data
        });
      }).catch((error) => {
        dispatch({
          type: 'ERROR_CREATING_FOLDER',
          payload: error.response.payload
        });
      });
  };
}

export function deleteFolder(value) {
  return (dispatch) => {
    axios.delete(`/api/v1/folders/${value}`)
      .then(() => {
        dispatch({
          type: 'DELETED_FOLDER',
          payload: value
        });
      }).catch((error) => {
        dispatch({
          type: 'ERROR_DELETING_FOLDER',
          payload: error.response.payload
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
          payload: error.response.payload
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

export function updateFolder(values) {
  return (dispatch) => {
    axios.put(`/api/v1/folders/${values.id}`, values)
      .then((response) => {
        dispatch(getUserFolders());
        dispatch({
          type: 'UPDATED_FOLDER',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_UPDATING_FOLDER',
          payload: error.response.payload
        });
      });
  };
}

export function clearEditFolder() {
  return {
    type: 'CLEAR_EDIT_FOLDER'
  };
}
