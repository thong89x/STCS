import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { addPost, removePost} from 'features/posts/postSlice'
import { useDispatch } from 'react-redux'
import "../styles/Post.css"
import { Button,Image,Segment,Form, TextArea } from 'semantic-ui-react';
export default function NewPost() {
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
                <br/>
                {/* <div className="form-group row">
                    <label htmlFor="productDescribe" className="col-sm-2 col-form-label">Mô tả sản phẩm</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="motasp" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Nhập mô tả sản phẩm"/>
                    </div>
                </div> */}
                <div class="ui form">
                    <div class="field">
                        <label>Mô tả sản phẩm</label>
                        <textarea placeholder='Vui lòng nhập mô tả sản phẩm' className="form-control" id="motasp" value={desc} onChange={(e)=>setDesc(e.target.value)}>
                        </textarea>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Địa chỉ người thêm sản phẩm</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="diachinguoiban" value={address} onChange={(e)=>setAdress(e.target.value)}  placeholder="Thêm địa chỉ người bán"/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Giá mặt hàng (Tối đa: 150.000VNĐ)</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="giatien" min="0" max="150000" value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder="Nhập số tiền (VNĐ)"/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Số lượng</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="soluong" value={quantity} onChange={(e)=>setQuantity(e.target.value)}  placeholder="Nhập số tiền (VNĐ)"/>
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
                <hr/>
                <a class="ui red tag label">Thêm câu hỏi</a>
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
