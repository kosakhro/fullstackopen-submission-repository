import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import blogReducer from "./blogReducer";
import notificationReducer from "./notificationReducer";
import userReducer from "./userReducer";
import thunk from "redux-thunk";


const reducer=combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
});


const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;
