import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import './styles/Order.css'
import { useDispatch,useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import User from 'features/users/components/user';
import userApi from 'api/userApi';
import useAuth from 'hooks/useAuth';
import { setCredentials } from 'features/auth/authSlice';
import jwtDecode from 'jwt-decode'
import { useState } from 'react';

export default function ViewOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const {id} = useParams()
    const [listAnswer,setlistAnswer] = useState()
    const {token} = useSelector(state=> state.auth)
    useEffect(  ()=>{
    // axios.post(`http://local`)
    const config = {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token? token: 'a'}`,
      },
    };
    axios.defaults.withCredentials = true
    axios.get('http://localhost:5000/registrys/'+id,config)
    .then((response)=>{
        console.log(response.data)
        setlistAnswer(()=> response.data.listAnswer)
    }).catch((err)=>{
      if (err?.response?.status == 403 ||err?.response?.status == 400  ){
        console.log('sending request token')
        axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
          const accessToken = res.data
          dispatch(setCredentials(accessToken))
          return accessToken
        }).then((res)=>{
          config.headers.Authorization = `Bearer ${res.accessToken}`
          axios.get('http://localhost:5000/registrys/'+id,config)
          .then((response)=>{
              console.log(response.data)
              setlistAnswer(()=> response.data.listAnswer)
          })
        })
        .catch((err)=>{
          navigate('/login')
        })
      }
    })
},[])
  return (
    <div className='order'>
        <div className='box'>Form Registry Order
        </div>
        <div className='background-input'>
        <div className='input'>Why do you need the item?:
        <div>
        <div className='input_text'>{listAnswer?listAnswer[0]:'ko co'}</div>
        </div>
        </div>
        <div className='input'>Do you need it right now?:
        </div>
        <div className='input_text'>{listAnswer?listAnswer[1]:'ko co'}</div>
        <div className='input'>What is your degree?
        </div>
        <div className='input_text'>{listAnswer?listAnswer[2]:'ko co'}</div>
        <div className='input'>New publisher of LOL video game?
        </div>
        <div className='input_text'>{listAnswer?listAnswer[3]:'ko co'}</div>
        <div className='input'>Can you please rate 5 stars for my shop?
        </div>
        <div className='input_text'>{listAnswer?listAnswer[4]:'ko co'}</div>
        <div className='space '/>
        </div>
    </div>
  )
}
