import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import users from './user.reducer';

export default combineReducers({
  users,
  form
});
