import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from 'features/auth/authSlice';
import { useState } from 'react';
import './styles/Order.css'
import { useDispatch,useSelector } from 'react-redux';
import { Outlet, useNavigate , useParams} from 'react-router-dom';
import User from 'features/users/components/user';
import userApi from 'api/userApi';
import useAuth from 'hooks/useAuth';
import { setCredentials } from 'features/auth/authSlice';
import jwtDecode from 'jwt-decode'
import { useState, useRef } from 'react';
import axios from 'axios'

export default function Order() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [usersList,setUsersList] = useState([])
  const {id} = useParams();
  const ques1Ref = useRef();// dungf cho oo input chi lay du lieu
  const ques2Ref = useRef();
  const ques3Ref = useRef();
  const ques4Ref = useRef();
  const ques5Ref = useRef();
  // useState -> gia tri cua 1 bien thay doi thi no load lai 1 phan man hinh

  const postID = id;
  const {token} = useSelector(state=> state.auth)
  const HandleSubmit = ()=>{
    const listAnswer = [ques1Ref.current.value,ques2Ref.current.value,ques3Ref.current.value,ques4Ref.current.value,ques5Ref.current.value];
    const newRegistry = {
      listAnswer:listAnswer,
      postID: postID
    }
    console.log(newRegistry)
    // axios.post(`http://local`)
    const config = {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token? token: 'a'}`,
      },
    };
    axios.defaults.withCredentials = true
    axios.post('http://localhost:5000/registrys',newRegistry,config)
    .then((response)=>{
        console.log(response.data)
        setUsersList(()=> response.data)
        console.log(usersList)
    }).catch((err)=>{
      if (err?.response?.status == 403 ||err?.response?.status == 400  ){
        console.log('sending request token')
        axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
          const accessToken = res.data
          console.log(accessToken)
          dispatch(setCredentials(accessToken))
          return accessToken
        }).then((res)=>{
          console.log(res.accessToken)
          config.headers.Authorization = `Bearer ${res.accessToken}`
          axios.get('http://localhost:5000/users/v2',config)
          .then((response)=>{
              console.log(response.data)
              setUsersList(()=> response.data)
              console.log(usersList)
          })
        })
        .catch((err)=>{
          navigate('/login')
        })
      }
    })
  }
  return (

    <div className='order'>
        <div className='box'>Form Registry Order</div>
        <div className='background-input'>
        <div className='input'>Why do you need the item?:</div>
        <input ref={ques1Ref}className='input_text' placeholder='Enter your answer.'/>
        <div className='input_double'>
        <div className='input'>Do you need it right now?:</div>
        <input ref={ques2Ref}className='input_text' placeholder='Enter your answer.'/>
        <div className='input'>What is your degree?</div>
        <input ref={ques3Ref}className='input_text' placeholder='Enter your answer.'/>
        </div>
        <div className='input'>New publisher of LOL video game?</div>
        <input ref={ques4Ref}className='input_text' placeholder='Enter your answer.'/>
        <div className='input'>Can you please rate 5 stars for my shop?</div>
        <input ref={ques5Ref}className='input_text' placeholder='Enter your answer.'/>
        <div className='space '/>
        <button onClick={HandleSubmit} className='button'>Confirm</button>
        </div>
    </div>
  )
}


