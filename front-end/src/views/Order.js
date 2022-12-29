import React from 'react'
import './Order.css'
export default function Order() {
  return (
    <div className='order'>
        <div className='box'>Form Registry Order</div>
        <div className='input'>
        <div >Full name:</div>
        <input className='input_text' placeholder='Enter your full name.'/>
        <div>Email Id:</div>
        <input className='input_text' placeholder='abc@gmail.com'/>
        <div>Mobile No:</div>
        <input className='input_text' placeholder='+84 - 827431231'/>
        <div>Address:</div>
        <input className='input_text' placeholder='xxxxxxxxx.'/>
        <div>Quantity:</div>
        <input className='input_text' placeholder='1,2,3...'/>
        <br/>
        <div className='button'>
        <div className='row d-flex justify-content-center'>
        <button className='col-2'>Confirm</button>
        </div>
        </div>
        </div>
    </div>
  )
}


