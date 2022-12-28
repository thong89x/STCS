
import {
    ADD_TODO,
    SET_ACTIVE_TODO
} from "../Constains/todoConstains";
  
export const addNewTodo = (todo)=>{
    return {
        type:ADD_TODO,
        payload:todo
    }
}
export const setActiveTodo = (todo)=>{
    return {
        type:SET_ACTIVE_TODO,
        payload:todo
    }
}