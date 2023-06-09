import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { global } from '../App';
import swal from 'sweetalert';
import loader from "../other/loader.gif"

export default function MyOrder() {

 const {Mobile,Function}=useContext(global); 

 const [product,setproduct]=useState([]);
 const [myproduct,setmyproduct]=useState([]);
 const [reviews,setreviews]=useState([]);
 const [load,setload]=useState(true);
 const [loading,setloading]=useState(true)

  useEffect(() => {
    loadproduct();
  }, [Mobile]);

  function loadproduct(){
      fetch('http://127.0.0.1:8000/order/').then(response=>response.json()).then((order) =>{
        fetch('http://127.0.0.1:8000/product/').then(response=>response.json()).then((product) =>{
          fetch('http://127.0.0.1:8000/Reviews/').then(response=>response.json()).then((reviews) =>{
            set_beg(order,product,reviews);
            setreviews(reviews);
          })
        })
      })
  };

  function set_beg(order,product,reviews){
    if(order==undefined || product==undefined || reviews==undefined ) return ;

    let arr=[];
    for(let i=0;i<order.length;i++)
    {
      for(let j=0;j<product.length;j++)
      {
        if(order[i].mobile==Mobile && order[i].product_id==product[j].id)
        {
          let obj={
            id:product[j].id,
            order_id:order[i].order_id,
            product_name:product[j].product_name,
            product_url:product[j].product_url, 
            price:order[i].price,
            product_count:order[i].number_product,
            date:order[i].date,
            isreviews:false,
            order_status:order[i].order_status,
          }
          arr.push(obj);
        }
      }
    }

    for(let i=0;i<arr.length;i++)
    {
      for(let j=0;j<reviews.length;j++)
      {
        if(reviews[j].mobile==Mobile && reviews[j].order_id==arr[i].order_id)
        {
          arr[i].isreviews=true
        }
      }
    }
    
    let reversed = [...arr].reverse();
    setproduct([...reversed]);
    if(reversed.length<=10)
    {
      setload(false)
      setmyproduct([...reversed]);
    }
    else
    {
      let newarr=[];
      for(let i=0;i<10;i++)
      {
        newarr.push(reversed[i]);
      }
      setmyproduct([...newarr]);
    }
    setloading(false)
  }

  function load_more()
  {
    setload(false)
    setmyproduct([...product])
  }


  return (
    <> 
    {
      loading?<div className='container'><img src={loader}  style={{marginLeft:"340px",marginTop:"100px"}}/></div>:
          Mobile.length==10?
          <div className='container mt-5'>
              <h3>Your Order {Mobile}</h3>
              <div className="col mt-5">
              {(myproduct.length!==0)?
                myproduct.map((item,ind)=>(
                  <table className="table shadow-lg p-0 mb-2 bg-white rounded" key={ind}>
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Date</th>
                          <th scope='col'>No. Product</th>
                          <th scope="col">Order Status</th>
                          <th scope="col">Feedback</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
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
                          <td>
                          {
                            item.order_status?<td><button className="btn btn-primary" disabled>Delivered</button></td>: 
                            <td><button className="btn btn-primary" disabled>Pending</button></td>
                          }
                          </td>
                          {
                            item.isreviews==false?  
                            <td>
                              <Link to={`/Reviews/order_id/${item.order_id}/product_id/${item.id}`}><button className='btn btn-primary mx-0' >Give Feedback</button></Link>
                            </td>
                            :<button className='btn btn-danger mt-2 mx-3' disabled> Already  Given</button>
                          }
                        </tr>
                      </tbody>
                    </table>
                ))
                : <h2 className="col-md-12 text-center" id="notfound">Product Not Found  ! </h2>}
                <div className='container my-5'>
                  {load==true?<button className='btn btn-primary mx' onClick={load_more}>Load More</button>:""}
                </div>
            </div>
          </div>
          :<h2 className="col-md-12 text-center" id="notfound">Product Not Found  ! </h2>
        }
    </>
  )
}
