import React, { Component } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
     
        <div class="row mt-5">
            <div class="col mx-5">
              <button className='btn btn-primary'>Manage product</button>
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
}
