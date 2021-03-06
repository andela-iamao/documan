import React from 'react'; //eslint-disable-line
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';

import persistStore from 'redux-persist-store';
import App from './components/App.component';
import store from './store';

require('./materialize/sass/materialize.scss');
require('./font-awesome/scss/font-awesome.scss');
require('./sass/index.scss');
require('froala-editor/css/froala_style.min.css');
require('froala-editor/css/froala_editor.pkgd.min.css');


injectTapEventPlugin();

persistStore(store, {}, () => {
  console.log('restored') //eslint-disable-line
});

if (window.localStorage.getItem('token')) {
  axios.defaults
    .headers.common.Authorization = window.localStorage.getItem('token');
}

ReactDom.render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('react-app'));
