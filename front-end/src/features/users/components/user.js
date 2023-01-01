import React from 'react'
import { Link,NavLink } from 'react-router-dom';
export default function User(props) {
  return (
    <tr>
      <td>{props.user._id}</td>
      <td>{props.user.username}</td>
      <td>{props.user.role}</td>
      <td>{props.user.isActive? 'Active':'Ban'}</td>
      <td>{props.user.lastLogin.substring(0,10)}</td>
      <td>{props.user.createdAt? props.user.createdAt.substring(0,10):''}</td>
      
      <td>
        <NavLink to={`/admin/account/edit/`+props.user._id}>edit</NavLink> | <a href="/#">delete</a>
      </td>
    </tr>
  )
}
