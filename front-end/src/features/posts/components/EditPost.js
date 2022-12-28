 import React, { useState } from 'react'
 import { useDispatch, useSelector } from 'react-redux';
 import { useNavigate, useParams } from 'react-router-dom';
 import { updatePost} from 'features/posts/postSlice'
 export default function EditPost() {
    const {id} = useParams();
    const editPost = useSelector(state=>state.postList).find(x=> x.id===+id)
    const [name,setName] = useState(editPost.name)
    const [desc,setDesc] = useState(editPost.desc)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        const newPost = {
            id: editPost.id,
            name: name,
            desc: desc,
            imgUrl:editPost.imgUrl
        }
        const action = updatePost(newPost);
        dispatch(action);
        navigate('/posts')
    }
   return (
     <form onSubmit={handleSubmit}>
        Edit Post {id}
        <div className="form-group row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" id="staticEmail" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Mô tả</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" id="inputPassword" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            </div>
        </div>
        <button type="submit" className="btn btn-primary mb-2" >Confirm Edit</button>
    </form>
   )
 }
 