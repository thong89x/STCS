import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import { addPost, removePost} from 'features/posts/postSlice'
import { useDispatch } from 'react-redux'
import "../styles/ViewPost.css"
import {Image,Segment, Grid } from 'semantic-ui-react';
import axios from 'axios'
export default function ViewPost() {
    const {id} = useParams()
    const [valid,setValid] = useState(false)
    const [post,setPost] = useState()
    const [username,setUsername] = useState("")
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const [question, setQuestion] = useState("")
    const [address, setAdress] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(()=>{
      const config = {
        headers: {
        "Content-Type": "application/json"
        },
      };
      axios.get('http://localhost:5000/posts/'+id).then((res)=>{
        setPost(res.data)
        setValid(true)
        return res.data.userID
      }).then((userID)=>{
        const config = {
          headers: {
          "Content-Type": "application/json"
          },
        };
        axios.get('http://localhost:5000/users/v2/'+'63a33c906834e32f100123cf',config).then((res)=>{
          console.log(res.data)
          setUsername(res.data.username)
        })
      }).catch((err)=>{

        console.log(err)
      })

    },[])
    const handleSubmit = event =>{

        event.preventDefault()  
        const newID = 1000 + Math.floor(Math.random()*1000+ 9000);
        const newPost = {
            id: newID,
            name: name,
            desc: desc,
            address: address,
            price: setPrice,
            quantity: setQuantity,
            question: question
        }

        const action = addPost(newPost)
        dispatch(action)
        navigate('/posts')
    }
    const navigateHome = () => {
      navigate('/home');
    };
    return (
    <>
    {valid?
    <Segment>
      <div className = "card">
        <div className = "product-imgs">
          
          <div className = "img-display">
            <div className = "img-showcase">
              <Image src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "No Image"/>
              <Image src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "No Image"/>
              <Image src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "No Image"/>
              <Image src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "No Image"/>
            </div>
          </div>
          
          <div className = "img-select">
            <div className = "img-item">
              <a href = "#" data-id = "1">
                <img src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "shoe image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "2">
                <img src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "shoe image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "3">
                <img src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "shoe image"/>
              </a>
            </div>
            <div className = "img-item">
              <a href = "#" data-id = "4">
                <img src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "shoe image"/>
              </a>
            </div>
            
          </div>
        </div>
        <div className = "product-content">
          <br/>
          <h2 className = "product-title">Áo khoác Sportwear</h2>
          <div className = "product-rating">
            <span id ="yellowText">5 </span>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            <i className = "fas fa-star"></i>
            
            <span id ="redText"> 2 </span>
            <span> đã giao </span>
          </div>

          <div className = "product-detail">
            <Segment>
            <h4 id ="centerText"> Mô tả sản phẩm</h4>
                <p> </p>
            </Segment>
          </div>
          <br/>
          <i className="big tag icon"></i>
          <span id ="priceNum">50.000đ</span>
          
          <Segment>
            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' verticalAlign='top' size='tiny' circular></Image>
            <span >Đăng bài này lúc: </span>
            <br/>
            <span >{username}</span>
          </Segment>
          <div className = "purchase-info">
            <button type = "button" className = "btn">
              <NavLink to={`/posts/order/${post._id}`} >Order <i className = "fas fa-shopping-cart"></i></NavLink>
            </button>
          </div>
        </div>
      </div>
      <Segment>
        <span>
          Đánh giá sản phẩm
        </span>
        <Segment>
            <div className = "product-rating">
              <h1 id ="orangeText">5.0 / 5.0 </h1>
                <i id ="orangeText" className = "fas fa-star"></i>
                <i id ="orangeText" className = "fas fa-star"></i>
                <i id ="orangeText" className = "fas fa-star"></i>
                <i id ="orangeText" className = "fas fa-star"></i>
                <i id ="orangeText" className = "fas fa-star"></i>
            </div>
            <br/>
            <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <button>
                    <Segment id ="centerText"> Tất cả</Segment>
                    </button>
                  </Grid.Column>
                  <Grid.Column>
                    <button>
                    <Segment id ="centerText"> 5 sao</Segment>
                    </button>
                  </Grid.Column>
                  <Grid.Column>
                    <button>
                    <Segment id ="centerText"> 4 sao</Segment>
                    </button>
                  </Grid.Column>
                  <Grid.Column>
                    <button>
                    <Segment id ="centerText"> 3 sao</Segment>
                    </button>
                  </Grid.Column>
                  <Grid.Column>
                    <button>
                    <Segment id ="centerText"> 2 sao</Segment>
                    </button>
                  </Grid.Column>
                  <Grid.Column>
                    <button>
                    <Segment id ="centerText"> 1 sao</Segment>
                    </button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
        </Segment>
      </Segment>
      
    </Segment>
    : <></>}
    </>
    
  )
}
