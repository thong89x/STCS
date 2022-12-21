import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from './user'
import userApi from '../../../api/userApi'
import axios from 'axios';
export default function UsersList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [usersList,setUsersList] = useState([])
    useEffect(()=>{
        const FetchuserList = async()=>{
            try{
                console.log("hi")
                const response = await axios.get('http://localhost:5000/users')
                // const response = await userApi.getAll()
                setUsersList(()=> response.data )
                console.log(response.data)
            }catch(err){
                console.log(err);
            }
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
            return <User user={currentuser} key={currentuser._id}/>;
            })
          }
          </tbody>
        </table>
    </div>
  )
}
