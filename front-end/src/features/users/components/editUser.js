import React, { useState,Dispatch,setCredentials } from 'react'
import { Image,Segment} from 'semantic-ui-react';
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../stylesUser/User.css"
export default function EditUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fullname,setFullname] = useState("")
  const [age, setAge] = useState("")
  const [address,setAdress] = useState("")
  const [sex,setSex] = useState("")
  const [email,setEmail] = useState("")
  const {token} = useSelector(state=> state.auth)
  
  const handleSubmit = event =>{
    event.preventDefault()  
    const newID = 1000 + Math.floor(Math.random()*1000+ 9000);
    const newInfo = {
        fullname: fullname,
        age: age,
        address: address,
        sex: sex,
        email: email
    }
  }
  const config = {
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token? token: 'a'}`,
    },
  };
  axios.post('http://localhost:5000/users/v1/${username}',config)
  .then((response)=>{
      
  }).catch((err)=>{
    if (err?.response?.status == 403){
      console.log('sending request token')
      axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
        dispatch(setCredentials(...res.data))
      }).catch((err)=>{
        navigate('/login')
      })
    }
  })
  return (
    <>
    <div style = {{backgroundColor: "#DDE4F5"}} class = 'backGroundPage'>
    <br/>
    <Image middle src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular/>
    
    <span className = "text_header">Duy Mai   
    </span>
    <i class="pencil alternate icon"></i>
      <Segment style = {{backgroundColor: "#A0B4F3"}} className = "infoBox">
            <div as = 'h1' className = "text_header">
                    CHỈNH SỬA THÔNG TIN CÁ NHÂN
            </div>
            <Segment>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Họ tên</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="hotenUser" value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Số tuổi</label>
                    <div className="col-sm-10">
                        <input type="number" min = '10' max = '100' className="form-control" id="age" name="age" required value={age} onChange={(e)=>setAge(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Giới tính</label>
                    <div className="col-sm-10">
                    <select class="ui dropdown">
                      <option value={sex} onChange={(e)=>setSex(e.target.value)}>Male</option>
                      <option value={sex} onChange={(e)=>setSex(e.target.value)}>Female</option>
                    </select>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Địa chỉ</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="hotenUser" value={address} onChange={(e)=>setAdress(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" pattern=".+@globex\.com" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="group8@example.com"/>
                    </div>
                </div>
                <br/>
                <div class="text_header">
                    <button class="ui positive button"> Lưu chỉnh sửa </button>
                </div>
            </Segment>
        </Segment>
    </div>
    </>
  )
}
