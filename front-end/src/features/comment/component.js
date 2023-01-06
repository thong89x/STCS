import axios from 'axios'
import useAuth from 'hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './component.css'


export default function Comments() {
  const [nameUser,setNameUser] = useState()
  const [content,setContent] = useState()

  useEffect(()=>{
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };
  axios.get(`http://localhost:5000/posts/:id/comment`,config).then((res)=>{
      console.log(res.data)
      const comment = res.data;
      
      setContent(comment.cmtContent)


      
      return res.data;
  }).catch((err)=>{
      console.log(err)
  })
  },[])

  

  return (
    <div>
        <div>
          <div className='nameuser'>
              tesstttt
          </div>
          <div className='cmt'>{content}</div>
        </div>
    </div>
  )
}
