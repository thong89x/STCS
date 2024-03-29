import React, { useReducer, useState } from 'react'
import {Routes,Route,useMatches, useMatch, useLocation } from "react-router-dom"
import EditPost from './components/EditPost'
import NewPost from './components/NewPost'
import ViewPost from './components/ViewPost'
import Post from './components/Post'
import PostLayout from './components/PostLayout'
import PostList from './components/PostList'
import Order from 'features/registryOrder/Order'
import GetRegistryofPost from 'features/registryOrder/GetRegistryofPost'

export default function Posts() {
  return (
    <Routes>
        <Route element={<PostLayout/>}>
            <Route index element={<PostList/>}/>
            <Route path='add' element={<NewPost/>}/>
            <Route path="approach/:id" element={<GetRegistryofPost/>}/>
            <Route path="order/:id" element={<Order/>}/>
            <Route path='edit/:id' element={<EditPost/>}/>
            <Route path=':id' element={<ViewPost/>}/>
        </Route>
    </Routes>
  )
}
