import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
//import './styles/Order.css'
import { useDispatch,useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import User from 'features/users/components/user';
import userApi from 'api/userApi';
import useAuth from 'hooks/useAuth';
import { setCredentials } from 'features/auth/authSlice';
import jwtDecode from 'jwt-decode'
import { useState } from 'react';

export default function RegistryOwner() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const {id} = useParams()
    const [listRegistry,setlistRegistry] = useState()
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
    axios.get('http://localhost:5000/users/v1/username/registrys',config)
    .then((response)=>{
        console.log(response.data)
        setlistRegistry(()=> response.data)
    }).catch((err)=>{
      if (err?.response?.status == 403 ||err?.response?.status == 400  ){
        console.log('sending request token')
        axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
          const accessToken = res.data
          dispatch(setCredentials(accessToken))
          return accessToken
        }).then((res)=>{
          config.headers.Authorization = `Bearer ${res.accessToken}`
          axios.get('http://localhost:5000/users/v1/username/registrys',config)
          .then((response)=>{
              console.log(response.data)
              setlistRegistry(()=> response.data)
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
    </div>
  )
}
