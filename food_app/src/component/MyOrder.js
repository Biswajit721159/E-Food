import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { global } from '../App';
import swal from 'sweetalert';

export default function MyOrder() {

 const {Mobile,Function}=useContext(global); 


 const [product,setproduct]=useState([]);
 const [myproduct,setmyproduct]=useState([]);


 useEffect(() => {
  loadproduct();
}, [Mobile]);

 const loadproduct = async () => {
    // await axios.get("http://localhost/main/New%20folder/order_product.php").then((res)=>{
    //   axios.get("http://localhost/main/New%20folder/main.php").then((result)=>{
    //     set_beg(res.data.result,result.data.result);
    //     setproduct(result.data.result);
    //   })
    // })

  fetch('http://127.0.0.1:8000/order/').then(response=>response.json()).then((res) =>{
    fetch('http://127.0.0.1:8000/product/').then(response=>response.json()).then((result) =>{
      // setcurrmybag(mybag);
      // setInTOproduct(product,mybag);
      set_beg(res,result);
      setproduct(result);
    })
  })

};

function set_beg(nums,product){
  if(nums==undefined) return ;
  let arr=[];
  for(let i=0;i<nums.length;i++)
  {
    for(let j=0;j<product.length;j++)
    {
      if(nums[i].mobile==Mobile && nums[i].product_id==product[j].id)
      {
        let obj={
          id:product[j].id,
          product_name:product[j].product_name,
          product_url:product[j].product_url,
          price:nums[i].price,
          product_count:nums[i].number_product,
          date:nums[i].date
        }
        arr.push(obj);
      }
    }
  }
  const reversed = [...arr].reverse();
  setmyproduct([...reversed]);
}

function My_Feedback()
{
  swal("Write Typing Your Rating Out of 5", {
    content: "input",
  })
  .then((value) => {
    console.log(value);
  })
}


  return (
    <div className='container mt-5'>
        <h3>Your Order {Mobile}</h3>
        <div className="col mt-5">
        {(myproduct.length!==0)?
          myproduct.map((item,ind)=>(
            <table class="table shadow-lg p-0 mb-2 bg-white rounded" key={ind}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Date</th>
                    <th scope='col'>No. Product</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{ind}</th>
                    <td><div className="card mt-0 mx-0 my-0" style={{ width: 200, height:200}} key={ind}>
                        <img
                            src={item.product_url}
                            className="card-img-top"
                            style={{ width: 180, height: 180 ,marginLeft:10,marginTop:10 }}
                            alt="Please Wait"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.product_name}</h5>
                          </div>
                        </div></td>
                    <td><h5>₹{item.price}</h5></td>
                    <td><h5>{item.date}</h5></td>
                    <td><h5>{item.product_count}</h5></td>
                    <td><button className='btn btn-primary' onClick={My_Feedback} >My Feedback</button></td>
                  </tr>
                </tbody>
              </table>
          ))
          : "Order Not Found !"}
      </div>
    </div>
  )
}
