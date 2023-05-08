import React, { useEffect, useState,useContext } from 'react'
import {global} from '../App'
import swal from "sweetalert";
import { Link, json, useNavigate,useParams } from "react-router-dom";


export default function Product_view() {

  const {Mobile,Function,child,update,Location} =useContext(global);  
  const [product,setproduct]=useState([])
  const [review,setreview]=useState([])
  const {id}=useParams()

  let [persentage_5_star,setpersentage_5_star]=useState(0);
  let [persentage_4_star,setpersentage_4_star]=useState(0);
  let [persentage_3_star,setpersentage_3_star]=useState(0);
  let [persentage_2_star,setpersentage_2_star]=useState(0);
  let [persentage_1_star,setpersentage_1_star]=useState(0);
  
  let [number_5_star,setnumber_5_star]=useState(0);
  let [number_4_star,setnumber_4_star]=useState(0);
  let [number_3_star,setnumber_3_star]=useState(0);
  let [number_2_star,setnumber_2_star]=useState(0);
  let [number_1_star,setnumber_1star]=useState(0);
  let [total,settotal]=useState(0);
  let [overall_rating,setoverall_rating]=useState(0);


  useEffect(()=>{
    loadproduct();
  },[Mobile]);

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
        let a=0,b=0,c=0,d=0,e=0;
        for(let i=0;i<nums.length;i++)
        {
            if(nums[i].rating=="1")
            {
                a++;
            }
            else if(nums[i].rating=="2")
            {
                b++;
            }
            else if(nums[i].rating=="3")
            {
                c++;
            }
            else if(nums[i].rating=="4")
            {
                d++;
            }
            else
            {
                e++;
            }
        }

        setnumber_1star(a);
        setnumber_2_star(b);
        setnumber_3_star(c);
        setnumber_4_star(d);
        setnumber_5_star(e);

        let x=a+b+c+d+e;
        settotal(a+b+c+d+e);
        if (x!=0) setpersentage_1_star(((a/x)*100))
        if (x!=0) setpersentage_2_star(((b/x)*100))
        if (x!=0) setpersentage_3_star(((c/x)*100))
        if (x!=0) setpersentage_4_star(((d/x)*100))
        if (x!=0) setpersentage_5_star(((e/x)*100))
        let y=0
        if(a!=0 || b!=0 || c!=0 || d!=0 || e!=0)
        {
            y=((a*1+b*2+c*3+d*4+e*5)/(x)).toFixed(1);
        }
       

        if(y=="NAN") y=0;
        setoverall_rating(y)
        
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
                        {
                         product[0].number_count==0?
                            <div className="row">
                                <div className="container col-sm">
                                <h5 className="card-text" style={{color:'lightgray'}}>**Closed</h5>
                                </div>
                                <div className="container col-sm">
                                <h5 className="card-text" style={{color:'tomato'}}>₹{(product[0].price-((product[0].price*product[0].offer)/100))}</h5>
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="container col-sm">
                                <h6 className="card-text" style={{color:'green'}}>*Available</h6>
                                </div>
                                <div className="container col-sm">
                                <h5 className="card-text" style={{color:'tomato'}}>₹{(product[0].price-((product[0].price*product[0].offer)/100))}</h5>
                                </div>
                            </div>
                            
                        }
                        <h6>Restaurant Name- <strong>{product[0].Restaurant_name}</strong></h6>
                    </div>
                </div>
                <div className='col-6 col-sm-5'>
                    <div className='col'>
                            <p className='mt-4'>{overall_rating} star average based on {total} reviews.</p>
                            <div class="row">
                                <div class="side">
                                    <div>5 star</div>
                                </div>
                                <div class="middle">
                                    <div class="bar-container">
                                    <div class="bar-5" style={{width:`${persentage_5_star}%` , height: "18px",backgroundColor: "#04AA6D"}}></div>
                                    </div>
                                </div>
                                <div class="side right">
                                    <div>{number_5_star}</div>
                                </div>
                                <div class="side">
                                    <div>4 star</div>
                                </div>
                                <div class="middle">
                                    <div class="bar-container">
                                    <div class="bar-4"  style={{width:`${persentage_4_star}%` , height: "18px",backgroundColor: "#2196F3"}}></div>
                                    </div>
                                </div>
                                <div class="side right">
                                    <div>{number_4_star}</div>
                                </div>
                                <div class="side">
                                    <div>3 star</div>
                                </div>
                                <div class="middle">
                                    <div class="bar-container">
                                    <div class="bar-3" style={{width:`${persentage_3_star}%` , height: "18px",backgroundColor: "#00bcd4"}}></div>
                                    </div>
                                </div>
                                <div class="side right">
                                    <div>{number_3_star}</div>
                                </div>
                                <div class="side">
                                    <div>2 star</div>
                                </div>
                                <div class="middle">
                                    <div class="bar-container">
                                    <div class="bar-2" style={{width:`${persentage_2_star}%` , height: "18px",backgroundColor: "#ff9800"}}></div>
                                    </div>
                                </div>
                                <div class="side right">
                                    <div>{number_2_star}</div>
                                </div>
                                <div class="side">
                                    <div>1 star</div>
                                </div>
                                <div class="middle">
                                    <div class="bar-container">
                                    <div class="bar-1" style={{width:`${persentage_1_star}%` , height: "18px",backgroundColor: "#f44336"}}></div>
                                    </div>
                                </div>
                                <div class="side right">
                                    <div>{number_1_star}</div>
                                </div>
                            </div>
                        </div>
                        <div className='col'></div>
                </div>
                <div className='col mt-5 mx-5'>
                {
                    review!=undefined && review.length!=0?
                        review.map((data,ind)=>(
                            <ui>
                                <li>
                                    <span>Message : {data.review}</span>
                                    <li>
                                        <span style={{color:"green"}}>
                                            Over All Rating : {data.rating} star 
                                        </span>
                                    </li>
                                    <br></br>
                                </li>
                                {/* <li>

                                </li> */}
                            </ui>
                        ))
                    :<h2  className="col-md-12 text-center"  style={{marginTop:"100px",color: "#F1C8CE" }}>Review is not Posted</h2>
                }
                </div>
            </div>    
            :<h2 className="col-md-12 text-center" id="notfound">Product Not Found  ! </h2>
        }
      </div>
    
  )
}
