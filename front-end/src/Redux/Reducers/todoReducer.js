import {
  ADD_TODO,
  SET_ACTIVE_TODO
} from "../Constains/todoConstains";

const initialState ={
  list : [],
  activeID: null
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TODO:
        return {
          ...state,
          list:[...state.list,action.payload]
        };
      case SET_ACTIVE_TODO:
        const newID = action.payload.id
        return {
          ...state,
          activeID:newID,
        };
      default:
        return state;
    }
  };