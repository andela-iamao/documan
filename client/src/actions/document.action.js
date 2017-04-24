import axios from 'axios';

/**
* getUserDocs
* @return {object} - returns dispatch object based on response from server
*/
export function getUserDocs() {
  return (dispatch) => {
    const userId = JSON.parse(window.localStorage.getItem('user')).data.id;
    axios.get(`/api/v1/users/${userId}/documents`)
      .then((response) => {
        dispatch({
          type: 'FETCHED_CURRENT_USER_DOCS',
          payload: response.data
        });
      });
  };
}

/**
* createDoc
* @param {object} values - object to create document with
* @return {object} - returns dispatch object based on response from server
*/
export function createDoc(values) {
  return (dispatch) => {
    axios.post('/api/v1/documents', values)
      .then((response) => {
        dispatch({
          type: 'CREATED_DOC',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_CREATING_DOCUMENT',
          payload: error.response
        });
      });
  };
}

/**
* getDoc
* @param {integer} id - id of document to get
* @return {object} - returns dispatch object based on response from server
*/
export function getDoc(id) {
  return (dispatch) => {
    axios.get(`/api/v1/documents/${id}`)
      .then((response) => {
        dispatch({
          type: 'GOT_DOCUMENT',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_GETTING_DOCUMENT',
          payload: error.response
        });
      });
  };
}

export function editDoc(values) {
  return {
    type: 'EDIT_DOCUMENT',
    payload: values
  };
}

export function updateDoc(values) {
  return (dispatch) => {
    axios.put(`/api/v1/documents/${values.id}`, values)
      .then((response) => {
        dispatch(getUserDocs());
        dispatch({
          type: 'UPDATED_DOCUMENT',
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_UPDATING_DOCUMENT',
          payload: error.response
        });
      });
  };
}

export function deleteDoc(value) {
  return (dispatch) => {
    axios.delete(`/api/v1/documents/${value}`)
      .then(() => {
        dispatch({
          type: 'DELETED_DOCUMENT',
          payload: value
        });
      }).catch((error) => {
        dispatch({
          type: 'ERROR_DELETING_DOCUMENT',
          payload: error.response.data
        });
      });
  };
}

export function clearEditDoc() {
  return {
    type: 'CLEAR_EDIT_DOCUMENT'
  };
}

export function confirmDeleteDoc(values) {
  return {
    type: 'CONFIRM_DELETE_DOCUMENT',
    payload: values
  };
}

export function clearConfirmDeleteDoc() {
  return {
    type: 'CLEAR_CONFIRM_DELETE_DOCUMENT'
  };
}
