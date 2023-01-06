import React, { useEffect, useState } from 'react'
import UsersList from 'features/users/components/userList'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import '../posts/styles/Search.css'
import PostList from './components/PostList';
import { filterPost, getAllPost, searchName } from './postSlice';
import { findUserbyObject } from 'features/users/userSlice';
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name")
  const postlist = useSelector(state=> state.postList.listFilter)
  console.log(postlist)
  const dispatch = useDispatch();
  const userlist = useSelector(state=>state.userList.listUserofObject) 
  console.log(userlist)
  useEffect(()=>{
    dispatch(searchName(name))
    dispatch(findUserbyObject(postlist))
  },[name])
  const handleFilter = ()=>{
    dispatch(filterPost("Book"))
  }
  const handleRefresh= ()=>{
    dispatch(filterPost(""))
  }
  
  return (
    <div className='searchContainer'>
        <h2 className=''>Browse {postlist?.length} results for "{name}"</h2>
        <button type="button" class="btn btn-warning" onClick={handleFilter}>Filter</button>
        <button type="button" class="btn btn-success" onClick={handleRefresh}>Refresh</button>
        {postlist?<PostList postList={postlist}/>:<></>}
    </div>
  )
}
