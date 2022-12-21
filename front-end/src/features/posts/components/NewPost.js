import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { addPost, removePost} from 'features/posts/postSlice'
import { useDispatch } from 'react-redux'

export default function NewPost() {
    const [name,setName] = useState("Găng tay thanos")
    const [desc,setDesc] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = event =>{
        event.preventDefault()  
        const newID = 1000 + Math.floor(Math.random()*1000+ 9000);
        const newPost = {
            id: newID,
            name: name,
            desc: desc
        }
        const action = addPost(newPost)
        dispatch(action)
        navigate('/posts')
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="form-group row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
            <input type="text" className="form-control-plaintext" id="staticEmail" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Mô tả</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" id="inputPassword" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Hàng mới dùng 2 lần. 1 Chống Pháp. 1 Chống Mỹ"/>
            </div>
        </div>
        <button type="submit" className="btn btn-primary mb-2" >Confirm identity</button>
    </form>
    </>
  )
}
