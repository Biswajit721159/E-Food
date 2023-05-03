import React, { useEffect, useState } from 'react'



export default function Daily_food() {

 const [gif,setgif]=useState(false);
 const [product,setproduct]=useState([]);


 useEffect(()=>{
  loadproduct();
 },[])

 function loadproduct()
 {
    fetch('http://127.0.0.1:8000/product/').then(response=>response.json()).then((res)=>{
      setproduct(res)
      setgif(true)
    })
 }


  return (
    <div>
      {
        gif==true
        ?
        <div class="container mt-4">
          <div class="row">
            <div class="col">
              <p>Break Fast</p>
              <button className='btn btn-primary'>Add product</button>
            </div>
            <div class="col order-12">
              <p>Lanch</p>
              <button className='btn btn-primary'>Add product</button>
            </div>
            <div class="col order-1">
              <p>Dinner</p>
              <button className='btn btn-primary'>Add product</button>
            </div>
          </div>
       </div>
       :
        <div class="loader-container">
          <img src={require('../other/loader.gif')} alt="error to load"/>
        </div>
      }
    </div>
  )
}
