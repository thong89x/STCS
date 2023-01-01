import React, { useState,useEffect,setCredentials,useRef } from 'react'
import { Image,Segment} from 'semantic-ui-react';
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate,useParams} from 'react-router-dom';
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
  const  inputName = useRef()
  const  inputAge = useRef()
  const  inputAdress = useRef()
  const  inputSex = useRef()
  const  inputEmail = useRef()
  const {username} = useParams()
    useEffect(()=>{

  },[])
  const handleSubmit = event =>{
    event.preventDefault()  
    const listInfo = [inputName.current.value, inputAge.current.value,inputAdress.current.value,inputSex.current.value,inputEmail.current.value,]
    const newInfo = {
      listInfo:listInfo
    }
    console.log(newInfo)
    const config = {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token? token: 'a'}`,
      },
    };
    axios.defaults.withCredentials = true
    axios.patch('http://localhost:5000/users/v1/'+username,newInfo,config)
    .then((response)=>{
        console.log(response.data)
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
          axios.patch('http://localhost:5000/users/v1/'+username,newInfo,config)
          .then((response)=>{
              console.log(response.data)
          })
        })
        .catch((err)=>{
          navigate('/login')
        })
      }
    })
  }
  return (
    <>
    <div style = {{backgroundColor: "#DDE4F5"}} class = 'backGroundPage'>
    <br/>
    <Image middle src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular/>
    
    <span className = "text_header"> {username}   </span>
      <Segment style = {{backgroundColor: "#A0B4F3"}} className = "infoBoxEditUser">
            <div as = 'h1' className = "text_header">
                    CHỈNH SỬA THÔNG TIN CÁ NHÂN
            </div>
            <Segment >
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Họ tên</label>
                    <div className="col-sm-10">
                        <input ref = {inputName} type="text" className="form-control" id="hotenUser" value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Số tuổi</label>
                    <div className="col-sm-10">
                        <input  ref = {inputAge} type="number" min = '6' max = '100' className="form-control" id="age" name="age" required value={age} onChange={(e)=>setAge(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Giới tính</label>
                    <div className="col-sm-10">
                        <input  ref = {inputSex} type="text" className="form-control" id="gioiTinhUser" value={sex} onChange={(e)=>setSex(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Địa chỉ</label>
                    <div className="col-sm-10">
                        <input  ref = {inputAdress} type="email" className="form-control" id="hotenUser" value={address} onChange={(e)=>setAdress(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input  ref = {inputEmail} type="email" className="form-control" pattern=".+@globex\.com" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="group8@example.com"/>
                    </div>
                </div>
                <br/>
                <div class="text_header">
                    <button class="ui positive button" onClick={handleSubmit}> Lưu chỉnh sửa </button>
                </div>
            </Segment>
        </Segment>
    </div>
    </>
  )
}
