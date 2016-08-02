import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
/* Routes */
import routes from './routes';
/* Reducers */
import reducers from './reducers';
/* Reducers */
import { AUTH_USER }  from './actions/actionTypes.js';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : null)

const token = localStorage.getItem('token');

if(token) {
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app'));
