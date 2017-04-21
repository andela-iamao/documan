// // import
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
