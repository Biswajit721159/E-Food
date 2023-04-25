import React from 'react'
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div class="row mt-5">
    <div class="col mx-5">
      <Link to={'/product_info'}><button className='btn btn-primary'>Manage product</button></Link>
    </div>
    <div class="col">
      <button className='btn btn-primary'> Manage User</button>
    </div>
    <div class="col">
      <button className='btn btn-primary'> Manage Bag</button>
    </div>
    <div class="col">
      <button className='btn btn-primary'> Manage order</button>
    </div>
    <div class="col">
      <button className='btn btn-primary'> Manage iswishlist</button>
    </div>
    <div class="col">
      <button className='btn btn-primary'> Manage Reviews</button>
    </div>
    <div class="col">
      <button className='btn btn-primary'> Manage card_info</button>
    </div>
</div>
  )
}
