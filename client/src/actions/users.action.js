import axios from 'axios';

/**
 * getAllUsers - makes a get request to the get all users endpoint
 * then sends a dispatch containg the type of action and response
 * from server
 * @param {number} limit - max number of user to return
 * @param {number} offset - index number to begin from
 * @return {object} object to be sent to all reducers
 */
export function getAllUsers(limit = 10, offset = 0) {
  return dispatch =>
    axios.get(`/api/v1/users/?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch({
          type: 'GOT_ALL_USERS',
          payload: response.data
        });
      });
}

/**
 * getUserDocs - makes a get reques to fetch all documents belonging
 * to the user whose id is passed into the function call
 * then dispatches an action containing the response from the server
 * @param {string} id - id of user to make request for
 * @param {number} limit - max number of user to return
 * @param {number} offset - index number to begin from
 * @return {object} object to be sent to all reducers
 */
export function getUserDocs(id, limit = 10, offset = 0) {
  return dispatch =>
    axios.get(`/api/v1/users/${id}/documents/?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch({
          type: 'FETCHED_DOCUMENTS',
          payload: response.data.documents
        });
      });
}


/**
 * getActiveUser - makes a get request to the server to get the
 * information of the user who is currently active. On success, It then
 * dispatches an action containing the user's information
 * @param {boolean} callback - initially set to false
 * @return {object} object to be sent to all reducers
 */
export function getActiveUser(callback = false) {
  return dispatch =>
    axios.get('/api/v1/users/active')
      .then((response) => {
        dispatch({
          type: 'ACTIVE_USER',
          payload: response.data
        });
        if (callback) {
          dispatch(callback(response.data.id));
        }
      })
      .catch((error) => {
        window.localStorage.clear();
        dispatch({
          type: 'ERROR_GETTING_ACTIVE',
          payload: error.response.data
        });
      });
}

/**
 * getUser - makes a get reques to get information of user whose
 * id was passed during the function call
 * @param {number} id - id of user to make request form
 * @return {object} action object to be sent to all reducers
 */
export function getUser(id) {
  return dispatch =>
    axios.get(`/api/v1/users/${id}`)
      .then((response) => {
        dispatch({
          type: 'GOT_USER',
          payload: response.data
        });
      });
}

/**
 * deleteUser - makes a delete request to delete the user whose
 * id was passed during the function call
 * @param {number} id - id of user to make request form
 * @return {object} action object to be sent to all reducers
 */
export function deleteUser(id) {
  return dispatch =>
    axios.delete(`/api/v1/users/${id}`)
      .then((response) => {
        dispatch(getActiveUser());
        dispatch(getAllUsers());
        dispatch({
          type: 'DELETE_USER',
          payload: response.data
        });
      });
}

/**
 * updateUser - makes a put request to update the current
 * information of the user whose id was passed during the function call
 * @param {number} id - id of user to make request form
 * @param {object} values - columns to update
 * @return {object} action object to be sent to all reducers
 */
export function updateUser(id, values) {
  return dispatch =>
    axios.put(`/api/v1/users/${id}`, values)
      .then((response) => {
        dispatch(getUser());
        dispatch(getAllUsers());
        dispatch({
          type: 'UPDATE_USER_INFO',
          payload: response.data
        });
      }).catch((error) => {
        dispatch({
          type: 'ERROR_UPDATING_USER',
          payload: error.response.data.message
        });
      });
}

/**
* confirmDeleteUser - send an action to confirm deletion of document
* @param {object} values - content to render confirmation box with
* @return {object} - action to send to reducers
*/
export function confirmDeleteUser(values) {
  return {
    type: 'CONFIRM_DELETE_USER',
    payload: values
  };
}

/**
* clearConfirmDeleteUser - send an action to notify that delete confirmation
* is no longer needed
* @return {object} - action to send to reducers
*/
export function clearConfirmDeleteUser() {
  return {
    type: 'CLEAR_CONFIRM_DELETE_USER'
  };
}

/**
* confirmPromotion - send an action to confirm deletion of document
* @param {object} values - content to render confirmation box with
* @return {object} - action to send to reducers
*/
export function confirmPromotion(values) {
  return {
    type: 'CONFIRM_USER_PROMOTION',
    payload: values
  };
}

/**
* clearConfirmPromotion - send an action to notify that delete confirmation
* is no longer needed
* @return {object} - action to send to reducers
*/
export function clearConfirmPromotion() {
  return {
    type: 'CLEAR_CONFIRM_USER_PROMOTION'
  };
}

/**
* clearError - clears the current error message
* @return {object} - action to send to reducers
*/
export function clearError() {
  return {
    type: 'CLEAR_USER_ERROR'
  };
}
