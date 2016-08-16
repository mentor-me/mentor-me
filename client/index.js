import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
/* Routes */
import routes from './routes';
/* Reducers */
import reducers from './reducers';
/* Reducers */
import { AUTH_USER }  from './actions/actionTypes.js';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f, autoRehydrate());
persistStore(store, {blacklist: ['chatBox']});

const token = localStorage.getItem('token');
if(token) {
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app'));
