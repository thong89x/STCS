import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoList from '../components/TodoList';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { addPost, getAllPost, removePost, selectList, selectLoadingState} from '../features/posts/postSlice'
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import styled from 'styled-components';
import "./styles/Home.css"
import useAuth from 'hooks/useAuth';
import PostList from 'features/posts/components/PostList';

export default function Home() {
    const {token} = useSelector(state=> state.auth);
    const {username, role} = useAuth()
    let [searchParams, setSearchParams] = useSearchParams();
    const postList = useSelector(state=>state.postList.listFilter) 
    const userlist = useSelector(state=>state.userList.listUserofObject) 
    console.log(userlist)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const componentDidMount = (props) => {  
      if(role === "viewer"){
        return "/login"
      }
      return props
    }

    useEffect(()=>{
      dispatch(getAllPost(""))
    },[])
  return (  
    <div className='homeContainer'>
      <div  className='subhomeContainer'>
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://hangthanhly436.com/wp-content/uploads/2022/02/banner.jpg" className="d-block w-100" alt="Not found"/>
    </div>
    <div className="carousel-item">
      <img src="https://thanhlyngay.vn/wp-content/uploads/2019/03/banner-1-1752x730.png" className="d-block w-100" alt="Not Found"/>
    </div>
    <div className="carousel-item">
      <img src="https://th.bing.com/th/id/R.cbb2977aec1c607b5ed54884e5c9e74a?rik=TMhNpDO2nFsKrA&pid=ImgRaw&r=0" className="d-block w-100" alt="..."/>
    </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
    </div>
      <NavLink to ={componentDidMount("/posts/add")}>
        <button className='newpost'>
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
      <PostList postList={postList}/>
      <div className='row mt-3'>
        <h2 className='col-4'>Most Searched </h2>
        <button className='col-1 rounded-pill'>
            <NavLink  to ="/mostsearched">
              Show all
            </NavLink>
          </button>
      </div>
      <PostList postList={postList}/>
      </div>
    </div>
  )
}

