import React, { useState,useEffect,setCredentials,useRef } from 'react'
import { Image,Segment} from 'semantic-ui-react';
import { useDispatch,useSelector} from 'react-redux';
import { Navigate, useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import "../stylesUser/User.css"
import useAuth from 'hooks/useAuth';
export default function EditUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fullname,setFullname] = useState("")
  const [age, setAge] = useState("")
  const [address,setAdress] = useState("")
  const [sex,setSex] = useState("")
  const [email,setEmail] = useState("")
  const {token} = useSelector(state=> state.auth)

  const {username} = useParams()
  const ower = useAuth().username
  useEffect(()=>{
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };
  axios.get(`http://localhost:5000/users/v1/${username}`,config).then((res)=>{
      console.log(res.data)
      const user = res.data;
      setFullname(user.profile.fullname)
      setAge(user.profile.age)
      setAdress(user.profile.address)
      setSex(user.profile.sex)
      setEmail(user.profile.email)
      
      return res.data;
  }).catch((err)=>{
      console.log(err)
  })
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
    axios.patch('http://localhost:5000/users/v1/' + username,newInfo,config)
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
          axios.patch('http://localhost:5000/users/v1/' + username,newInfo,config)
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

  const handleClickCancel = () => navigate(-1)

  return (
    <>
    {ower==username?
    <div  className = 'backGroundPage' style = {{backgroundColor: "#DDE4F5"}}>
      <div className='row d-flex flex-row justify-content-center'>
        <br/>
        <Image middle={'true'} src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular/>
        <br/>
        <span className = "text_header"> {username}   </span>
      </div>
      <br/>
      <div className='justify-content-center'>
      <form  onSubmit={handleSubmit}>
        <Segment style = {{backgroundColor: "#A0B4F3"}} className = "infoBoxEditUser">
              <div as = 'h2' className = "text_header mb-3">
                      EDIT PERSONAL INFORMATION
              </div>
              <div>
              <Segment>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Fullname</span>
                    <input required type="text" className="form-control" id="hotenUser" value={fullname} minLength="10" maxLength="2000" onChange={(e)=>setFullname(e.target.value)}/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Age</span>
                    <input required type="number" min = '6' max = '100' className="form-control" id="age" name="age" value={age} onChange={(e)=>setAge(e.target.value)}/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Sex</span>
                    <input required type="text" className="form-control" id="gioiTinhUser" value={sex} onChange={(e)=>setSex(e.target.value)}/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Address</span>
                    <input required type="email" className="form-control" id="hotenUser" value={address} onChange={(e)=>setAdress(e.target.value)}/>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Email</span>
                    <input required type="email" className="form-control" pattern=".+@globex\.com" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="group8@example.com"/>
                  </div>

                  <div className="btnn row">
                      <button type="submit" className="btn btn-success">Save adjustment</button>
                      <button className="btn btn-danger" onClick={handleClickCancel}>Hủy</button>
                  </div>
              </Segment>
              </div>
              
          </Segment>
        </form>
        </div>
    </div>:<Navigate to="/home" replace />}
    </>
  )
}
