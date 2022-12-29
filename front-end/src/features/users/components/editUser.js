import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Button,Image,Segment,Form, TextArea } from 'semantic-ui-react';
import "../stylesUser/User.css"
export default function EditUser() {
  const [name,setName] = useState("")
  const [address,setAdress] = useState("")
  const [phone, setPhone] = useState("")
  const [gender,setGender] = useState("")
  const [city,setCity] = useState("")
  const handleSubmit = event =>{
    event.preventDefault()  
    const newID = 1000 + Math.floor(Math.random()*1000+ 9000);
    const newEdit = {
        name: name,
        address: address,
        phone: phone,
        gender: gender,
        city: city
    }
  }
  return (
    <>
    <div style = {{backgroundColor: "#DDE4F5"}} class = 'backGroundPage'>
    <br/>
    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular />
    <i class="camera icon" className = 'cameraIcon'></i>
    
    <span className = "text_header">Duy Mai   
    </span>
    <i class="pencil alternate icon"></i>
      <Segment style = {{backgroundColor: "#A0B4F3"}} className = "infoBox">
            <div as = 'h1' className = "text_header">
                    CHỈNH SỬA THÔNG TIN CÁ NHÂN
            </div>
            <Segment>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Họ tên</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="hotenUser" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Địa chỉ</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="hotenUser" value={address} onChange={(e)=>setAdress(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Số điện thoại liên lạc</label>
                    <div className="col-sm-10">
                        <input type="number" max = '10' className="form-control" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Giới tính</label>
                    <div className="col-sm-10">
                    <select class="ui dropdown">
                      <option value={gender} onChange={(e)=>setGender(e.target.value)}>Male</option>
                      <option value={gender} onChange={(e)=>setGender(e.target.value)}>Female</option>
                    </select>
                    </div>
                </div>
                <br/>
                <div className="form-group row">
                    <label htmlFor="productName" className="col-sm-2 col-form-label">Tỉnh/thành phố sinh sống</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="noiSinhSong" value={city} onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                </div>
                <br/>
                <div class="text_header">
                    <button class="ui positive button"> Lưu chỉnh sửa </button>
                </div>
            </Segment>
        </Segment>
    </div>
    </>
  )
}
