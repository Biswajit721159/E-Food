import React, { useState,useContext, useEffect } from 'react'
import { global } from "../App";
import { Link, json, useNavigate } from "react-router-dom";


export default function Admin_front_page() {
  
  const {Admin_data} =useContext(global);
  const [product,setproduct]=useState([]);

  useEffect(()=>{
    loadproduct()
  },[Admin_data.email])

  function loadproduct()
  {
    fetch('http://127.0.0.1:8000/product/').then(response=>response.json())
    .then((res)=>{
      find_product(res)
    })
  }

  function find_product(nums)
  {
    if (nums==undefined) return ;
    else
    {
      let arr=[]
      for(let i=0;i<nums.length;i++)
      {
        if(nums[i].email==Admin_data.email)
        {
          arr.push(nums[i])
        }
      }
      setproduct([...arr])
    }
  }
  return (
    <div classNameName='container mt-5'>
            <div className='container mt-5' >
                <table className="table table-striped table-hover" >
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Offer</th>
                            <th>Product Type</th>
                            <th>Location</th>
                            <th>Number Product</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        
                            <td><input type="search"  name="product_id" className="form-control" placeholder="Search product_id" aria-label="Search" /></td>
                            <td><input type="search"  name="product_name" className="form-control" placeholder="Search product_name" aria-label="Search" /></td>
                            <td><input type="search"  name="price" className="form-control" placeholder="Search price" aria-label="Search" /></td>
                            <td><input type="search"  name="offer" className="form-control" placeholder="Search offer" aria-label="Search" /></td>
                            <td><input type="search"  name="product_type" className="form-control" placeholder="Search product_type" aria-label="Search" /></td>
                            <td><input type="search"  name="location" className="form-control" placeholder="Search location" aria-label="Search" /></td>
                            <td><input type="search"  name="number_product" className="form-control" placeholder="Number_product" aria-label="Search" /></td>
                        <td>---</td>
                        <td>---</td>
                        </tr>
                        
                           {
                             product!=undefined && product.length!=0?
                              product.map((i,ind)=>(
                                <tr key={ind}>
                                    <td>{i.id}</td>
                                    <td>{i.product_name}</td>
                                    <td>{i.price}</td>
                                    <td>{i.offer}</td>
                                    <td>{i.product_type}</td>
                                    <td>{i.location}</td>
                                    <td>{i.number_count}</td>
                                    <td>
                                        <Link to={`/product/update/${i.id}`} className="edit" ><button className="btn btn-primary btn-sm">Edit</button></Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                                ))
                              :"product not found"
                           }
                    </tbody>
            </table>
        </div>
    </div>
  )
}
