import React, { useEffect, useState } from 'react'
import UsersList from 'features/users/components/userList'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import '../posts/styles/Search.css'
import PostList from './components/PostList';
import { filterPost, searchPost } from './postSlice';
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name")
  const ls = useSelector(state=> state.postList.list)
  const postlist = useSelector(state=> state.postList.listFilter)
  console.log(searchParams.get("typeorder"))
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(searchPost(name?name:" "))
  },[])
  const handleFilter = ()=>{
    dispatch(filterPost("Book"))
  }
  const handleRefresh= ()=>{
    dispatch(filterPost(""))
  }

  return (
    <div className='searchContainer'>
        <h2 className=''>Browse {postlist.length} results for "{searchParams.get("typeorder")}"</h2>
        {postlist?<PostList postList={postlist}/>:<></>}
        <button onClick={handleFilter}>filter</button>
        <button onClick={handleRefresh}>filter</button>
    </div>
  )
}
