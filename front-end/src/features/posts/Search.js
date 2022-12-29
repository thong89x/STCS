import React from 'react'
import UsersList from 'features/users/components/userList'
import { useSearchParams } from 'react-router-dom';
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("typeorder")

  return (
    <div className='searchContainer'>
        <h2 className=''>Browse 1234 results for "{searchParams.get("typeorder")}"</h2>
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
