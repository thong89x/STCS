import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Image,Segment} from 'semantic-ui-react';
import "../stylesUser/User.css"
import { NavLink } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { findPostByUserName } from 'features/posts/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import PostList from 'features/posts/components/PostList';
import { AiOutlineDelete,AiFillEdit } from "react-icons/ai";
export default function UserHome() {
    const [user,setUser]=useState()
    const [profile,setProfile]=useState()
    const postlist = useSelector(state=> state.postList.listFilter)
    const {username} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const ower = useAuth().username
    useEffect(()=>{
        const config = {
            headers: {
              "Content-Type": "application/json"
            },
          };
        axios.get(`http://localhost:5000/users/v1/${username}`,config).then((res)=>{
            setUser(res.data)
            setProfile(res.data.profile)
            console.log(user)
            console.log(profile)
            return res.data;
        }).catch((err)=>{
            console.log(err)
        })
        dispatch(findPostByUserName(username))
    },[username])
    const middle = true
    return (
        <>
        {user ?
            <div className='userHomePage'>
                <div className='center'>
                    <Image middle={middle.toString()} src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular centered/>
                    <h2 id = "centerText"> {user?.username } </h2>
                    <div className='infoBoxx row' >
                        <ol className='col'>
                            <li>Fullname: {profile.fullname}</li>
                            <li>Email: {profile.email}</li>
                            <li>Age: {profile.age}</li>
                            <li>Gender: {profile.sex}</li>
                            <li>Address: {profile.address}</li>
                            <div className='infoBoxEditUser'>
                            {ower==username?<button className='btn btn-warning'> 
                                <NavLink to={`/users/edit/${username}`} > Edit thông tin cá nhân </NavLink>
                            </button>:<></>}
                            </div>
                        </ol>
                        
                    </div>
                </div>
            
            <div className='row mt-5'>
                <div className='col ColPost'>
                    {postlist?postlist.map((post) => (
                    
                    <div key={post._id} className='row posts mb-5 mt-4' onClick={()=>{navigate('/posts/'+post._id)}}>
                        <div className='row'>
                            <div className='col-2'>
                            <Image  src='https://www.computerhope.com/jargon/s/software-engineering.jpg' size='tiny' circular centered/>
                            </div>
                            <div className='col-9'>
                                <div className='row mb-2 mt-1'>{username}</div>
                                <div className='row'>{post.createdAt}</div>
                            </div>
                            <div className='col-1 action'>
                                <AiOutlineDelete/>
                                <AiFillEdit/>
                            </div>
                        </div>
                        <div className='row text-center describe'>
                            {post.describePost}
                        </div>
                        {post.imageURL?
                        <img src={post.imageURL[0]?post.imageURL[0]:"https://react.semantic-ui.com/images/wireframe/square-image.png"} className="d-block" onError={({currentTarget}) => {
                            currentTarget.onError = null;
                            currentTarget.src ='https://react.semantic-ui.com/images/wireframe/square-image.png'
                          }} alt="Not found"/>
                        :<>
                            <img src={"https://react.semantic-ui.com/images/wireframe/square-image.png"} className="d-block" onError={({currentTarget}) => {
                                currentTarget.onError = null;
                                currentTarget.src ='https://react.semantic-ui.com/images/wireframe/square-image.png'
                            }} alt="Not found"/>
                        </>
                        }          
                    </div>
                    )):<div></div>}
                </div>
            </div>
            </div>: ""}
        </>
    )
}
