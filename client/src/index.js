import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist-store';
import App from './components/App.component';
import store from './store';

require('./materialize/sass/materialize.scss');
require('./sass/style.scss');

persistStore(store, {}, () => {
  console.log('restored')
});

ReactDom.render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('react-app'));
