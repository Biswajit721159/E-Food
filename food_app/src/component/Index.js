import React,{useState,useEffect,useContext} from 'react'
import axios from "axios";
import "../App.css";
import { global } from "../App";
export default function Index() {

  const {Mobile,Function,child,update} =useContext(global);

  const [user, setuser] = useState([]);
  const [product,setproduct]=useState([]);
  const [currmybag,setcurrmybag]=useState([]);

  const [price_low_high,setprice_low_high]=useState(false);
  const [price_high_low,setprice_high_low]=useState(false);
  const [briyani,setbriyani]=useState(false);
  const [vage,setvage]=useState(false);
  const [notvage,setnonvage]=useState(false);
  const [name,setname]=useState("");
  const [index,setindex]=useState("first");

  useEffect(()=>{
    loadbag();
  },[]);

  useEffect(()=>{
    loadbag();
  },[Mobile]);

  function loadbag()
  {
    fetch('http://127.0.0.1:8000/product/').then(response=>response.json()).then((product) =>{
      fetch('http://127.0.0.1:8000/mybag/').then(response=>response.json()).then((mybag) =>{
        setcurrmybag(mybag);
        setInTOproduct(product,mybag);
      })
    })
  }
  
  function setInTOproduct(nums,currmybag)
  {
    let ans=[];
    for(let i=0;i<nums.length;i++)
    {
      let obj={
        id:0,
        product_name:"",
        rating:0,
        product_url:"",
        price:0,
        vage:"",
        offer:0,
        current_status:"",
        product_count:0
      }
      obj.id=nums[i].id;
      obj.product_name=nums[i].product_name
      obj.rating=nums[i].rating;
      obj.product_url=nums[i].product_url;
      obj.price=nums[i].price;
      obj.vage=nums[i].vage;
      obj.offer=nums[i].offer;
      obj.current_status=nums[i].current_status;
      if(Mobile.length==10)
      {
        for(let j=0;j<currmybag.length;j++)
        {
          if(Mobile==currmybag[j].mobile && nums[i].id==currmybag[j].product_id)
          {
            obj.product_count=currmybag[j].number_product;
          }
        }
      }
      ans.push(obj);
    }
    setproduct([...ans]);
    setuser([...ans]);
    sort_product_aviliable_not_avilible(ans);
  }

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

                item.product_count==0?
                <button className="btn btn-secondary rounded-pill btn-sm mt-2" disabled >
                 <button className="btn btn-secondary rounded-pill btn-sm mx-3"> - </button>
                     ADD
                  <button className="btn btn-secondary rounded-pill btn-sm mx-3"> + </button>
               </button>
               :
               <button className="btn btn-secondary rounded-pill btn-sm mt-2" disabled >
                 <button className="btn btn-secondary rounded-pill btn-sm mx-3"> - </button>
                     {item.product_count} 
                 <button className="btn btn-secondary rounded-pill btn-sm mx-3"> + </button>
             </button>

               :

               item.product_count==0?
               <button className="btn btn-primary rounded-pill btn-sm mt-2" >
                 <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item.id)}> - </button>
                     ADD
                  <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item.id)}> + </button>
               </button>
               :
               <button className="btn btn-primary rounded-pill btn-sm mt-2">
                 <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item.id)}> - </button>
                     {item.product_count} 
                 <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item.id)}> + </button>
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
