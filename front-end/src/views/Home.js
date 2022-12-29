import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoList from '../components/TodoList';
import { NavLink } from 'react-router-dom';
import { addPost, removePost} from 'features/todos/todoSlice'
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import styled from 'styled-components';
import "./styles/Home.css"
import "./Home.css"
import { NavLink } from 'react-router-dom';

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
    const postList = useSelector(state=> state.postList.slice(0,4));
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
  useEffect(() => {

  }, [])
  return (  
    <div className='homeContainer'>

    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://hangthanhly436.com/wp-content/uploads/2022/02/banner.jpg" class="d-block w-100" alt="Not found"/>
    </div>
    <div class="carousel-item">
      <img src="https://thanhlyngay.vn/wp-content/uploads/2019/03/banner-1-1752x730.png" class="d-block w-100" alt="Not Found"/>
    </div>
    <div class="carousel-item">
      <img src="https://th.bing.com/th/id/R.cbb2977aec1c607b5ed54884e5c9e74a?rik=TMhNpDO2nFsKrA&pid=ImgRaw&r=0" class="d-block w-100" alt="..."/>
    </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>
      <NavLink to ="/posts/add">
        <button>
          New post
        </button>
      </NavLink>
      <div className='row mt-3 '>
        <h2 className='col-4'>Recommend for you </h2>
          <button className='col-1 rounded-pill'>
            <NavLink  to ="/showall">
              Show all
            </NavLink>
          </button>
      </div>
      <div className='row d-flex flex-wrap justify-content-between'>
          {postList.map((post) => (
            <div className='product'>
            <img src={post.imageUrl[0]} class="d-block" alt="Not found"/>
            <h3 className='text-center'>{post.nameProduct}</h3>
          </div>
          ))}
      </div>
      <div className='row mt-3 '>
        <h2 className='col-4'>Most Searched </h2>
        <button className='col-1 rounded-pill'>
            <NavLink  to ="/mostsearched">
              Show all
            </NavLink>
          </button>
      </div>
      <div className='row d-flex flex-wrap justify-content-between'>
          {postList.map((post) => (
            <div className='product'>
            <img src={post.imageUrl[0]} class="d-block" alt="Not found"/>
            <h3 className='text-center'>{post.nameProduct}</h3>
          </div>
          ))}
      </div>
    </div>
  )
}

