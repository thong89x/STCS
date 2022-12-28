import React from "react"
import PropTypes from 'prop-types'
import './styles/todoList.css'
TodoList.prototype = {
    todoList : PropTypes.array,
    activeID : PropTypes.number,
    onTodoClick : PropTypes.func
}
TodoList.defaultProps = {
    todoList : [],
    activeID : null,
    onTodoClick : null
}

export default function TodoList(props) {
    const {todoList,activeID,onTodoClick} = props;
    const handleClick = (todo)=>{
      if(onTodoClick){
        onTodoClick(todo)
      }
    }
  return (
    <ul className="todo-list">
        {todoList.map(todo=>(<li 
                            key={todo.id} 
                            className = {todo.id ===activeID? 'active' : ''}
                            onClick={()=>handleClick(todo)}>
          {todo.title}
          </li>))}
    </ul>
  )
}
