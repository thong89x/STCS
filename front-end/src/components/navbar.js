import React, { Component, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles/navbar.css';
import LogoGroup from '../assets/Logo.png'
import {BsSearch} from 'react-icons/bs'
import {RiBillLine} from 'react-icons/ri'
import {IoIosInformationCircleOutline} from 'react-icons/io'
import styled from 'styled-components';
import {IoNotifications} from 'react-icons/io5'
import {BsList} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import UseAuth from 'hooks/useAuth';
import NavbarAdmin from 'features/admin/navbarAdmin';
function Navbar(props){
  const { username, role } = UseAuth()
  const searchRef = useRef()
  const Navigate = useNavigate()
  const handleSearch = () => {
    Navigate(`/search?typeorder=${searchRef.current.value}`)
  }

  return(
    
    <Navigation>  
      {role==='admin'?<NavbarAdmin/>:
    <div className='navContainer'>
      <NavLink to ="/home" className='logo'>
        <img src={LogoGroup} alt =""></img>
      </NavLink>
      <div className='navSearch'>
        <div onClick={handleSearch}>
          <BsSearch className='iconSearch'/>
        </div>
        <input ref={searchRef} type="text" placeholder='Search...'/>
      </div>
      <NavLink to ="/Order" className='myOrder'>
        <RiBillLine className='iconBill'/> 
        My Orders
      </NavLink>
      <NavLink to ="/Info" className='information'>
        <IoIosInformationCircleOutline className='iconInf'/>
        About
      </NavLink>
      <NavLink to ="/users" className='information'>
        Users
      </NavLink>
      <NavLink to ="/Notification" className='notification'>
        <IoNotifications className='iconNotify'/>
        Notifications
      </NavLink>
      <div className='list'>
        <BsList className='iconList'/>
      </div>
      {username ? 
      <NavLink to ={`/users/${username}`} className="login">
        {username}
      </NavLink>
      :<NavLink to ="/login" className="login">
        Login
      </NavLink> }
      
    </div>}
    </Navigation>
  )
}

export default Navbar;
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
  background-color: #716DF2;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  padding: 30px 11%;
  .login {
   color: white;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    height: 100px;
  }
  .logo{
    width: 88px;
    cursor: pointer;
    margin-right: 50px;
    img {
      width: 100%;
    }
  }

  .navSearch{
    color: white;
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    
    input:focus ~ .iconSearch {
      display: none;
    }

    .iconSearch{
      color: black;
      width: 20px;
      height: 20px;
      cursor: pointer;
      transform: translateX(285px) translateY(3px);
    }
    
    input {
      border-radius: 10px;
      border: 5px solid white;
      outline: none;
      width: 300px;
    }
  }
  .myOrder{
    color: white;
    padding-right: 20px;
    justify-content: flex-end;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    margin-right: 50px;
    
    .iconBill {
      width: 25px;
      height: 25px;
      margin-right: 5px;
      align-text: center;
      display: flex;
    }
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

  .notification{
    color: white;
    padding-right: 20px;
    justify-content: flex-end;
    text-decoration: none;
    border-radius: 20px;
    display: flex;
    margin-right: 50px;

    .iconNotify{
      width: 25px;
      height: 25px;
      margin-right: 5px;
      display: flex;
    }
  }
  .list{
    color: white;
    padding-right: 20px;
    justify-content: flex-end;
    text-decoration: none;
    border-radius: 20px;
    display: flex;

    .iconList{
      width: 25px;
      height: 25px;
      margin-right: 5px;
      display: flex;
    }
  }
}
`;