import React from 'react'
import UserLayout from './components/userLayout'
import EditUser from './components/editUser'
import {Routes,Route, Navigate, Link } from 'react-router-dom'
import UsersList from './components/userList'
export default function UserRouter() {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route index element={<UsersList />} />
        <Route path="/edit/:id" element={<EditUser/>} />
      </Route>
    </Routes>
  )
}
