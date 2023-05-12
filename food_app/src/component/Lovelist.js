import React,{useState,useEffect,useContext} from 'react'
import { global } from "../App";
import "../App.css";
import { Link } from 'react-router-dom';
import loader from "../other/loader.gif"


export default function Lovelist() {

  const {Mobile,Function,child,update,Location} =useContext(global);
  const [wistlist,setwishlist]=useState([]);
  const [loading,setloading]=useState(true)

  useEffect(()=>{
    loadwistlist();
  },[Mobile])

  function loadwistlist()
  {
    fetch('http://127.0.0.1:8000/iswishlist/').then(response=>response.json()).then((res)=>{
      fetch('http://127.0.0.1:8000/product/').then(response=>response.json()).then((result)=>{
         findproduct(res,result);
      })
    })
  }

  function findproduct(wishlist,product)
  {
    setloading(true)
    if(wishlist==undefined || product==undefined) return;
    let arr=[]
    for(let i=0;i<wishlist.length;i++)
    {
      if(wishlist[i].mobile==Mobile)
      {
        for(let j=0;j<product.length;j++)
        {
          if(wishlist[i].product_id==product[j].id)
          {
            let obj={
                id:0,
                product_name:"",
                product_url:"",
                price:0,
                vage:"",
                offer:0,
                current_status:"",
                product_count:0,
                islove:false, 
              }
              obj.id=product[j].id;
              obj.product_name=product[j].product_name
              obj.product_url=product[j].product_url;
              obj.price=product[j].price;
              obj.vage=product[j].vage;
              obj.offer=product[j].offer;
              obj.current_status=product[j].current_status;
              arr.push(obj);
              break;
          }
        }
      }
    }
    setwishlist([...arr])
    setloading(false)
  }

  function check_alreadylove_list(id)
  {
    if(wistlist==undefined) return false;
    else
    {
      for(let i=0;i<wistlist.length;i++)
      {
        if(wistlist[i].id==id)
        {
          return true;
        }
      }
      return false;
    }
  }

  function love(id)
  {
    if(check_alreadylove_list(id)==true)
    {
      fetch('http://127.0.0.1:8000/iswishlist/',
      {
        method:'DELETE',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          mobile:Mobile,
          product_id:id,
        })
      }).then(response=>response.json())
      .then((result)=>{
        alert(result)
        loadwistlist()
      },
      (error)=>{
        alert("Failed")
      })
    }
    else
    {
        fetch('http://127.0.0.1:8000/iswishlist/', 
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              mobile:Mobile,
              product_id:id,
            })
        })
        .then(response=>response.json())
        .then((result)=>{
            alert(result);
            loadwistlist()
        },
        (error)=>{
            alert("Failed");
        })
    }
  }

  return (
    <div className="containermain" >
      <div className="row mt-5 mx-5">
      {wistlist !== undefined && wistlist.length!==0
        ? wistlist.map((item, ind) => (
          <div className="card-shadow mt-4 mx-5 my-4" style={{ width: 200 }} key={ind}>
          <button  className="fas fa-heart"  onClick={()=>love(item.id)}  style={{backgroundColor:"#F7173B",borderRadius:"18px"}}></button>
          <Link to={`/product_id/${item.id}`}>
            <img
              src={item.product_url}
              className="card-img-top"
              style={{ width: 200, height: 150,marginLeft:0,marginTop:10 }}
              alt="Please Wait"
            />
          </Link>
          <div className="card-body">
            <h6 className="card-title">{item.product_name}</h6>
            <div className="row">
              <div className="container col">
                <h5 className="card-text" style={{color:'orange'}}>{item.offer}% OFF</h5>
              </div>
              <div className="container col">
                <h5 className="card-text" style={{color:'gray'}}><s>₹{item.price}</s></h5> 
              </div>
              <div className="container row-sm">
                  <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100))}</h5>
              </div>
            </div>
          </div>
        </div>
          ))
        : loading==true?<div className='container'><img src={loader}  style={{marginLeft:"340px",marginTop:"100px"}}/></div>
        :<h2 className="col-md-12 text-center" id="notfound">Product Not Found  ! </h2>}
     </div>
  </div>
  )
}
