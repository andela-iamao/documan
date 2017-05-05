import axios from 'axios';

/**
 * signout
 * Sends a post reques to the logout endpoint and then dispatches
 * a signout action
 * @return {object} object to send to reducers
 */
export default function signout() {
  return (dispatch) => {
    axios.post('/api/v1/users/logout')
      .then(() => {
        window.localStorage.clear();
        window.location = `${window.location.origin}/app/login`;
        dispatch({
          type: 'SIGN_OUT_USER'
        });
      })
      .catch(() => {
        dispatch({
          type: 'ERROR_SIGNING_OUT'
        });
      });
  };
}
