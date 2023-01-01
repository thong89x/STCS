import Home  from './views/Home' 
import Login  from './features/auth/Login' 
import SignUp from './features/auth/SignUp' 
import { NotFound } from './views/NotFound';
import Header from './components/Header';
import {Routes,Route, Navigate, Link } from 'react-router-dom'
import './App.css';
import UserRouter from 'features/users/userRouter';
import React, { Suspense } from 'react';
import Search from './features/posts/Search';
import Order from 'views/Order';
import MostSearched from 'views/MostSearched';
import ShowAll from 'views/ShowAll';
import navbarAdmin from 'features/admin/navbarAdmin';
import Announcements from 'features/admin/announcements';
import ManageUser from 'features/admin/manageUser';
import Report from 'features/admin/report';
import useAuth from 'hooks/useAuth';
import AdEditUser from 'features/admin/components/AdEditUser';
import UsersList from 'features/users/components/userList';
const Posts = React.lazy(()=> import('./features/posts/Posts') )

function App() {
  const { username, role } = useAuth()
  return (
    <div className="containerWeb">
      <Suspense fallback={<div>Loading.....</div>}>
        <Header/>
        <Routes>
          {/* Admin */}
          <Route path='/admin' element={<ManageUser/>} >
            <Route path="account/edit/:id" element={<AdEditUser/>} />
          </Route>
          
          <Route path='/useracc' element={<ManageUser/>} />
          <Route path='/report' element={<Report/>} />
          {/* Guest */}
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/search' element={<Search/>} /> 
          {/* Users */}
          
          <Route path='/announcements' element={<navbarAdmin/>} />
          <Route path='/report' element={<AdEditUser/>} />
          <Route path="/users/*" element={<UserRouter/>}/>
          
          <Route path="/showall" element={<ShowAll/>}/>
          <Route path="/mostsearched" element={<MostSearched/>}/>
          <Route path='/posts/*' element={<Posts/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
