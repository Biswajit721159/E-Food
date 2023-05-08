import React, { useState,useEffect ,useContext } from "react";
import { global } from "../App";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from 'react-router-dom'

export default function Order() {

const {Admin_data,Setadmin_data} =useContext(global);
const history=useNavigate();
const [product,setproduct]=useState([])

useEffect(()=>{
    loadorder()
},[])

function loadorder()
{
    fetch('http://127.0.0.1:8000/order/').then(response=>response.json())
    .then((order)=>{
      fetch('http://127.0.0.1:8000/product/').then(response=>response.json())
      .then((product)=>{
        find_product(order,product)
      })
    })
}

function find_product(order,product)
{
  if (order==undefined || product==undefined) return;
  else
  {
    let arr=[]
    for (let i=0;i<order.length;i++)
    {
      for(let j=0;j<product.length;j++)
      {
        if(order[i].product_id==product[j].id && product[j].email==Admin_data.email)
        {
          let obj={
            order_id:order[i].order_id,
            mobile:order[i].mobile,
            product_id:order[i].product_id,
            price:order[i].price,
            number_product:order[i].number_product,
            date:order[i].date,
            order_status:order[i].order_status,
            product_name:product[j].product_name,
          }
          arr.push(obj);
        }
      }
    }
    arr.reverse()
    setproduct(arr)
  }
}

function mark(item)
{
  if(window.confirm('Are you sure to approve this product ?'))
  {
    fetch('http://127.0.0.1:8000/order/',{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            order_id:item.order_id,
            date:item.date,
            mobile:item.mobile,
            number_product:item.number_product,
            order_status:true,
            price:item.price,
            product_id:item.product_id,
        })
    }).then(response=>response.json())
    .then((res)=>{
      alert(res)
      loadorder()
    },((error)=>{
      alert(error)
    }))
  }
}

  return (
    <div className="container mt-3">
      {
        product !=undefined && product.length!=0?
        <div>
          {
            product.map((item,ind)=>(
              <table className="table shadow-lg p-0 mb-2 bg-white rounded" key={ind}>
                <thead>
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Product Id</th>
                    <th scope="col">Product Name</th>
                    <th scope='col'>Price</th>
                    <th scope="col">Number Product</th>
                    <th scope="col">Date</th>
                    <th score="col">Mark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.order_id}</td>
                    <td><h5>{item.mobile}</h5></td>
                    <td><h5>{item.product_id}</h5></td>
                    <td><h5>{item.product_name}</h5></td>
                    <td>{item.price}</td>
                    <td>{item.number_product}</td>
                    <td>{item.date}</td>
                    {
                      item.order_status?<td><button className="btn btn-primary" disabled>Done</button></td>: 
                      <td><button className="btn btn-primary" onClick={()=>{mark(item)}}>Approve</button></td>
                    }
                  </tr>
                </tbody>
              </table>
            ))
          }
        </div>
        :"Order is not found"
      }
    </div>
  )
}
