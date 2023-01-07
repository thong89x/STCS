import React, { useEffect, useState } from 'react'
import UsersList from 'features/users/components/userList'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import '../posts/styles/Search.css'
import PostList from './components/PostList';
import { filterPost, getAllPost, searchName } from './postSlice';
import { findUserbyObject } from 'features/users/userSlice';
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name")
  const type = searchParams.get("type")
  const postlist = useSelector(state=> state.postList.listFilter)
  console.log(postlist)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(searchName(name))
  },[])
  useEffect(()=>{
    dispatch(searchName(name))
  },[name])
  useEffect(()=>{
    dispatch(filterPost(type))
  },[type])

  const handleFilter = (type_)=>{
    console.log(type_)
    setSearchParams({type:type_,name:name})
  }
  const handleRefresh= ()=>{
    dispatch(filterPost(""))
  }
  
  return (
    <div className='searchContainer'>
        <h2 className=''>Browse {postlist?.length} results for "{name}"</h2>
        <select className="ui dropdown"  onChange={(e)=>handleFilter(e.target.value)}>
            <option>books</option>
            <option>clothes</option>
            <option>school supplies</option>
          </select>
        <button type="button" class="btn btn-success" onClick={handleRefresh}>Refresh</button>
        {postlist?<PostList postList={postlist}/>:<></>}
    </div>
  )
}
