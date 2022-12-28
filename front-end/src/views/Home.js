import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoList from '../components/TodoList';

import { addPost, removePost} from 'features/todos/todoSlice'
import styled from 'styled-components';
import "./Home.css"

export default function Home() {
    const todoList = useSelector(state=> state.todoList);
    // const activeID = useSelector(state=> state.todoList.activeID);

    const dispatch = useDispatch()
    console.log(todoList)
    const handleAddTodoClick = () =>{
        const newID = 1000 + Math.floor(Math.random()*1000+ 9000);
        const newTodo ={
            id: newID,
            title: `Todo ${newID} `
        }
        const action = addPost(newTodo)
        dispatch(action)
    }
    const handleTodoClick = (todo, idx) => {
        const action = removePost(idx);
        dispatch(action);
    }
  return (  
    // <div className='home-page'>
    //     <button onClick={handleAddTodoClick}>Random Todo</button>
    //     <ul>
    //     {todoList.map((todo, idx) => (
    //         <li key={todo.id} onClick={() => handleTodoClick(todo, idx)}>
    //             {todo.title}
    //         </li>
    //     ))}
    //     </ul>
    // </div>
    <div className='homeContainer'>

    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://hangthanhly436.com/wp-content/uploads/2022/02/banner.jpg" class="d-block w-100" alt="Not found"/>
    </div>
    <div class="carousel-item">
      <img src="https://thanhlyngay.vn/wp-content/uploads/2019/03/banner-1-1752x730.png" class="d-block w-100" alt="Not Found"/>
    </div>
    <div class="carousel-item">
      <img src="https://th.bing.com/th/id/R.cbb2977aec1c607b5ed54884e5c9e74a?rik=TMhNpDO2nFsKrA&pid=ImgRaw&r=0" class="d-block w-100" alt="..."/>
    </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>
      <div className='row mt-3 '>
        <h2 className='col-4'>Recommend for you </h2>
        <button className='col-1 rounded-pill'>Show all</button>
      </div>
      <div className='row d-flex flex-wrap justify-content-between'>
        <div className='product'>
          <img src="https://th.bing.com/th/id/R.0fcbb14681efe4b5bc25813c16bde304?rik=r9vRoNDKrsRDTA&pid=ImgRaw&r=0" class="d-block" alt="Not found"/>
          <h3 className='text-center'>Áo thun</h3>
        </div>
        <div className='product'>
          <img src="https://th.bing.com/th/id/OIP.THOLrXSux_tuWg88YA2PigHaJ4?pid=ImgDet&w=3600&h=4800&rs=1" class="d-block" alt="Not found"/>
          <h3 className='text-center'>Áo khoác</h3>
        </div>
        <div className='product'>
          <img src="https://images-na.ssl-images-amazon.com/images/I/61IbbtxnCIL._AC_UX466_.jpg" class="d-block" alt="Not found"/>
          <h3 className='text-center'>Áo phao</h3>
        </div>
        <div className='product'>
          <img src="https://th.bing.com/th/id/OIP.SW3BoS5QYVOi5aMrPNycpQHaHa?pid=ImgDet&w=2020&h=2020&rs=1" class="d-block" alt="Not found"/>
          <h3 className='text-center'>Quần jean</h3>
        </div>

      </div>
      <div className='row mt-3 '>
        <h2 className='col-4'>Most Searched </h2>
        <button className='col-1 rounded-pill'>Show all</button>
      </div>
      <div className='row d-flex flex-wrap justify-content-between'>
        <div className='product'>
          <img src="https://th.bing.com/th/id/R.0fcbb14681efe4b5bc25813c16bde304?rik=r9vRoNDKrsRDTA&pid=ImgRaw&r=0" class="d-block" alt="Not found"/>
          <h3 className='text-center'>Áo thun</h3>
        </div>
        <div className='product'>
          <img src="https://th.bing.com/th/id/OIP.THOLrXSux_tuWg88YA2PigHaJ4?pid=ImgDet&w=3600&h=4800&rs=1" class="d-block" alt="Not found"/>
          <h3 className='text-center'>Áo khoác</h3>
        </div>
        <div className='product'>
          <img src="https://images-na.ssl-images-amazon.com/images/I/61IbbtxnCIL._AC_UX466_.jpg" class="d-block" alt="Not found"/>
          <h3 className='text-center'>Áo phao</h3>
        </div>
        <div className='product'>
          <img src="https://th.bing.com/th/id/OIP.SW3BoS5QYVOi5aMrPNycpQHaHa?pid=ImgDet&w=2020&h=2020&rs=1" class="d-block" alt="Not found"/>
          <h3 className='text-center'>Quần jean</h3>
        </div>

      </div>
    </div>
  )
}

