import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { removePost,updatePost,addPost} from 'features/posts/postSlice'
import { PostTiny } from './Post';
import { useNavigate } from 'react-router-dom';
export default function PostList() {
    const postList = useSelector(state=> state.postList);
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    const handleRemoveClick = (post) => {
        const action = removePost(post.id);
        dispatch(action);
    }
    const handleEditClick = (post) => {
        navigate(`/posts/edit/${post.id}`)
        // const action = updatePost(post);
        // dispatch(action);
    }
  return (
    <div>
        Post List
        <ul>
        {postList.map((post) => (
            <PostTiny post={post} handleRemoveClick={handleRemoveClick} handleEditClick={handleEditClick}/>
        ))}
        </ul>
    </div>
  )
}
