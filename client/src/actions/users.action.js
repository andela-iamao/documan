import axios from 'axios';
//
// export default token => ({
//   return (dispatch) => {
//     axios.post('http://localhost:5000/api/v1/users/login', loginData)
//       .then((response) => {
//         dispatch({
//           type: 'LOGIN_USER',
//           payload: response.data
//         });
//         dispatch({
//           type: 'CLEAR_ERROR'
//         });
//         axios.defaults.headers.common.Authorization = response.data.token;
//       })
//       .catch((error) => {
//         dispatch({
//           type: 'VALIDATION_ERROR',
//           payload: error.response.data.message
//         });
//       });
//   };
// });

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
