import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { removePost,updatePost,addPost} from 'features/posts/postSlice'
import { PostTiny } from './Post';
import { useNavigate } from 'react-router-dom';
export default function PostList(props) {
    const navigate = useNavigate()
   const postList = props.postList
  return (
    <div className='row d-flex flex-wrap justify-content-between'>
        {postList?postList.map((post) => (
            
            <div key={post._id} className='product mb-4 mt-4' onClick={()=>{
              navigate('/posts/'+post._id)
            }}>
              {post.imageURL?
              <img src={post.imageURL[0]?post.imageURL[0]:"https://react.semantic-ui.com/images/wireframe/square-image.png"} className="d-block" onError={({currentTarget}) => {
                currentTarget.onError = null;
                currentTarget.src ='https://react.semantic-ui.com/images/wireframe/square-image.png'
              }} alt="Not found"/>
              :<>
                <img src={"https://react.semantic-ui.com/images/wireframe/square-image.png"} className="d-block" onError={({currentTarget}) => {
                currentTarget.onError = null;
                currentTarget.src ='https://react.semantic-ui.com/images/wireframe/square-image.png'
              }} alt="Not found"/>
              </>
              }          
              <h3 className='text-center'>{post.nameProduct}</h3>
          </div>
          )):<div></div>}
    </div>
  )
}
