import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from './user'
import userApi from '../../../api/userApi'
import axios from 'axios';
import useAuth from 'hooks/useAuth';
import { setCredentials } from 'features/auth/authSlice';
import jwtDecode from 'jwt-decode'
export default function UsersList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [usersList,setUsersList] = useState([])
    const {token} = useSelector(state=> state.auth)
    const {role} = useAuth()
    console.log(token)

    console.log(role)
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
            usersList.map(currentuser => {
              console.log(currentuser)
            return <User user={currentuser} key={currentuser._id}/>;
            })
          }
          </tbody>
        </table>
    </div>
  )
}
