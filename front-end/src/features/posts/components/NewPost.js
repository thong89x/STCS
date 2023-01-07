import React, { useState,useRef } from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setCredentials } from 'features/auth/authSlice'
import { addPost, removePost} from 'features/posts/postSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import "../styles/Post.css"
import { Button,Image,Segment,Form, TextArea } from 'semantic-ui-react';
export default function NewPost() {
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const [type,setType] = useState("books")
    const [question, setQuestion] = useState("")
    const [address, setAdress] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [linkAnh , setLinkAnh] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {token} = useSelector(state=> state.auth)
    const {id} = useParams()
    const {username} = useParams()
    const link1 = useRef()
    const link2 = useRef()
    const link3 = useRef()
    const link4 = useRef()
    const link5 = useRef()
    const handleSubmit = event =>{
    event.preventDefault()
    const imageURL = [link1.current.value,link2.current.value,link3.current.value,link4.current.value,link5.current.value];  
    const newPost = {
        nameProduct: name,
        describePost: desc,
        address: address,
        priceProduct: price,
        amountRegistry: quantity,
        typeProduct: type,
        imageURL: imageURL
    }
    console.log(newPost)
    const config = {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token? token: 'a'}`,
        },
        };
        axios.defaults.withCredentials = true
        axios.post('http://localhost:5000/posts/', newPost,config)
        .then((response)=>{
            console.log(response.data)
            navigate(-1)
        }).catch((err)=>{
        if (err?.response?.status == 403 ||err?.response?.status == 400  ){
            console.log('sending request token')
            axios.get('http://localhost:5000/auth/refresh',config).then((res)=>{
            const accessToken = res.data
     
            dispatch(setCredentials(accessToken))
            return accessToken
            }).then((res)=>{
             
            config.headers.Authorization = `Bearer ${res.accessToken}`
            axios.post('http://localhost:5000/posts/', newPost,config)
            .then((response)=>{
                console.log(response.data)
                navigate(-1)
            })
            })
            .catch((err)=>{
            navigate('/login')
            })
        }
    })
    }
    const navigateHome = () => 
    {
      navigate(-1);
    };
  return (<>
    <form  onSubmit={handleSubmit}>
        <div className = "outlineFrame_">
            <div as = 'h1' className = "text_themsanpham">
                    ADD A NEW PRODUCT
            </div>
            <Segment>
                <div as = 'h3' className = "text_thongtincoban">
                        BASIC INFORMATION
                </div>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Product's Name</label>
                    <div className="col-sm-10">
                        <input required type="text" className="form-control" id="tensp" value={name} onChange={(e)=>setName(e.target.value)} minLength="3" maxLength="2000" placeholder="Enter product's Name"/>
                    </div>
                </div>
                <br/>
                {/* <div className="form-group row">
                    <label htmlFor="productDescribe" className="col-sm-2 col-form-label">Mô tả sản phẩm</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="motasp" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Nhập mô tả sản phẩm"/>
                    </div>
                </div> */}
                <div className="field">
                    <label>Description</label>
                    <textarea placeholder="Please Enter product's Description" className="form-control" id="motasp" value={desc} onChange={(e)=>setDesc(e.target.value)}>
                    </textarea>
                </div>
                <br/>
                <div className="form-group row">
                    <span htmlFor="productName" className="col-sm-2 col-form-label">Publisher's Address</span>
                    <div className="col-sm-10">
                        <input required type="text" className="form-control" id="diachinguoiban" value={address} onChange={(e)=>setAdress(e.target.value)} minLength="3" maxLength="2000"  placeholder="Enter publisher's address"/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Price (Maximum: 150.000VNĐ)</label>
                    <div className="col-sm-10">
                        <input required type="number" min='0' max='150000' className="form-control" id="giatien" maxLength="6" value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder="Enter product price (VNĐ)"/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Amount</label>
                    <div className="col-sm-10">
                        <input required type="number" min='0' max='1500' className="form-control" id="soluong" value={quantity} onChange={(e)=>setQuantity(e.target.value)}  placeholder="Enter the number of products"/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Product's Type</label>
                    <select className="ui dropdown" onChange={(e)=>setType(e.target.value)}>
                        {/* <input required type="text" className="form-control" id="loaihanghoa" value={type} onChange={(e)=>setType(e.target.value)} minLength="3" maxLength="2000" placeholder="Nhập loại hàng hóa"/> */}
                        <option >books</option>
                        <option >clothes</option>
                        <option >school supplies</option>
                    </select>
                </div>
            </Segment>
            <Segment>
                <div as = 'h3' className = "text_thongtincoban">
                        Image Management
                </div>
                <div className="form-group row">
                    <label htmlFor="productImage" className="col-sm-2 col-form-label">Image Link of Product</label>
                    <div className="col-sm-10">
                        <input ref={link1} type="url" className="form-control" maxlength="30000" id="linkanh1" onChange={(e)=>setLinkAnh(e.target.value)}  placeholder="Add Image Link 1 "/>
                        <input ref={link2} type="url" className="form-control" maxlength="30000" id="linkanh2" onChange={(e)=>setLinkAnh(e.target.value)}  placeholder="Add Image Link 2"/>
                        <input ref={link3} type="url" className="form-control" maxlength="30000" id="linkanh3" onChange={(e)=>setLinkAnh(e.target.value)}  placeholder="Add Image Link 3"/>
                        <input ref={link4} type="url" className="form-control" maxlength="30000" id="linkanh4" onChange={(e)=>setLinkAnh(e.target.value)}  placeholder="Add Image Link 4"/>
                        <input ref={link5} type="url" className="form-control" maxlength="30000" id="linkanh5" onChange={(e)=>setLinkAnh(e.target.value)}  placeholder="Add Image Link 5"/>
                    </div>
                </div>
            </Segment>
            <Segment>
                <div as = 'h3' className = "text_thongtincoban">
                    Validation Questions for receivers/buyers 
                </div>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Please enter question for receivers/buyers</label>
                    <div className="ui disabled input">
                        <input type="text" className="form-control" id="question" value={question} onChange={(e)=>setQuestion(e.target.value)}  placeholder="Why do you need the item?:"/>
                    </div>
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Please enter question for receivers/buyers</label>
                    <div className="ui disabled input">
                        <input type="text" className="form-control" id="question" value={question} onChange={(e)=>setQuestion(e.target.value)}  placeholder="Do you need it right now?"/>
                    </div>
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Please enter question for receivers/buyers</label>
                    <div className="ui disabled input">
                        <input type="text" className="form-control" id="question" value={question} onChange={(e)=>setQuestion(e.target.value)}  placeholder="What is your degree?"/>
                    </div>
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Please enter question for receivers/buyers</label>
                    <div className="ui disabled input">
                        <input type="text" className="form-control" id="question" value={question} onChange={(e)=>setQuestion(e.target.value)}  placeholder="New publisher of LOL video game?"/>
                    </div>
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Please enter question for receivers/buyers</label>
                    <div className="ui disabled input">
                        <input type="text" className="form-control" id="question" value={question} onChange={(e)=>setQuestion(e.target.value)}  placeholder="Can you please rate 5 stars for my shop?"/>
                    </div>
                </div>
                <hr/>
                {/* <a className="ui red tag label">Thêm câu hỏi</a> */}
            </Segment>
            <div className="ui buttons">
                <button className="ui button" onClick = {navigateHome}>Decline</button>
                <div className="or"></div>
                <button type='submit' className="ui positive button"> Add a new Product </button>
            </div>
        </div>
    </form>   
    </>
  )
}