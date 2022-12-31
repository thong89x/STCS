import React from 'react'
import { Segment } from 'semantic-ui-react'
import './AdEditUser.css'

export default function AdEditUser() {
  return (
    <>
    <div class="framebox">
    <Segment style={{backgroundColor: "#A0B4F3"}} >
      <div as = 'h1' className='text_header_admin'>
        Edit User
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Id</span>
        <span class="form-control" style={{color: 'grey'}}>sdlfssdfsdsdfjdlfsajfld</span>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon2">Username</span>
        <span class="form-control">Vo Minh Thong</span>
      </div>

      <div class="input-group mb-3">
        <label for="inputPassword5" class="input-group-text">Password</label>
        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
      </div>

      <div className="input-group mb-3">
        <span class="input-group-text" id="basic-addon3">Role</span>
          <select class="ui dropdown">
            <option>Sub-admin</option>
            <option>User</option>
          </select>
      </div>

      <div className="input-group mb-3">
        <span class="input-group-text" id="basic-addon4">Active</span>
          <select class="ui dropdown">
            <option>Yes</option>
            <option>No</option>
          </select>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon5">Created Time</span>
        <span class="form-control" id="basic-infor3">26/11/2002</span>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon6">Last Login</span>
        <span class="form-control" id="basic-infor4">26 min ago</span>
      </div>
      
    </Segment>
    </div>
    </>
  )
}
