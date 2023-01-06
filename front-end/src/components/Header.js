import { getAllPost } from 'features/posts/postSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './navbar'
import './styles/header.css'
export default function Header() {
  
  return (
    <>
        <Navbar/>
    </>
    
  )
}
