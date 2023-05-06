import React, { useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { global } from "../App";

export default function Add_product() {

    const {Admin_data} =useContext(global);

    const [img_url,setimg_url]=useState("")
    const [product_name,setproduct_name]=useState("")
    const [price,setprice]=useState()
    const [offer,setoffer]=useState()
    const [product_type,setproduct_type]=useState("")
    const [noofproduct,setnoofproduct]=useState()

    const history=useNavigate();

    function add_product()
    {
        fetch('http://127.0.0.1:8000/product/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:Admin_data.email,
                product_url:img_url,
                product_name:product_name,
                price:price,
                number_count:noofproduct,
                offer:offer,
                product_type:product_type,
                location:Admin_data.city,

            })
        }).
        then(response=>response.json())
        .then((res)=>{
            alert(res)
            history('/Admin_front_page')
        },(error)=>{
            alert("fail to add")
        })
    }


  return (
    <div className='container'>
        <h4>Add Product</h4>
        <div class="row mt-4">
                <div className="col-md-4 mt-4">
                    <label style={{color:"green"}}>Product Image Url</label>
                    <input type="text" name="product_url" class="form-control mt-2" value={img_url} onChange={(e)=>{setimg_url(e.target.value)}} placeholder="Enter Product UIrl"  required/>
                </div>
                <div className="col-md-4 mt-4">
                    <label style={{color:"green"}}>Product Name</label>
                    <input type="text" name="product_name" class="form-control mt-2" value={product_name} onChange={(e)=>{setproduct_name(e.target.value)}} placeholder="Enter Product Name"  required/>
                </div>
            </div>
            <div class="row mt-2">
                <div className="col-md-4 mt-4">
                    <label style={{color:"green"}}>Price</label>
                    <input type="number" name="price" class="form-control mt-2" value={price} onChange={(e)=>{setprice(e.target.value)}} placeholder="Enter Price"  required/>
                </div>
                <div className="col-md-4 mt-4">
                    <label style={{color:"green"}}>Offer</label>
                    <input type="number" name="offer" class="form-control mt-2" value={offer} onChange={(e)=>{setoffer(e.target.value)}} placeholder="Enter Offer"  required/>
                </div>
            </div>
            <div class="row mt-2">
                <div className="col-md-4 mt-4">
                    <label style={{color:"green"}}>Product Type</label>
                    <input type="text" name="product_type" class="form-control mt-2" value={product_type} onChange={(e)=>{setproduct_type(e.target.value)}} placeholder="Enter Product Type"  required/>
                </div>
                <div className="col-md-4 mt-4">
                    <label style={{color:"green"}}>No Of Product</label>
                    <input type="number" name="number_count" class="form-control mt-2" value={noofproduct} onChange={(e)=>{setnoofproduct(e.target.value)}} placeholder="Enter Product Count"  required/>
                </div>
            </div>
            <button className='btn btn-primary mt-3' onClick={add_product} >ADD</button>
    </div>
  )
}
