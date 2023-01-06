import React, { useState } from 'react'
import "../stylesUser/Notifications.css"
export default function Notifications() {
  const listNotifications = [ 
    {username: "Duy Mai", content: "Vừa đăng ký đơn hàng"},
    {username: "Hữu Bằng", content: "Vừa bình luận vào bài viết"},
    {username: "Bùi Dũng", content: "Vừa đánh giá đơn hàng"},
    {username: "Thông Võ", content: "Yêu cầu đăng ký nhận hàng của bạn"},
  ];
    const [listNoti, setlistNoti] = useState()
  return (
    <div className='NotiContainer'>
      <div className='boxNoti'>
        <div className='formNoti'>
          Notifications
        </div>
        <div className='Noti'>
        {listNotifications.map((element) =>{
          return <div>
            <div className='usn'>
              {element.username} 
            </div>
            {element.content}
          </div>
        }
        )}
        </div>
      </div>
    </div>
  )
}
