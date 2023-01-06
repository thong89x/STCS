import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
//import './styles/Order.css'
import { useDispatch,useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import User from 'features/users/components/user';
import userApi from 'api/userApi';
import useAuth from 'hooks/useAuth';
import { setCredentials } from 'features/auth/authSlice';
import jwtDecode from 'jwt-decode'
import { useState } from 'react';
import { findPostByListOrder, findPostofRegistry } from 'features/posts/postSlice';
import { Image } from 'semantic-ui-react';
import './styles/ViewOrder.css'

export default function RegistryOwner() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const {username} = useParams()
    const [listRegistry,setlistRegistry] = useState([])
    const [number,setnumber] = useState()
    const [listAnswer,setlistAnswer] = useState()
    const listPost = useSelector(state => state.postList.listPostodRegistry)
    const {token} = useSelector(state=> state.auth)
    const handleClick=  (indx)=> {
      // console.log(listRegistry[indx].listAnswer)
      setlistAnswer(listRegistry[indx].listAnswer)  
    }
    useEffect(()=>{
      const Fetch = async()=>{
    const config = {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token? token: 'a'}`,
      },
    };
    axios.defaults.withCredentials = true
    axios.get(`http://localhost:5000/users/v1/${username}/registrys`,config)
    .then((response)=>{
        setlistRegistry(response.data)
        setlistAnswer(response.data[0].listAnswer)
        dispatch(findPostofRegistry(response.data))
        return response.data
    })
    .catch((err)=>{
      if (err?.response?.status == 403 ||err?.response?.status == 400  ){
        console.log('sending request token')
        axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
          const accessToken = res.data
          dispatch(setCredentials(accessToken))
          return accessToken
        }).then((res)=>{
          config.headers.Authorization = `Bearer ${res.accessToken}`
          axios.get(`http://localhost:5000/users/v1/${username}/registrys`,config)
          .then((response)=>{
              const list = response.data      
              setlistRegistry(list)
              setlistAnswer(response.data[0].listAnswer)
              dispatch(findPostofRegistry(response.data))
              return response.data
          })
        })
        .catch((err)=>{
          navigate('/login')
        })
      }
    })
  }
  Fetch();
},[])
  return (
    <div className='warehouse row'>
      <div className='col'>
        <div className='order'>
          <div className='box'>Form Registry Order
          </div>
          <div className='background-input'>
          <div className='input'>Why do you need the item?:
          <div>
          <div className='input_text'>{listAnswer?listAnswer[0]:'ko co'}</div>
          </div>
          </div>
          <div className='input'>Do you need it right now?:
          </div>
          <div className='input_text'>{listAnswer?listAnswer[1]:'ko co'}</div>
          <div className='input'>What is your degree?
          </div>
          <div className='input_text'>{listAnswer?listAnswer[2]:'ko co'}</div>
          <div className='input'>New publisher of LOL video game?
          </div>
          <div className='input_text'>{listAnswer?listAnswer[3]:'ko co'}</div>
          <div className='input'>Can you please rate 5 stars for my shop?
          </div>
          <div className='input_text'>{listAnswer?listAnswer[4]:'ko co'}</div>
          <div className='space '/>
          </div>
        </div>
      </div>
      <div className='col'>
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Preview</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {
            listRegistry.map((currentorder,indx) => {
              return <tr key={currentorder._id} className={currentorder.statusRegForm} onClick={() =>handleClick(indx)}>
                  <td><Image src='https://www.computerhope.com/jargon/s/software-engineering.jpg' size='tiny' circular centered/></td>
                  <td>{listPost[indx].nameProduct}</td>
                  <td>{listPost[indx].priceProduct}</td>
                  <td>{currentorder.createdAt.substring(0,10)}</td>
                  <td>{currentorder.statusRegForm}</td>
                </tr>
            })
          }
          </tbody>
        </table>
    </div>
      </div>
    </div>
  )
}
