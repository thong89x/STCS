import axios from 'axios';
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import './styles/Order.css'
export default function Order() {
  const {id} = useParams();
  const ques1Ref = useRef();// dungf cho oo input chi lay du lieu
  // useState -> gia tri cua 1 bien thay doi thi no load lai 1 phan man hinh
  const postID = id;
  const {token} = useSelector(state=> state.auth)
  const HandleSubmit = ()=>{
    const listAnswer = [ques1Ref.current.value,'b','c'];
    const newRegistry = {
      listAnswer:listAnswer,
      postID: postID
    }
    console.log(newRegistry)
    // axios.post(`http://local`)
    const config = {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token? token: 'a'}`,
      },
    };
    axios.defaults.withCredentials = true
    axios.post('http://localhost:5000/registrys',newRegistry,config)
    .then((response)=>{
        console.log(response.data)
        setUsersList(()=> response.data)
        console.log(usersList)
    }).catch((err)=>{
      if (err?.response?.status == 403 ||err?.response?.status == 400  ){
        console.log('sending request token')
        axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
          const accessToken = res.data
          console.log(accessToken)
          dispatch(setCredentials(accessToken))
          return accessToken
        }).then((res)=>{
          console.log(res.accessToken)
          config.headers.Authorization = `Bearer ${res.accessToken}`
          axios.get('http://localhost:5000/users/v2',config)
          .then((response)=>{
              console.log(response.data)
              setUsersList(()=> response.data)
              console.log(usersList)
          })
        })
        .catch((err)=>{
          navigate('/login')
        })
      }
    })
  }
  return (

    <div className='order'>
        <div className='box'>Form Registry Order</div>
        <div className='background-input'>
        <div className='input'>Full name:</div>
        <input ref={ques1Ref}className='input_text' placeholder='Enter your full name.'/>
        <div className='input_double'>
        <div className='input'>Email Id:</div>
        <input className='input_text' placeholder='abc@gmail.com'/>
        <div className='input'>Mobile No:</div>
        <input className='input_text' placeholder='+84 - 827431231'/>
        </div>
        <div className='input'>Address:</div>
        <input className='input_text' placeholder='xxxxxxxxx.'/>
        <div className='input'>Quantity:</div>
        <input className='input_text' placeholder='1,2,3...'/>
        <div className='space '/>
        <button className='button'>Confirm</button>
        </div>
    </div>
  )
}


