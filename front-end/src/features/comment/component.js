import axios from 'axios'
import useAuth from 'hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './component.css'
import 'react-rater/lib/react-rater.css'
import Rater from 'react-rater'


export default function Comments(props) {
  const [nameUser,setNameUser] = useState()
  const [listComment,setListComment] = useState([])
  const id = props.id



  useEffect(()=>{
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };
  axios.get(`http://localhost:5000/postss/${id}/comment`,config).then((res)=>{
      console.log(res.data)
      setListComment(res.data)

      return res.data;
      
  }).catch((err)=>{
      console.log(err)
  })
  },[])


  return (
    <div>
        {
        listComment.map((comment) => { 
          return (
          <div className='row'>
            <div>
              <div className='nameuser col'>{comment.userID}</div>
              <span className='ratee col' id ="orangeText">{comment.starRatings}/5</span>
              <Rater coloer total={5} rating={comment.starRatings} interactive={false}/>
            </div>
            <div className='cmt'>{comment.cmtContent}</div>
          </div>
          )
        })
        }
    </div>
  )
}
