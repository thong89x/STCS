import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
// code mau nho sua
export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        <NavLink to="/home" className="navbar-brand">LOGO</NavLink>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <NavLink to="/home" className="nav-link">Home</NavLink>
          </li>
          <li className="navbar-item">
          <NavLink to="/posts" className="nav-link">Posts</NavLink>
          </li>
          <li className="navbar-item">
          <NavLink to="/post" className="nav-link">Post</NavLink>
          </li>
        </ul>
        </div>
      </nav>
      
    );
  }
}