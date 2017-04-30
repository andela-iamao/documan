import axios from 'axios';

/**
 * getAllUsers - makes a get request to the get all users endpoint
 * then sends a dispatch containg the type of action and response
 * from server
 * @return {object} object to be sent to all reducers
 */
export function getAllUsers() {
  return (dispatch) => {
    axios.get('/api/v1/users')
      .then((response) => {
        dispatch({
          type: 'GOT_ALL_USERS',
          payload: response.data
        });
      });
  };
}

/**
 * getUserDocs - makes a get reques to fetch all documents belonging
 * to the user whose id is passed into the function call
 * then dispatches an action containing the response from the server
 * @param {string} id - id of user to make request for
 * @return {object} object to be sent to all reducers
 */
export function getUserDocs(id) {
  return (dispatch) => {
    axios.get(`/api/v1/users/${id}/documents`)
      .then((response) => {
        dispatch({
          type: 'FETCHED_DOCUMENTS',
          payload: response.data
        });
      });
  };
}


/**
 * getActiveUser - makes a get request to the server to get the
 * information of the user who is currently active. On success, It then
 * dispatches an action containing the user's information
 * @return {object} object to be sent to all reducers
 */
export function getActiveUser() {
  return (dispatch) => {
    axios.get('/api/v1/users/active')
      .then((response) => {
        dispatch({
          type: 'ACTIVE_USER',
          payload: response.data
        });
        dispatch(getUserDocs(response.data.id));
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_GETTING_ACTIVE',
          payload: error.response.data
        });
      });
  };
}

/**
 * getUser - makes a get reques to get information of user whose
 * id was passed during the function call
 * @param {number} id - id of user to make request form
 * @return {object} action object to be sent to all reducers
 */
export function getUser(id) {
  return (dispatch) => {
    axios.get(`/api/v1/users/${id}`)
      .then((response) => {
        dispatch({
          type: 'GOT_USER',
          payload: response.data
        });
      });
  };
}

/**
 * deleteUser - makes a delete request to delete the user whose
 * id was passed during the function call
 * @param {number} id - id of user to make request form
 * @return {object} action object to be sent to all reducers
 */
export function deleteUser(id) {
  return (dispatch) => {
    axios.delete(`/api/v1/users/${id}`)
      .then((response) => {
        dispatch(getUser());
        dispatch(getAllUsers());
        dispatch({
          type: 'DELETE_USER',
          payload: response.data
        });
      });
  };
}

/**
 * updateUser - makes a put request to update the current
 * information of the user whose id was passed during the function call
 * @param {number} id - id of user to make request form
 * @param {object} values - columns to update
 * @return {object} action object to be sent to all reducers
 */
export function updateUser(id, values) {
  return (dispatch) => {
    axios.put(`/api/v1/users/${id}`, values)
      .then((response) => {
        dispatch(getUser());
        dispatch(getAllUsers());
        dispatch({
          type: 'UPDATE_USER_INFO',
          payload: response.data
        });
      });
  };
}
