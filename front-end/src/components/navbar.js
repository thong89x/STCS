import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles/navbar.css';
import LogoGroup from '../assets/Logo.png'
import {BsSearch} from 'react-icons/bs'
import {RiBillLine} from 'react-icons/ri'
import {IoIosInformationCircleOutline} from 'react-icons/io'
import styled from 'styled-components';
import {IoNotifications} from 'react-icons/io5'
import {BsList} from 'react-icons/bs'
// code mau nho sua
// export default class Navbar extends Component {

//   render() {
//     return (
//       <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
//         <NavLink to="/home" className="navbar-brand">Logo</NavLink>
//         <div className="collpase navbar-collapse">
//         <ul className="navbar-nav mr-auto">
//           <li className="navbar-item">
//           <NavLink to="/home" className="nav-link">Home</NavLink>
//           </li>
//           <li className="navbar-item">
//           <NavLink to="/posts" className="nav-link">Posts</NavLink>
//           </li>
//           <li className="navbar-item">
//           <NavLink to="/post" className="nav-link">Post</NavLink>
//           </li>
//         </ul>
//         </div>
//       </nav>
      
//     );
//   }
// }

function navbar(props){


  return(
    <Navigation>
    <div className='navContainer'>
      <NavLink to ="/home" className='logo'>
        <img src={LogoGroup} alt =""></img>
      </NavLink>
      <div className='navSearch'>
        <div>
          <BsSearch className='iconSearch'/>
        </div>
        <input type="text" placeholder='Search...'/>
      </div>
      <div className='myOrder'>
        <RiBillLine className='iconBill'/> 
        My Orders
      </div>
      <div className='information'>
        <IoIosInformationCircleOutline className='iconInf'/>
        About
      </div>
      <div className='notification'>
        <IoNotifications className='iconNotify'/>
        Notifications
      </div>
      <div className='list'>
        <BsList className='iconList'/>
      </div>
    </div>
    </Navigation>
  )
}

export default navbar;
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
  justify-content: flex-start;
  height: 100%;
  padding: 30px 100px;

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