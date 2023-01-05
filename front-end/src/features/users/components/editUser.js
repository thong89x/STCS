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
    const listInfo = {
      fullname:fullname,
      age:age,
      address:address,
      sex:sex,
      email:email
    }
    const newInfo = {
      profile:listInfo
    }
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
        navigate(-1);
    }).catch((err)=>{
      if (err?.response?.status == 403 ||err?.response?.status == 400  ){
        console.log('sending request token')
        axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
          const accessToken = res.data
          dispatch(setCredentials(accessToken))
          return accessToken
        }).then((res)=>{
          config.headers.Authorization = `Bearer ${res.accessToken}`
          axios.patch('http://localhost:5000/users/v1/'+username,newInfo,config)
          .then((response)=>{
              console.log(response.data)
              navigate(-1);
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
    <div  className = 'backGroundPage ' style = {{backgroundColor: "#DDE4F5"}}>
      <div className='row d-flex flex-row justify-content-center'>
      <br/>
      <Image middle={'true'} src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular/>
      <br/>
      <span className = "text_header"> {username}   </span>

      <Segment style = {{backgroundColor: "#A0B4F3"}} className = "infoBoxEditUser row">
            <div as = 'h1' className = "text_header mb-3">
                    CHỈNH SỬA THÔNG TIN CÁ NHÂN
            </div>
            <div>
            <Segment>
                <div className="input-group mb-3">
                  <span className="input-group-text">Họ và tên</span>
                  <input type="text" className="form-control" id="hotenUser" value={fullname} onChange={(e)=>setFullname(e.target.value)}></input>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Tuổi</span>
                  <input  ref = {inputAge} type="number" min = '6' max = '100' className="form-control" id="age" name="age" required value={age} onChange={(e)=>setAge(e.target.value)}/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Giới tính</span>
                  <input  ref = {inputSex} type="text" className="form-control" id="gioiTinhUser" value={sex} onChange={(e)=>setSex(e.target.value)}/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Địa chỉ</span>
                  <input  ref = {inputAdress} type="email" className="form-control" id="hotenUser" value={address} onChange={(e)=>setAdress(e.target.value)}/>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Email</span>
                  <input  ref = {inputEmail} type="email" className="form-control" pattern=".+@globex\.com" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="group8@example.com"/>
                </div>

                <div className="btnn row">
                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>Lưu chỉnh sửa</button>
                    <button type="submit" className="btn btn-danger" >Hủy</button>
                </div>
            </Segment>
            </div>
            
        </Segment>
      </div>
      
    </div>
    </>
  )
}
