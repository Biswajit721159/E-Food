import React, { useState,useContext, useEffect } from 'react'
import { global } from "../App";
import { Link, json, useNavigate } from "react-router-dom";


export default function Admin_front_page() {
  
  const {Admin_data} =useContext(global);
  const [product,setproduct]=useState([]);
  const [user,setuser]=useState([])

  //SEARCHING 
  const [product_id,setproduct_id]=useState("")
  const [product_name,setproduct_name]=useState("")
  const [price,setprice]=useState("")
  const [offer,setoffer]=useState("")
  const [product_type,setproduct_type]=useState("")
  const [location,setlocation]=useState("")
  const [number_count,setnumber_count]=useState("")

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
        if(nums[i].email==Admin_data.email && nums[i].isdeleted==false)
        {
          arr.push(nums[i])
        }
      }
      setproduct([...arr])
      setuser([...arr])
    }
  }
  
  function delete_product(id)
  {
    fetch('http://127.0.0.1:8000/product/',{
          method:'DELETE',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              email:Admin_data.email,
              product_id:id,
              isdeleted:true,
            })
    }).then(response=>response.json())
    .then((res)=>{
      alert(res)
      loadproduct()
    },
    (error)=>{
      alert(error)
    })
  }
   
  function clear()
  {
    setproduct_id("")
    setproduct_name("")
    setproduct_type("")
    setprice("")
    setlocation("")
    setnumber_count("")
    setoffer("")
    loadproduct()
  }
  //searching functionn

  function search_product_id()
  {
    if (user==undefined) return ;
    else
    {
      let arr=[]
      for(let i=0;i<user.length;i++)
      {
        if(user[i].id==product_id)
        {
          arr.push(user[i])
        }
      }
      setproduct([...arr])
    }
  }

  function search_product_name()
  {
    if (user==undefined) return ;
    else
    {
      let arr=[]
      for(let i=0;i<user.length;i++)
      {
        if(user[i].product_name==product_name)
        {
          arr.push(user[i])
        }
      }
      setproduct([...arr])
    }
  }

  function search_price()
  {
    if (user==undefined) return ;
    else
    {
      let arr=[]
      for(let i=0;i<user.length;i++)
      {
        if(user[i].price==price)
        {
          arr.push(user[i])
        }
      }
      setproduct([...arr])
    }
  }

  function search_offer()
  {
    if (user==undefined) return ;
    else
    {
      let arr=[]
      for(let i=0;i<user.length;i++)
      {
        if(user[i].offer==offer)
        {
          arr.push(user[i])
        }
      }
      setproduct([...arr])
    }
  }

  function search_product_type()
  {
    if (user==undefined) return ;
    else
    {
      let arr=[]
      for(let i=0;i<user.length;i++)
      {
        if(user[i].product_type==product_type)
        {
          arr.push(user[i])
        }
      }
      setproduct([...arr])
    }
  }

  function search_location()
  {
    if (user==undefined) return ;
    else
    {
      let arr=[]
      for(let i=0;i<user.length;i++)
      {
        if(user[i].location==location)
        {
          arr.push(user[i])
        }
      }
      setproduct([...arr])
    }
  }

  function search_number_count()
  {
    if (user==undefined) return ;
    else
    {
      let arr=[]
      for(let i=0;i<user.length;i++)
      {
        if(user[i].number_count==number_count)
        {
          arr.push(user[i])
        }
      }
      setproduct([...arr])
    }
  }
  return (
    <div classNameName='container mt-5'>
            <div className='container mt-5' >
              <button className='btn btn-dark btn-sm' onClick={clear}>clear search</button>
                <table className="table table-striped table-hover mt-4" >
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
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input  value={product_id} onChange={(e)=>setproduct_id(e.target.value)}  className="form-control" placeholder="product_id"   /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_product_id}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={product_name} onChange={(e)=>setproduct_name(e.target.value)}  className="form-control" placeholder="Name" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_product_name}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={price} onChange={(e)=>setprice(e.target.value)}  className="form-control" placeholder="Price" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_price}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={offer} onChange={(e)=>setoffer(e.target.value)}  className="form-control" placeholder="Offer" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_offer}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={product_type} onChange={(e)=>setproduct_type(e.target.value)} className="form-control" placeholder="Type" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_product_type}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={location} onChange={(e)=>setlocation(e.target.value)}  className="form-control" placeholder="Location" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_location}>GO</button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className='row mx-0'>
                                <div className='col-md-11 px-0'><input value={number_count} onChange={(e)=>setnumber_count(e.target.value)} className="form-control" placeholder="Number_product" aria-label="Search"  /></div>
                                <div className='col mt-1 mx-1 px-0'>
                                    <button className='btn btn-primary btn-sm' onClick={search_number_count}>GO</button>
                                </div>
                              </div>
                            </td>
                        <td></td>
                        <td></td>
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
                                        <button className="btn btn-danger btn-sm" onClick={()=>{delete_product(i.id)}}>Delete</button>
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
