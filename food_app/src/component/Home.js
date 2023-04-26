import React,{useContext,useState} from 'react'
import "../App.css";
import { Link,useNavigate } from "react-router-dom";
import { global } from "../App";
export default function Home() {
    
const {Mobile} =useContext(global);
const [message,setmessage]=useState()
const history=useNavigate();

function submit()
{
    if(Mobile.length==0)
    {
        history('/Login')
        return;
    }
    fetch('http://127.0.0.1:8000/contact_api/',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            mobile:Mobile,
            message:message,
        })
    }) 
    .then(response=>response.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert(error);
    })
}


  return (
    <div >

        
<div className="container text-center mt-5">
  <div className="row">
    <div className="col" style={{marginTop:"180px"}}>
        <p>Our Special Dish amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis</p>
        <h3>22% OFF</h3>
        <p className='page'>Order Today</p>
        {Mobile.length!=10?<Link to="/register" className="btn btn-primary  mx-2">Register Now </Link>:
        <Link to={'/Mybag'}><button className='btn btn-primary'>Order Now</button></Link>}
    </div>
    <div className="col">
    <img  src="https://i.ibb.co/WsvhYqS/home-img-2.png" alt=""/>
    </div>
  </div>
</div>
    
<section className="about" id="about">
<div className="container text-center mt-5">
    <h1 className="heading"> why choose us ? </h1>
  <div className="row">
    <div className="col">
    <img src="https://i.ibb.co/pdss8MY/about-img.png" alt=""/>
    </div>
    <div className="col">
    <div className="content">
        <h3>Best food</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis nihil!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro illo eos cumque deleniti iste alias, eum natus.</p>
        <div className="icons-container">
            <div className='row'>
                <div className='col'>
                    <div className="icons">
                        <i className="fas fa-shipping-fast"></i>
                        <span>free delivery</span>
                    </div>
                </div>
                <div className='col'>
                    <div className="icons">
                    <i className="fas fa-dollar-sign"></i>
                       <span>easy payments</span>
                    </div>
                </div>
                <div className='col'>
                        <div className="icons">
                        <i className="fas fa-headset"></i>
                        <span>24/7 service</span>
                        </div>
                </div>
                <div className='col'>
                    
                </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</div>
</section>

<section className="order" id="order">
    <h1 className="heading"> Free and Fast Contact </h1>
    <div className='boss' >
        <div className="inputBox">
            <div className="input">
                <span>Your Message</span>
                <textarea name="" placeholder="Write Your Message" value={message} onChange={(e)=>{setmessage(e.target.value)}}  cols="20" rows="5"></textarea>
            </div>
        </div>
        <button className='btn btn-primary' onClick={submit}>Message</button>
    </div>
</section>


<section className="footer">

    <div className="box-container">

        <div className="box">
            <h3>Locations</h3>
            <li>India</li>
            <li>Japan</li>
            <li>Russia</li>
            <li>USA</li>
            <li>France</li>
        </div>

        <div className="box">
            <h3>Contact Info</h3>
            <a style={{textDecoration:"none"}}>6295102811</a>
            <a href="www.facebook.com" style={{textDecoration:"none"}}>Facebook</a>
            <a href="www.instagram.com" style={{textDecoration:"none"}}>Instagram</a>
            <a href="www.linkedin.com" style={{textDecoration:"none"}}>Linkedin</a>
        </div>

    </div>

    <div className="credit"> Copyright @ 2023 by <span>Mr Biswajit Ghosh</span> </div>

</section>


    </div>
  )
}
