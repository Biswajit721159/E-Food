import React, { useEffect, useState,useContext } from 'react'
import {global} from '../App'
import swal from "sweetalert";
import { Link, json, useNavigate,useParams } from "react-router-dom";


export default function Product_view() {

  const {Mobile,Function,child,update,Location} =useContext(global);  
  const [product,setproduct]=useState([])
  const [review,setreview]=useState([])
  const {id}=useParams()
  
  useEffect(()=>{
    loadproduct();
  },[]);

  function loadproduct()
  {
    fetch('http://127.0.0.1:8000/product/').then(response=>response.json()).then((product)=>{
        fetch('http://127.0.0.1:8000/Reviews/').then(responce=>responce.json()).then((reviews)=>{
            findproduct(product,reviews);
        })
    })
  }

  function findproduct(product,reviews)
  {
    if(Mobile.length!=10 || product==undefined || reviews==undefined)
    {
        return ;
    }
    else
    {
        let arr=[];
        for(let i=0;i<product.length;i++)
        {
            if(product[i].id==id)
            {
                arr.push(product[i]);
                break;
            }
        }
        setproduct([...arr]);
        let nums=[]
        for(let i=0;i<reviews.length;i++)
        {
            if(reviews[i].product_id==id)
            {
                let obj={
                    rating:"",
                    review:"",
                }
                obj.rating=reviews[i].rating;
                obj.review=reviews[i].review;
                nums.push(obj);
            }
        }
        setreview([...nums])
    }
  }
  return (
      <div className='container'>
        {
            product!=undefined && product.length!=0 ?
            <div className='row'>
                <div className='col'>
                    <div className="card-shadow mt-4 mx-5" style={{ width: 200 ,height:310}} >
                        <img
                            src={product[0].product_url}
                            className="card-img-top"
                            style={{ width: 210, height: 160,marginLeft:0,marginTop:10 }}
                            alt="Please Wait"
                        />
                        <div className="card-body">
                            <h6 className="card-title">{product[0].product_name}</h6>
                            <div className="row">
                                <div className="container col">
                                <h5 className="card-text" style={{color:'orange'}}>{product[0].offer}% OFF</h5>
                                </div>
                                <div className="container col">
                                <h5 className="card-text" style={{color:'gray'}}><s>₹{product[0].price}</s></h5> 
                                </div>
                            </div>
                        </div>
                        {product[0].rating == 1 ? (
                            <div className="stars" style={{ color: "green" }}>
                            <i className="fas fa-star"></i>
                            </div>
                        ) : product[0].rating == 2 ? (
                            <div className="stars" style={{ color: "green" }}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            </div>
                        ) : product[0].rating == 3 ? (
                            <div className="stars" style={{ color: "green" }}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            </div>
                        ) : product[0].rating == 4 ? (
                            <div className="stars" style={{ color: "green" }}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            </div>
                        ) : (
                            <div className="stars" style={{ color: "green" }}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            </div>
                        )}
                        {
                         product[0].current_status=='Not Available'?
                            <div className="row">
                                <div className="container col-sm">
                                <h5 className="card-text" style={{color:'lightgray'}}>Closed</h5>
                                </div>
                                <div className="container col-sm">
                                <h5 className="card-text" style={{color:'tomato'}}>₹{(product[0].price-((product[0].price*product[0].offer)/100))}</h5>
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="container col-sm">
                                <h5 className="card-text" style={{color:'green'}}>Available</h5>
                                </div>
                                <div className="container col-sm">
                                <h5 className="card-text" style={{color:'tomato'}}>₹{(product[0].price-((product[0].price*product[0].offer)/100))}</h5>
                                </div>
                            </div>
                            
                        }
                    </div>
               </div>
               <div className='col mt-5'>
                {
                    review!=undefined && review.length!=0?
                        review.map((data,ind)=>(
                            <li>
                                <span>Message : {data.review}</span>
                                <li>
                                    <span style={{color:"green"}}>
                                        Over All Rating : {data.rating} star 
                                    </span>
                                </li>
                                <br></br>
                            </li>
                            
                        ))
                    :<h2  className="col-md-12 text-center" id="notfound">Review is not Found</h2>
                }
                </div>
            </div>
            :<h2 className="col-md-12 text-center" id="notfound">Product Not Found  ! </h2>
        }
      </div>
    
  )
}
