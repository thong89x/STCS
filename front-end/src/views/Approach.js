import useAuth from 'hooks/useAuth'
import React from 'react'
import './styles/Approach.css'
import { useSelector } from 'react-redux'
export default function Approach() {
  const {username,role} = useAuth()
  const postList = useSelector(state=> state.postList.slice(0,4));
  return (
    <div >
        <div className='title'>
           Approach Form Registry 
        </div>
        <div className='form'>
          {/* {username.username} */}
          Duy Mai
          <div className='content'>
            <div>Hinh</div>
            <div>Ten</div>
          </div>
          <div className='Duyet'>
            <div>Duyet</div>
            <div>Xem</div>
          </div>
        </div>
        
    </div>
  )
}
