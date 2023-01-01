import useAuth from 'hooks/useAuth'
import React from 'react'
import { useSelector } from 'react-redux'
import './component.css'


export default function component() {
  const comments = [{
    id:43245,
    nameUser:"Duy Mai1",
    contentUser:"Áo rat dep1"
  },
  {
    id:43246,
    nameUser:"Duy Mai2",
    contentUser:"Áo rat dep2"
  },
  {
    id:43247,
    nameUser:"Duy Mai3",
    contentUser:"Áo rat dep3"
  },
  {
    id:43243,
    nameUser:"Duy Mai4",
    contentUser:"Áo rat dep4"
  }]
  return (
    <div>
      {comments.map((comment) => (
        <div>
          <div className='nameuser'>
              {comment.nameUser}
          </div>
          <div className='cmt'>{comment.contentUser}</div>
        </div>
          ))}
    </div>
  )
}
