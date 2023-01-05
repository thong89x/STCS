import React, { useEffect } from 'react'
import { useState } from 'react';
import { Segment } from 'semantic-ui-react'
import { useNavigate, useParams } from 'react-router-dom';

import './AdEditUser.css'
import axios from 'axios';
import { setCredentials } from 'features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AdEditUser() {
  const  {id} =useParams();
  const [user, setUser] = useState();
  const [isActive, setIsActive] = useState();
  const [role, setRole] = useState();
  const [name, setName] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {token} = useSelector(state=> state.auth)

  const handleClickApply = () => {
    console.log(role,isActive,isActive== "Yes")
    const newInfo = {
      role: role,
      isActive: isActive== "Yes"
    }
    const config = {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token? token: 'a'}`,
      },
    };
    axios.defaults.withCredentials = true
    axios.patch('http://localhost:5000/users/v2/'+id,newInfo,config)
    .then((response)=>{
      navigate(-1);
    }).catch((err)=>{
      if (err?.response?.status == 403 ||err?.response?.status == 400  ){
        console.log('sending request token')
        axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
          const accessToken = res.data
          dispatch(setCredentials(accessToken))
          return accessToken
        }).then((res)=>{
          config.headers.Authorization = `Bearer ${res.accessToken}`

          axios.patch('http://localhost:5000/users/v2/'+id,newInfo,config)
          .then((response)=>{
            console.log(response)
            navigate(-1);
          })
        })
        .catch((err)=>{
          navigate('/login')
        })
      }
    })


  };
  useEffect(()=>{
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };
  axios.get(`http://localhost:5000/users/v2/${id}`,config).then((res)=>{
      console.log(res.data)
      const user = res.data;
      setIsActive(user.isActive==true ? "Yes":"No")
      setRole(user.role)
      setName(user.username)
      setUser(user)
      return res.data;
  }).catch((err)=>{
      console.log(err)
  })
  },[])

  const handleClickCancel = () => navigate('/admin')
  
  return (
    <>
    {user?
    <div className="framebox">
    <Segment style={{backgroundColor: "#A0B4F3"}} >
      <div as = 'h1' className='text_header_admin'>
        Edit User
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Id</span>
        <span className="form-control" style={{color: 'grey'}}>{id}</span>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Username</span>
        <span className="form-control">{name}</span>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon3">Role</span>
          <select className="ui dropdown" value={role} onChange={(e)=>setRole(e.target.value)}>
            <option>user</option>
            <option>sub-admin</option> 
          </select>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon4">Active</span>
          <select className="ui dropdown" value={isActive} onChange={(e)=>setIsActive(e.target.value)}>
            <option>Yes</option>
            <option>No</option>
          </select>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon5">Created Time</span>
        <span className="form-control" id="basic-infor3">{user.createdAt}</span>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon6">Last Login</span>
        <span className="form-control" id="basic-infor4">{user.updatedAt}</span>
      </div>

      <div className='btnn row'>
          <button type="submit" className="btn btn-success" onClick={handleClickApply}>Apply</button>
          <button type="submit" className="btn btn-danger" onClick={handleClickCancel}>Cancel</button>
      </div>

    </Segment>
    </div>
    :<></>}
    </>
  )
}
