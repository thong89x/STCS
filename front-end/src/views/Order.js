import React from 'react'
import './styles/Order.css'
export default function Order() {
  return (
    <div className='order'>
        <div className='box'>Form Registry Order</div>
        <div className='background-input'>
        <div className='input'>Full name:</div>
        <input className='input_text' placeholder='Enter your full name.'/>
        <div className='input_double'>
        <div className='input'>Email Id:</div>
        <input className='input_text' placeholder='abc@gmail.com'/>
        <div className='input'>Mobile No:</div>
        <input className='input_text' placeholder='+84 - 827431231'/>
        </div>
        <div className='input'>Address:</div>
        <input className='input_text' placeholder='xxxxxxxxx.'/>
        <div className='input'>Quantity:</div>
        <input className='input_text' placeholder='1,2,3...'/>
        <div className='space '/>
        <button className='button'>Confirm</button>
        </div>
    </div>
  )
}


