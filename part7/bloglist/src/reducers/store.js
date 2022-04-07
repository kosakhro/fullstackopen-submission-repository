import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./notificationReducer";
import thunk from "redux-thunk";


const reducer=combineReducers({
  //anecdotes:anecdoteReducer,
  notification: notificationReducer,
  //filter: filterReducer
});


const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;
