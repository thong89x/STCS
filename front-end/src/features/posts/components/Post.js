import React from 'react'
import { useParams } from 'react-router-dom';

export default function Post() {
    // const id = useParams()
  return (
    <div>Post</div>
  )
}
export const PostTiny= (props) =>{
    const currentPost = props.post;
    return (
        <li key={currentPost.id} >
            <figure className="figure" >
                <img src={currentPost.imgUrl} className="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure."/>
                <figcaption className="figure-caption text-right">{currentPost.name}|{currentPost.desc}</figcaption>
                <button type="button" className="btn btn-outline-success" onClick={() => props.handleEditClick(currentPost)}>Edit</button>
                <button type="button" className="btn btn-outline-danger" onClick={() => props.handleRemoveClick(currentPost)}>Delete</button>
            </figure>
        </li>
    )
}
  