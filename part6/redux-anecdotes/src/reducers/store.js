import { createStore, combineReducers } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import anectodeReducer from "./anecdoteReducer"
import notificationReducer from "./notificationReducer"
import filterReducer from "./filterReducer"


const reducer=combineReducers({
    anecdotes:anectodeReducer,
    notification: notificationReducer,
    filter: filterReducer
});


const store=createStore(reducer, composeWithDevTools());

export default store;
