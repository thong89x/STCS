import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { addPost, removePost} from 'features/posts/postSlice'
import { useDispatch } from 'react-redux'
import "../styles/ViewPost.css"
import {Image,Segment, Grid } from 'semantic-ui-react';
export default function ViewPost() {
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const [question, setQuestion] = useState("")
    const [address, setAdress] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
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
    <Segment>
      <div class = "card">
        <div class = "product-imgs">
          
          <div class = "img-display">
            <div class = "img-showcase">
              <Image src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "No Image"/>
              <Image src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "No Image"/>
              <Image src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "No Image"/>
              <Image src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "No Image"/>
            </div>
          </div>
          
          <div class = "img-select">
            <div class = "img-item">
              <a href = "#" data-id = "1">
                <img src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "shoe image"/>
              </a>
            </div>
            <div class = "img-item">
              <a href = "#" data-id = "2">
                <img src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "shoe image"/>
              </a>
            </div>
            <div class = "img-item">
              <a href = "#" data-id = "3">
                <img src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "shoe image"/>
              </a>
            </div>
            <div class = "img-item">
              <a href = "#" data-id = "4">
                <img src = "https://react.semantic-ui.com/images/wireframe/square-image.png" alt = "shoe image"/>
              </a>
            </div>
            
          </div>
        </div>
        <div class = "product-content">
          <br/>
          <h2 class = "product-title">Áo khoác Sportwear</h2>
          <div class = "product-rating">
            <span id ="yellowText">5 </span>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            
            <span id ="redText"> 2 </span>
            <span> đã giao </span>
          </div>

          <div class = "product-detail">
            <Segment>
            <h4 id ="centerText"> Mô tả sản phẩm</h4>
                <p> </p>
            </Segment>
          </div>
          <br/>
          <i class="big tag icon"></i>
          <span id ="priceNum">50.000đ</span>
          
          <Segment>
            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' verticalAlign='top' size='tiny' circular></Image>
            <span >Đăng bài này lúc: </span>
            <br/>
            <span >Duy Mai </span>
          </Segment>
          <div class = "purchase-info">
            <button type = "button" class = "btn">
              Order <i class = "fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
      <Segment>
        <span>
          Đánh giá sản phẩm
        </span>
        <Segment>
            <div class = "product-rating">
              <h1 id ="orangeText">5.0 / 5.0 </h1>
                <i id ="orangeText" class = "fas fa-star"></i>
                <i id ="orangeText" class = "fas fa-star"></i>
                <i id ="orangeText" class = "fas fa-star"></i>
                <i id ="orangeText" class = "fas fa-star"></i>
                <i id ="orangeText" class = "fas fa-star"></i>
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
  )
}
