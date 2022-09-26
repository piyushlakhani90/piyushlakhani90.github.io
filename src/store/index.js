import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allReducers from './reducers/index.js';
import promise from "redux-promise";


export default function configureStore(initialState) {
  return createStore(
    allReducers,
    initialState,
    applyMiddleware(thunk, promise)
  );
}
