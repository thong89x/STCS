import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
    todoReducer
} from "./Reducers/todoReducer";

import {
    userReducer
} from "./Reducers/userReducer";

const reducer = combineReducers({
    todoList: todoReducer,
    user: userReducer
});

  
const store = createStore(
    reducer
);
  
export default store;