import React from 'react'
import UsersList from 'features/users/components/userList'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import '../posts/styles/Search.css'
import PostList from './components/PostList';
export default function Search() {
  function checkSearch(pot) {
    return pot.typeProduct === searchParams.get("typeorder");
  }
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("typeorder")
  const postList = useSelector(state=> state.postList.list);
  return (
    <div className='searchContainer'>
        <h2 className=''>Browse {postList.length} results for "{searchParams.get("typeorder")}"</h2>
        <PostList postList={postList}/>
    </div>
  )
}
