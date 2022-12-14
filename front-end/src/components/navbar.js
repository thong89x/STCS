import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// code mau nho sua
export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/home" className="navbar-brand">LOGO</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/notify" className="nav-link">Notification Server</Link>
          </li>
          <li className="navbar-item">
          <Link to="/post" className="nav-link">Post</Link>
          </li>
        </ul>
        </div>
      </nav>
      
    );
  }
}