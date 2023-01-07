import React from 'react'
import PostList from 'features/posts/components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import "./styles/Home.css"
export default function MostSearched() {
  const postList = useSelector(state=> state.postList.listFilter);
  return (
    <div className='showAll'>
        <h2 className=''>Recommend for you</h2>
        <PostList postList={postList}/>
    </div>
  )
}
