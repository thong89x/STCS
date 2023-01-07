import React, { Component, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UseAuth from 'hooks/useAuth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logOut } from 'features/auth/authSlice';
export default function NavbarAdmin(props){
//   const searchRef = useRef()
//   const Navigate = useNavigate()
//   const handleSearch = () => {
//     Navigate(`/search?typeorder=${searchRef.current.value}`)
//   }
const dispatch = useDispatch()
const handleLogout = () => {
  dispatch(logOut())
  axios.post('http://localhost:5000/auth/logout')
  localStorage.removeItem("userInfo")
}
const { username, role } = UseAuth()
  return(
    <Navigation>
    <div className='navContainer'>
      <NavLink to ="/annoucements">
        <button className='announcements'> Announcements</button>
      </NavLink>
      <NavLink to ="/admin">
        <button className='useracc'> User's Account</button>
      </NavLink>
      <NavLink to ="/report">
        <button className='report'> Reports</button>
      </NavLink>

      {username ? 
      <NavLink to ={`/users/${username}`} className="login">
        {username}
      </NavLink>
      :<NavLink to ="/login" className="login">
        Login
      </NavLink> }
      <NavLink to ={`/login`} onClick={()=>handleLogout()} className="login">
        Logout
      </NavLink>
    </div>
    </Navigation>
  )
}
const Navigation = styled.div`
width: 100%;
height: 80px;
position: relative;
top: 0;
// transition-timing-function: ease-in;
// transition: all 1s;

@media only screen and (max-width: 600px) {
  height: 100px;
}
.navContainer{
  background-color: #255b79;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
  padding: 30px 100px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    height: 100px;
  }

  .announcements{

    :active{
      color: #2e88c9;
      background-color: white;
      border: 2px solid white;
    }

    :hover{
      color: #2e88c9;
      background-color: white;
      border: 2px solid white;
    }

    padding: 5px 10px 20px 10px;
    font-size: 24px;
    font-family: Lucida Sans;
    font-weight: bold;
    color: white;
    border-radius: 15px 15px 0px 0px;
    background-color: #2e88c9;
    border: 2px solid #2e88c9;
    margin-right: 30px;
    filter: drop-shadow(0 0 0.75rem black)
  }

  .useracc{

    :active{
      color: #2e88c9;
      background-color: white;
      border: 2px solid white;
    }

    :hover{
      color: #2e88c9;
      background-color: white;
      border: 2px solid white;
    }

    padding: 5px 10px 20px 10px;
    font-size: 24px;
    font-family: Lucida Sans;
    font-weight: bold;
    color: white;
    border-radius: 15px 15px 0px 0px;
    background-color: #2e88c9;
    border: 2px solid #2e88c9;
    margin-right: 30px;
    filter: drop-shadow(0 0 0.75rem black)
  }

  .report{

    :active{
      color: #2e88c9;
      background-color: white;
      border: 2px solid white;
    }

    :hover{
      color: #2e88c9;
      background-color: white;
      border: 2px solid white;
    }

    padding: 5px 10px 20px 10px;
    font-size: 24px;
    font-family: Lucida Sans;
    font-weight: bold;
    color: white;
    border-radius: 15px 15px 0px 0px;
    background-color: #2e88c9;
    border: 2px solid #2e88c9;
    margin-right: 30px;
    filter: drop-shadow(0 0 0.75rem black)
  }

  .information{
    color: white;
    padding-right: 20px;
    justify-content: flex-end;
    text-decoration: none;
    border-radius: 20px;
    display: flex;
    margin-right: 50px;

    .iconInf{
      width: 25px;
      height: 25px;
      margin-right: 5px;
      display: flex;
    }
  }
}
`;