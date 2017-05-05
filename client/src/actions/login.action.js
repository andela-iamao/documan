import axios from 'axios';
import { setLocalstorage } from '../util/helper';

/**
* loginUser gets user credentials as param and sends it post it
* login api using axios
* @param {Object} loginData - contains email and password
* @return {Object} returns a dispatch action
*/
export default function (loginData) {
  return (dispatch) => {
    axios.post('/api/v1/users/login', loginData)
      .then((response) => {
        setLocalstorage('token', response.data.token)
          .then(() => {
            axios.defaults.headers.common.Authorization = response.data.token;
            dispatch({
              type: 'LOGIN_USER',
              payload: response.data
            });
            dispatch({
              type: 'CLEAR_ERROR'
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: 'VALIDATION_ERROR',
          payload: error.response.data.message
        });
      });
  };
}
