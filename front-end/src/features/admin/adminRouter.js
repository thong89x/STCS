import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdEditUser from './components/AdEditUser'
import ManageUser from './manageUser'
import RouteLayout from './RouteLayout'

export default function adminRouter() {
  return (
    <Routes>
        <Route element={<RouteLayout/>}>
            <Route index element={<ManageUser/>}/>
            <Route path="account/edit/:id" element={<AdEditUser/>} />
           
        </Route>
    </Routes>
  )
}
