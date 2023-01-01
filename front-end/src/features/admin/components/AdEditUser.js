import React from 'react'
import { Segment } from 'semantic-ui-react'
import './AdEditUser.css'

export default function AdEditUser() {
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
        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon3">Role</span>
          <select className="ui dropdown">
            <option>Sub-admin</option>
            <option>User</option>
          </select>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon4">Active</span>
          <select className="ui dropdown">
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
      
    </Segment>
    </div>
    </>
  )
}
