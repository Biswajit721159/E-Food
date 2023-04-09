import React,{useState,useEffect} from 'react'
import axios from "axios";
import "../App.css";
export default function Index() {

  const [product,setproduct]=useState([]);

  const [price_low_high,setprice_low_high]=useState(false);
  const [price_high_low,setprice_high_low]=useState(false);
  const [briyani,setbriyani]=useState(false);
  const [vage,setvage]=useState(false);
  const [notvage,setnonvage]=useState(false);
  const [name,setname]=useState("");


  let loadbag = async ()=>{
      axios.get("http://127.0.0.1:8000/product/").then((res)=>{
        console.log(res)
          setproduct(res.data)
          sort_product_aviliable_not_avilible(res.data)
      })
  }

  const [index,setindex]=useState("first");

  useEffect(()=>{
    loadbag();
  },[]);
  
  function sort_product_aviliable_not_avilible(product)
  {
    if(product===undefined)
    {
      return ;
    }
    else
    {
      let arr=[];
      for(let i=0;i<product.length;i++)
      {
        if(product[i].current_status=='Available')
        {
          arr.push(product[i]);
        }
      }
      for(let i=0;i<product.length;i++)
      {
        if(product[i].current_status!='Available')
        {
          arr.push(product[i]);
        }
      }
      setproduct([...arr]);
    }
  }

  function ADD_TO_DECREMENT(id)
  {

  }

  function ADD_TO_INCREMENT(id)
  {

  }


  return (
    <>
    
<div className="container" >
<div className="container" >
        
<div className="row">
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={price_low_high} onChange={(e)=>setprice_low_high(e.target.checked)}  id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault" >
                  Price Low to High
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={price_high_low} onChange={(e)=>setprice_high_low(e.target.checked)} value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Price High to Low
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={briyani} onChange={(e)=>setbriyani(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Briyani
                </label>
              </div>
        </div>
        
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={vage} onChange={(e)=>setvage(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Vage Food
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={notvage} onChange={(e)=>setnonvage(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Non Vage Food
                </label>
              </div>
        </div>
        <div className="container col-sm mt-2">
          <div className="container">
          <input
                type="text"
                className="form-control"
                value={name} onChange={(e)=>setname(e.target.value)} autoComplete='off'  placeholder="Search Product"
              />
          </div>
        </div>
</div>
    </div >
      <div className="row">
        {product !== undefined && product.length!==0
          ? product.map((item, ind) => (
            <div className="card-shadow mt-4 mx-4 my-4" style={{ width: 200 }} key={ind}>
            <img
              src={item.product_url}
              className="card-img-top"
              style={{ width: 200, height: 150,marginLeft:0,marginTop:10 }}
              alt="Please Wait"
            />
            <div className="card-body">
              <h6 className="card-title">{item.product_name}</h6>
              <div className="row">
                <div className="container col">
                   <h5 className="card-text" style={{color:'orange'}}>{item.offer}% OFF</h5>
                </div>
                <div className="container col">
                   <h5 className="card-text" style={{color:'gray'}}><s>₹{item.price}</s></h5> 
                </div>
              </div>
              {item.rating == 1 ? (
                <div className="stars" style={{ color: "green" }}>
                  <i className="fas fa-star"></i>
                </div>
              ) : item.rating == 2 ? (
                <div className="stars" style={{ color: "green" }}>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              ) : item.rating == 3 ? (
                <div className="stars" style={{ color: "green" }}>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              ) : item.rating == 4 ? (
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
                 item.current_status=='Not Available'?
                 <div className="row">
                    <div className="container col-sm">
                    <h5 className="card-text" style={{color:'lightgray'}}>Closed</h5>
                    </div>
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100))}</h5>
                    </div>
                </div>
                 :
                 <div className="row">
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'green'}}>Available</h5>
                    </div>
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100))}</h5>
                    </div>
                </div>
                 
              }
              {
                 item.current_status=='Not Available'?
                <button className="btn btn-secondary rounded-pill btn mt-2 mx-4" disabled >
                      <h className='add'>ADD TO CART</h>
                </button>
                :
                <button className="btn btn-primary rounded-pill btn mt-2">
                 <h className='add'> ADD TO CART</h>
                </button>
              }
            </div>
          </div>
            ))
          : <h2 className="col-md-12 text-center" id="notfound">Product Not Found  ! </h2>}
      </div>
    </div>
    </>
  )
}
