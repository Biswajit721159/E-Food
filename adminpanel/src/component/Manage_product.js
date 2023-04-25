import React, { useEffect, useState } from 'react'
import '../App.css';
export default function Manage_product() {

  const [product,setproduct]=useState([])
  const [myproduct,setmyproduct]=useState([])
  const [product_id,setproduct_id]=useState("");
  const [product_name,setproduct_name]=useState("")
  const [price,setprice]=useState("")
  const [number_count,setnumber_count]=useState("");
  const [offer,setoffer]=useState("")
  const [product_type,setproduct_type]=useState("")
  const [location,setlocation]=useState("")


  useEffect(()=>{
    loadproduct();
  },[])

  useEffect(()=>{
    searchproduct_id();
  },[product_id])

  useEffect(()=>{
    searchproduct_name()
  },[product_name])
 
  useEffect(()=>{
    searchprice()
  },[price])

  useEffect(()=>{
    searchoffer();
  },[offer])

  useEffect(()=>{
    searchproduct_type();
  },[product_type])

  useEffect(()=>{
    searchlocation()
  })

  function searchlocation()
  {
    if(product==undefined || myproduct==undefined)
    {
      return;
    }
    else if(location.length==0)
    {
      loadproduct();
    }
    else
    {
      let arr=[]
      for(let i=0;i<myproduct.length;i++)
      {
        if(myproduct[i].location.toLowerCase()==location.toLowerCase())
        {
          arr.push(myproduct[i]);
        }
      }
      setproduct([...arr])
    }
  }

  function searchproduct_type()
  {
    if(product==undefined || myproduct==undefined)
    {
      return;
    }
    else if(product_type.length==0)
    {
      loadproduct();
    }
    else
    {
      let arr=[]
      for(let i=0;i<myproduct.length;i++)
      {
        if(myproduct[i].product_type.toLowerCase()==product_type.toLowerCase())
        {
          arr.push(myproduct[i]);
        }
      }
      setproduct([...arr])
    }
  }

  function searchoffer()
  {
    if(product==undefined || myproduct==undefined)
    {
      return;
    }
    else if(offer.length==0)
    {
      loadproduct();
    }
    else
    {
      let arr=[]
      for(let i=0;i<myproduct.length;i++)
      {
        if(myproduct[i].offer==offer)
        {
          arr.push(myproduct[i]);
        }
      }
      setproduct([...arr])
    }
  }

  function searchprice()
  {
    if(product==undefined || myproduct==undefined)
    {
      return;
    }
    else if(price.length==0)
    {
      loadproduct();
    }
    else
    {
      let arr=[]
      for(let i=0;i<myproduct.length;i++)
      {
        if(myproduct[i].price==price)
        {
          arr.push(myproduct[i]);
        }
      }
      setproduct([...arr])
    }
  }

  function searchproduct_name()
  {
    if(product==undefined || myproduct==undefined)
    {
      return;
    }
    else if(product_name.length==0)
    {
      loadproduct();
    }
    else
    {
      let arr=[];
      for(let i=0;i<myproduct.length;i++)
      {
        if(myproduct[i].product_name.toLowerCase()==product_name.toLowerCase())
        {
          arr.push(myproduct[i]);
        }
      }
      setproduct([...arr])
    }
  }

  function searchproduct_id ()
  {
    if(product==undefined || myproduct==undefined)
    {
      return;
    }
    else if(product_id.length==0)
    {
      loadproduct()
    }
    else
    {
      let arr=[]
      for(let i=0;i<myproduct.length;i++)
      {
        if(myproduct[i].id==product_id)
        {
          arr.push(myproduct[i]);
        }
      }
      setproduct([...arr]);
    }
  }

  function loadproduct()
  {
    fetch('http://127.0.0.1:8000/product/').then(responce=>responce.json()).then((res)=>{
      setproduct(res)
      setmyproduct(res)
    })
  }
  

  

  function Delete()
  {

  }

  return (
    <div >
      
            <table className="table table-bordered mx-2 my-3" >
                <thead>
                  <tr>
                  <td>product_id</td>
                  <td>product_img</td>
                  <td>product_Name</td>
                  <td>Price</td>
                  <td>number_count</td>
                  <td>offer</td>
                  <td>product_type</td>
                  <td>location</td>
                  <td>Delete</td>
                  <td>Update</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> <div class="col-xs-3">
                      <input class="form-control" placeholder='Enter Id' value={product_id} onChange={(e)=>{setproduct_id(e.target.value)}} style={{padding:"5%"}}  type="text"/>
                    </div></td>
                    <td></td>
                    <td><input class="form-control" placeholder='product Name' value={product_name} onChange={(e)=>{setproduct_name(e.target.value)}} style={{padding:"5%"}}  type="text"/></td>
                    <td><input class="form-control" placeholder='Price' value={price} onChange={(e)=>{setprice(e.target.value)}} style={{padding:"5%"}}  type="text"/></td>
                    <td><input class="form-control" placeholder='Number Count' value={number_count} onChange={(e)=>{setnumber_count(e.target.value)}} style={{padding:"5%"}}  type="text"/></td>
                    <td><input class="form-control" placeholder='Offer' value={offer} onChange={(e)=>{setoffer(e.target.value)}} style={{padding:"5%"}}  type="text"/></td>
                    <td><input class="form-control" placeholder='Product Type' value={product_type} onChange={(e)=>{setproduct_type(e.target.value)}} style={{padding:"5%"}}  type="text"/></td>
                    <td><input class="form-control" placeholder='Location' value={location} onChange={(e)=>{setlocation(e.target.value)}} style={{padding:"5%"}}  type="text"/></td>
                    <td></td>
                    <td></td>
                  </tr>
                {
                (product.length!==0)?
                    product.map((item,ind)=>(
                  <tr>
                  <td key={ind}>{item.id}</td>
                  <td>
                       <img
                            src={item.product_url}
                            className="card-img-top"
                            style={{ width: 180, height: 150 ,marginLeft:10,marginTop:10 }}
                            alt="Please Wait"
                      />
                  </td>
                  <td>{item.product_name}</td>
                  <td>{item.price}</td>
                  <td>{item.number_count}</td>
                  <td>{item.offer}</td>
                  <td>{item.product_type}</td>
                  <td>{item.location}</td>
                  <td>
                    <button className='btn btn-danger' onClick={Delete}>Delete</button></td>
                  <td><button className='btn btn-primary'>Update</button></td>
                  </tr>)):""}
                </tbody>
              </table>
        
    </div>
  )
}
