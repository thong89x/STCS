import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Image,Segment} from 'semantic-ui-react';
import "../stylesUser/User.css"
import { NavLink } from 'react-router-dom';
export default function UserHome() {
    const [user,setUser]=useState()
    const {username} = useParams()
    useEffect(()=>{
        const config = {
            headers: {
              "Content-Type": "application/json"
            },
          };
        axios.get(`http://localhost:5000/users/v1/${username}`,config).then((res)=>{
            console.log(res.data)
            setUser(res.data)
            return res.data;
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return (
        <>
        <Image middle src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular centered/>
        <h2 id = "centerText"> {user?.username }   </h2>
        <Segment className ="infoBox">
            <ol>
                <li>Fullname: {user?.profile?.fullname }</li>
                <li>Email: {user?.profile?.email}</li>
                <li>Age: {user?.profile?.age}</li>
                <li>Gender: {user?.profile?.sex}</li>
                <li>Adress: {user?.profile?.address}</li>
            </ol>
        </Segment>
        <button id ="centerButton"> 
            <NavLink to={`/users/edit/${username}`} > Edit thông tin cá nhân </NavLink>
        </button>
        </>
    )
}
