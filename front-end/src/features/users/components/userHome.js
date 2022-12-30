import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Segment} from 'semantic-ui-react';
import "../stylesUser/User.css"
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
        <Segment className ="infoBox">
            <hr/>
            <ol>
                <li>Fullname: {user?.profile?.fullname?user.profile.fullname:"Niga" }</li>
                <li>Email: {user?.profile?.email}</li>
                <li>Age: {user?.profile?.age}</li>
                <li>Gender: {user?.profile?.sex}</li>
                <li>Adress: {user?.profile?.address}</li>
            </ol>
        </Segment>
        
        </>
    )
}
