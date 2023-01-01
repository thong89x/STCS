import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import './styles/Login.css'
import { Segment } from 'semantic-ui-react'
const Login =() => {
 
    const userRef = useRef()
    const pwRef = useRef()
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        var accessToken;
        const config = {
            headers: {
              "Content-Type": "application/json"
            },
          };
        axios.defaults.withCredentials = true
        const User = {
            username :  userRef.current.value,
            password : pwRef.current.value
        }
        const res =  await axios.post('http://localhost:5000/auth',User,config).then((res)=>{

            accessToken = res.data
            dispatch(setCredentials( accessToken ))
            
            // const { username, role } = decoded.UserInfo
            
            navigate('/home')
        }).catch((err)=>{
            alert("vui long nhap lai tk mat khau");
            console.log(err)
        })
        
    }

    const content = (
        <section className="public row LoginContainer">
            <div className='col-5 h-100 decore'>
            </div>
            <div className='col h-100 d-flex align-items-center justify-content-center'>
                <main className="login ">
                    <Segment>
                        <form className='form-container' onSubmit={handleSubmit}>
                            <div className='row'>
                                <h2>Đăng Nhập</h2>
                            </div>
                            <div className="form-group " >
                                <label htmlFor="InputUsername">Username:</label>
                                <input ref={userRef} type="text" className="form-control" id="InputUsername" aria-describedby="usernameHelp" placeholder="Enter UserName"/>
                                <small id="usernameHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="InputPassword1">Password</label>
                                <input ref={pwRef} type="password" className="form-control" id="InputPassword1" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary loginbtn w-100">Đăng Nhập</button>
                            <div className='row form-group'>
                                <div className='line col w-20'></div>
                                Hoặc
                                <div className='line col'></div>
                                
                            </div>
                            <footer className='row '>
                                <div className='col-8'> Bạn chưa có tài khoản</div>
                                <Link to="/signup" className='col ToggleLink'>Đăng Ký</Link>
                            </footer>
                        </form>  
                    </Segment>
                </main>
                
            </div>
            
            
        </section>
    )

    return content
}
export default Login