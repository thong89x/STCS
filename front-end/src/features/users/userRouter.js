import React from 'react'
import UserLayout from './components/userLayout'
import EditUser from './components/editUser'
import UserHome from './components/userHome'
import {Routes,Route, Navigate, Link, useSearchParams, useParams } from 'react-router-dom'
import UsersList from './components/userList'
import axios from 'axios'
import RegistryOwner from 'features/registryOrder/RegistryOwner'
import Notifications from './components/Notifications'
export default function UserRouter() {
  
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path="/order/:username" element={<RegistryOwner/>}/>
        <Route path="/:username" element={<UserHome/>} />
        <Route path="/edit/:username" element={<EditUser/>} />
        <Route path='/notifications/:username' element={<Notifications/>} />
      </Route>
    </Routes>
  )
}
