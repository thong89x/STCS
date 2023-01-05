import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from 'hooks/useAuth';
import { setCredentials } from 'features/auth/authSlice';

export default function ManageUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ManageUser,setUsersList] = useState([])
  const {token} = useSelector(state=> state.auth)
  const {role} = useAuth()

  useEffect(()=>{
      const FetchuserList = async()=>{
        const config = {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token? token: 'a'}`,
          },
        };
        axios.defaults.withCredentials = true
        axios.get('http://localhost:5000/users/v2',config)
        .then((response)=>{
            setUsersList(()=> response.data)
        }).catch((err)=>{
          if (err?.response?.status == 403 ||err?.response?.status == 400  ){
            console.log('sending request token')
            axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
              const accessToken = res.data
              dispatch(setCredentials(accessToken))
              return accessToken
            }).then((res)=>{
              config.headers.Authorization = `Bearer ${res.accessToken}`
              axios.get('http://localhost:5000/users/v2',config)
              .then((response)=>{
                  setUsersList(()=> response.data)
              })
            })
            .catch((err)=>{
              navigate('/login')
            })
          }
        })
      }
      FetchuserList()
  },[])

    
  return (
    <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login </th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            ManageUser.map(currentuser => {
            return <User user={currentuser} key={currentuser._id}/>;
            })
          }
          </tbody>
        </table>
    </div>
  )
}

const User = (props) => {
  return (
    <tr>
      <td>{props.user._id}</td>
      <td>{props.user.username}</td>
      <td>{props.user.role}</td>
      <td>{props.user.isActive? 'Active':'Ban'}</td>
      <td>{props.user.lastLogin.substring(0,10)}</td>
      <td>{props.user.createdAt? props.user.createdAt.substring(0,10):''}</td>
      
      <td>
        <Link to={"/admin/account/edit/"+props.user._id}>edit</Link> | <a href="/#">delete</a>
      </td>
    </tr>
  )
}