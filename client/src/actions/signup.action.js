import axios from 'axios';
import { setLocalstorage } from '../util/helper';


/**
*  Gets user credentials as param and sends it to the
* signup api using axios
* @param {Object} signupData - contains email and password and basic user info
* @return {Object} returns a dispatch action
*/
export default function (signupData) {
  return (dispatch) => {
    return axios.post('/api/v1/users', signupData)
      .then((response) => {
        setLocalstorage('token', response.data.token)
          .then(() => {
            axios.defaults.headers.common.Authorization = response.data.token;
            dispatch({
              type: 'CREATE_USER',
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
