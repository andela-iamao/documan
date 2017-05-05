import axios from 'axios';

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

export function getUserDocs() {
  return (dispatch) => {
    const userId = JSON.parse(window.localStorage.getItem('user')).data.id;
    axios.get(`/api/v1/users/${userId}/documents`)
      .then((response) => {
        dispatch({
          type: 'FETCHED_DOCUMENTS',
          payload: response.data
        });
      });
  };
}

export function getUser() {
  return (dispatch) => {
    const userId = JSON.parse(window.localStorage.getItem('user')).data.id;
    axios.get(`/api/v1/users/${userId}`)
      .then((response) => {
        dispatch({
          type: 'GOT_USER',
          payload: response.data
        });
      });
  };
}

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
