import React from 'react'
import UsersList from 'features/users/components/userList'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import '../posts/styles/Search.css'
export default function Search() {
  function checkSearch(pot) {
    return pot.typeProduct === searchParams.get("typeorder");
  }
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("typeorder")
  const postList = useSelector(state=> state.postList);
  console.log(postList)
  return (
    <div className='searchContainer'>
        <h2 className=''>Browse {postList.length} results for "{searchParams.get("typeorder")}"</h2>
      <div className='row d-flex flex-wrap justify-content-between'>
          {postList.map((post) => (
            <div className='product'>
            {post.imageUrl?
              <img src={post.imageUrl[0]?post.imageUrl[0]:"https://th.bing.com/th/id/OIP.hjEu2V3As5q1pr7ZJ3CtnQHaJT?pid=ImgDet&rs=1"} class="d-block" alt="Not found"/>
              :<>
                <img src={"https://th.bing.com/th/id/OIP.hjEu2V3As5q1pr7ZJ3CtnQHaJT?pid=ImgDet&rs=1"} class="d-block" alt="Not found"/>
              </>
              }
            <h3 className='text-center'>{post.nameProduct}</h3>
          </div>
          ))}
      </div>
    </div>
  )
}
