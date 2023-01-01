import React from 'react'
import PostList from 'features/posts/components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import "./styles/Home.css"
export default function MostSearched() {
  const postList = useSelector(state=> state.postList);
  return (
    <div className='showAll'>
        <h2 className=''>Most Searched</h2>
      <div className='row d-flex flex-wrap justify-content-between'>
          {postList.map((post) => (
            <div className='product'>
            <img src={post.imageUrl[0]} className="d-block" alt="Not found"/>
            <h3 className='text-center'>{post.nameProduct}</h3>
          </div>
          ))}
      </div>
    </div>
  )
}
