import {createStore, applyMiddleware} from 'redux';
import thunkMiddle from 'redux-thunk';

import actions from './actions';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddle)
);

export default store;

