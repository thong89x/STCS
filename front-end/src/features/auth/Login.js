import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const Login =() => {
 
    const userRef = useRef()
    const pwRef = useRef()
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userRef.current.value)
        console.log(pwRef.current.value)
        var accessToken;
        const config = {
            headers: {
              "Content-Type": "application/json"
            },
          };
        axios.defaults.withCredentials = true
        const res =  await axios.post('http://localhost:5000/auth',{
            username :  userRef.current.value,
            password : pwRef.current.value
        },config).then((res)=>{

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
        <section className="public">
            <main className="login">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        ref={pwRef}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>
                </form>
            </main>
            <footer>
                <Link to="/home">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default Login