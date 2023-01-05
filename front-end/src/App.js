import Home  from './views/Home' 
import Login  from './features/auth/Login' 
import SignUp from './features/auth/SignUp' 
import { NotFound } from './views/NotFound';
import Header from './components/Header';
import {Routes,Route, Navigate, Link } from 'react-router-dom'
import './App.css';
import UserRouter from 'features/users/userRouter';
import React, { Component, Suspense, useEffect } from 'react';
import Search from './features/posts/Search';
import Order from 'features/registryOrder/Order';
import MostSearched from 'views/MostSearched';
import ShowAll from 'views/ShowAll';
import navbarAdmin from 'features/admin/navbarAdmin';
import Announcements from 'features/admin/announcements';
import ManageUser from 'features/admin/manageUser';
import Report from 'features/admin/report';
import useAuth from 'hooks/useAuth';
// import AdEditUser from 'features/admin/components/AdEditUser';
import UsersList from 'features/users/components/userList';
import ViewOrder from 'features/registryOrder/ViewOrder';
import { useDispatch } from 'react-redux';
import { getall } from 'features/posts/postSlice';
import AdEditUser from 'features/admin/components/AdEditUser';
import AdminRouter from "./features/admin/adminRouter" 
import RequireAuth from 'features/auth/RequireAuth';
const Posts = React.lazy(()=> import('./features/posts/Posts') )

function App() {
  const { username, role } = useAuth()
  return (
    <div className="containerWeb">
      <Suspense fallback={<div>Loading.....</div>}>
        <Header/>
        <Routes>
          {/* Admin */}
          <Route element={<RequireAuth allowedRoles={["admin", "sub-admin"]} />}>
            <Route path='/admin/*' element={<AdminRouter/>} />
          </Route>
          <Route path='/report' element={<Report/>} />
          {/* Guest */}
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/search' element={<Search/>} /> 
          <Route path='/home' element={<Home/>} />
          
          
          {/* Users */}
          <Route path='/vieworder/:id' element={<ViewOrder/>} />
          {/* <Route path='/announcements' element={<navbarAdmin/>} /> */}
          {/* <Route path='/report' element={<AdEditUser/>} /> */}
          
          <Route path='/report' element={<AdEditUser/>} />
          <Route path="/users/*" element={<UserRouter/>}/>
          <Route path='/posts/*' element={<Posts/>} />

          <Route path="/showall" element={<ShowAll/>}/>
          <Route path="/mostsearched" element={<MostSearched/>}/>
          
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
