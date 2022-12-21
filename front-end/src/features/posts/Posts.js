import React from 'react'
import {Routes,Route,useMatches, useMatch, useLocation } from "react-router-dom"
import EditPost from './components/EditPost'
import NewPost from './components/NewPost'
import Post from './components/Post'
import PostLayout from './components/PostLayout'
import PostList from './components/PostList'

export default function Posts() {
  return (
    <Routes>
        <Route element={<PostLayout/>}>
            <Route index element={<PostList/>}/>
            <Route path='add' element={<NewPost/>}/>
            <Route path=':id' element={<Post/>}/>
            <Route path='edit/:id' element={<EditPost/>}/>
        </Route>
    </Routes>
  )
}
