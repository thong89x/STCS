import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoList from '../components/TodoList';

import { addPost, removePost} from 'features/todos/todoSlice'
import jwtDecode from 'jwt-decode'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const todoList = useSelector(state=> state.todoList);
    const {token} = useSelector(state=> state.auth);
    useEffect(()=>{
        const config = {
            headers: {
              "Content-Type": "application/json"
            },
          };
        axios.get('http://localhost:5000/posts',config).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    if (token) {
        const decoded = jwtDecode(token)
        const { username, role } = decoded.UserInfo
        console.log(username,role)
    }
    console.log()
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
        {/* <button>
        <NavLink to="/posts/add" className="nav-link">Create Post</NavLink>
        </button>
        <br></br>
        <button onClick={handleAddTodoClick}>Random Todo</button>
        <ul>
        {todoList.map((todo, idx) => (
            <li key={todo.id} onClick={() => handleTodoClick(todo, idx)}>
                {todo.title}
            </li>
        ))}
        </ul> */}
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="https://toigingiuvedep.vn/wp-content/uploads/2021/09/hinh-anh-anime-nam-dep-trai-soai-ca-cute-nhat.jpg" alt="First slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Second slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Third slide"/>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    </div>
  )
}
