import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { addPost, removePost} from 'features/posts/postSlice'
import { useDispatch } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import "../styles/NewPost.css"
import { Button,Select,Image,Segment } from 'semantic-ui-react';
export default function NewPost() {
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const [type,setType] = useState("")
    const [question, setQuestion] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = event =>{
        event.preventDefault()  
        const newID = 1000 + Math.floor(Math.random()*1000+ 9000);
        const newPost = {
            id: newID,
            name: name,
            desc: desc,
            question: question
        }
        const ButtonExampleConditionals = () => (
            <Button.Group>
              <Button>Hủy</Button>
              <Button.Or />
              <Button positive>Thêm sản phẩm</Button>
            </Button.Group>
          )

        const action = addPost(newPost)
        dispatch(action)
        navigate('/posts')
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <Segment style = {{backgroundColor: "#A0B4F3"}} className = "outlineFrame">
            <div as = 'h1' className = "text_themsanpham">
                    THÊM 1 SẢN PHẨM MỚI
            </div>
            <Segment>
                <div as = 'h3' className = "text_thongtincoban">
                        Thông tin cơ bản
                </div>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Tên sản phẩm</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="tensp" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Nhập tên sản phẩm"/>
                    </div>
                </div>
                <hr/>
                <div className="form-group row">
                    <label htmlFor="productDescribe" className="col-sm-2 col-form-label">Mô tả sản phẩm</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="motasp" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Nhập mô tả sản phẩm"/>
                    </div>
                </div>
                
            </Segment>
            <Segment>
                <div as = 'h3' className = "text_thongtincoban">
                        Quản lý hình ảnh
                </div>
                <div className="form-group row">
                    <label htmlFor="productImage" className="col-sm-2 col-form-label">Hình ảnh sản phẩm</label>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size = 'small'/>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size = 'small'/>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size = 'small'/>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size = 'small'/>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size = 'small'/>
                </div>
            </Segment>
            <Segment>
                <div as = 'h3' className = "text_thongtincoban">
                    Câu hỏi xác thực cho người mua/nhận 
                </div>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Nhập câu hỏi cho người nhận/mua</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="question" value={question} onChange={(e)=>setQuestion(e.target.value)}  placeholder="Vui lòng điền câu hỏi"/>
                    </div>
                </div>
            </Segment>
            <div class="ui buttons">
                <button class="ui button">Hủy</button>
                <div class="or"></div>
                <button class="ui positive button">Thêm sản phẩm </button>
            </div>
        </Segment>

    </form>
    </>
  )
}
