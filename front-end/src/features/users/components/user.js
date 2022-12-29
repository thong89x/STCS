import React from 'react'
import { Link } from 'react-router-dom';
export default function User(props) {
  return (
    <tr>
      <td>{props.user._id}</td>
      <td>{props.user.username}</td>
      <td>{props.user.role}</td>
      <td>{props.user.isActive? 'Active':'Ban'}</td>
      <td>{props.user.lastLogin.substring(0,10)}</td>
      <td>{props.user.createdAt.substring(0,10)}</td>
      
      <td>
        <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="/#">delete</a>
      </td>
    </tr>
  )
}
