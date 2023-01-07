import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
//import './styles/Order.css'
import { useDispatch,useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import User from 'features/users/components/user';
import userApi from 'api/userApi';
import useAuth from 'hooks/useAuth';
import { setCredentials } from 'features/auth/authSlice';
import jwtDecode from 'jwt-decode'
import { useState } from 'react';
import "../registryOrder/styles/Approach.css"
import { findUserbyObject } from 'features/users/userSlice';

export default function GetRegistryofPost() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const [listRegistry,setlistRegistry] = useState([])
  const userlist = useSelector(state=>state.userList.listUserofObject)
  const {token} = useSelector(state=> state.auth)

  const handleonClickView = (id_element) => {
      navigate("/vieworder/"+id_element)
  }
  const handleonClickApproach = () => {

  }
  useEffect(  ()=>{
  // axios.post(`http://local`)
  const config = {
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token? token: 'a'}`,
    },
  };
  axios.defaults.withCredentials = true
  axios.get(`http://localhost:5000/posts/${id}/registrys`, config)
  .then((response)=>{
      console.log(response.data)
      setlistRegistry(()=> response.data)
      dispatch(findUserbyObject(response.data))
  }).catch((err)=>{
    if (err?.response?.status == 403 ||err?.response?.status == 400  ){
      console.log('sending request token')
      axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
        const accessToken = res.data
        dispatch(setCredentials(accessToken))
        return accessToken
      }).then((res)=>{
          config.headers.Authorization = `Bearer ${res.accessToken} `
          axios.get(`http://localhost:5000/posts/${id}/registrys`, config)
      .then((response)=>{
      console.log(response.data)
      setlistRegistry(()=> response.data)
      dispatch(findUserbyObject(response.data))
  })
      })
      .catch((err)=>{
        navigate('/login')
      })
    }
  })
},[])
  return (
    <div >
      <div className='title'>
           Approach Form Registry 
      </div>
      <div className='row d-flex flex-wrap'>
      {listRegistry.map((element,indx) =>{
        return <div className='col-6 '>
            <div className='form'>
              {userlist[indx].username}
              <div className='answer'>   
                {element.listAnswer[0]}
              </div>
              <div className='Duyet row'>
                <button onClick={()=>handleonClickApproach}>Duyệt</button>
                <button onClick={()=>handleonClickView(element._id)}>Xem</button>
              </div>
            </div> 
          </div>
      }
      )}
      
      </div>
        
      {/* 
        <div className='form'>
          Duy Mai
          <div className='content'>
            <div>Hinh</div>
            <div>Ten</div>
          </div>
          <div className='Duyet'>
            <div>Duyet</div>
            <div>Xem</div>
          </div>
        </div> */}
    </div>
  )
}
