import React from 'react'
import { useState } from 'react';
import { Segment } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import './AdEditUser.css'

export default function AdEditUser() {
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate()

  const handleClickApply = () => {
    console.log(password)
    console.log(role)
    console.log(isActive)
  };

  const handleClickCancle = () => navigate('/admin')
  
  return (
    <>
    <div className="framebox">
    <Segment style={{backgroundColor: "#A0B4F3"}} >
      <div as = 'h1' className='text_header_admin'>
        Edit User
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Id</span>
        <span className="form-control" style={{color: 'grey'}}>sdlfssdfsdsdfjdlfsajfld</span>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">Username</span>
        <span className="form-control">Vo Minh Thong</span>
      </div>

      <div className="input-group mb-3">
        <label for="inputPassword5" className="input-group-text">Password</label>
        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon3">Role</span>
          <select className="ui dropdown" value={role} onChange={(e)=>setRole(e.target.value)}>
            <option>Sub-admin</option>
            <option>User</option>
          </select>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon4">Active</span>
          <select className="ui dropdown" value={isActive} onChange={(e)=>setIsActive(e.target.value)}>
            <option>Yes</option>
            <option>No</option>
          </select>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon5">Created Time</span>
        <span className="form-control" id="basic-infor3">26/11/2002</span>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon6">Last Login</span>
        <span className="form-control" id="basic-infor4">26 min ago</span>
      </div>

      <div className='btnn row'>
          <button type="submit" className="btn btn-success" onClick={handleClickApply}>Apply</button>
          <button type="submit" className="btn btn-danger" onClick={handleClickCancle}>Cancle</button>
      </div>

    </Segment>
    </div>
    </>
  )
}
