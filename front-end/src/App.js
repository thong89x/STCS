import Home  from './views/Home' 
import { Login } from './views/Login' 
import { SignUp } from './views/SignUp' 
import { NotFound } from './views/NotFound';
import Header from './components/Header';
import {Routes,Route, Navigate, Link } from 'react-router-dom'
import './App.css';
import UserRouter from 'features/users/userRouter';
import React, { Suspense } from 'react';
import Search from './features/posts/Search';
import Order from 'views/Order';
import ShowAll from 'views/ShowAll';
const Posts = React.lazy(()=> import('./features/posts/Posts') )

function App() {
  return (
    <div className="containerWeb">
      <Suspense fallback={<div>Loading.....</div>}>
        <Header/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/search' element={<Search/>} />
          <Route path="/users/*" element={<UserRouter/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/showall" element={<ShowAll/>}/>
          <Route path='/posts/*' element={<Posts/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
