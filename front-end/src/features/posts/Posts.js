import React, { useReducer, useState } from 'react'
import {Routes,Route,useMatches, useMatch, useLocation } from "react-router-dom"
import EditPost from './components/EditPost'
import NewPost from './components/NewPost'
import ViewPost from './components/ViewPost'
import Post from './components/Post'
import PostLayout from './components/PostLayout'
import PostList from './components/PostList'
import Order from 'features/registryOrder/Order'

export default function Posts() {
  return (
    <Routes>
        <Route element={<PostLayout/>}>
            <Route index element={<PostList/>}/>
            <Route path='add' element={<NewPost/>}/>
            <Route path=':id' element={<ViewPost/>}/>
            <Route path="order/:id" element={<Order/>}/>
            <Route path='edit/:id' element={<EditPost/>}/>
        </Route>
    </Routes>
  )
}
