import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoList from '../components/TodoList';

import { addPost, removePost} from 'features/todos/todoSlice'


export default function Home() {
    const todoList = useSelector(state=> state.todoList);
    // const activeID = useSelector(state=> state.todoList.activeID);

    const dispatch = useDispatch()
    console.log(todoList)
    const handleAddTodoClick = () =>{
        const newID = 1000 + Math.floor(Math.random()*1000+ 9000);
        const newTodo ={
            id: newID,
            title: `Todo ${newID} `
        }
        const action = addPost(newTodo)
        dispatch(action)
    }
    const handleTodoClick = (todo, idx) => {
        const action = removePost(idx);
        dispatch(action);
    }
  return (  
    <div className='home-page'>
        <button onClick={handleAddTodoClick}>Random Todo</button>
        <ul>
        {todoList.map((todo, idx) => (
            <li key={todo.id} onClick={() => handleTodoClick(todo, idx)}>
                {todo.title}
            </li>
        ))}
        </ul>
    </div>
  )
}
