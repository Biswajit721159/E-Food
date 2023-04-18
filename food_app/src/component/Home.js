import React from 'react'
import "../App.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div >

        
<div class="container text-center mt-5">
  <div class="row">
    <div class="col" style={{marginTop:"180px"}}>
        <p>Our Special Dish amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis</p>
        <h3>22% OFF</h3>
        <p className='page'>Order Today</p>
        <Link to="/register" class="btn btn-primary  mx-2">Register Now </Link>
    </div>
    <div class="col">
    <img  src="https://i.ibb.co/WsvhYqS/home-img-2.png" alt=""/>
    </div>
  </div>
</div>
    
<section class="about" id="about">
<div class="container text-center mt-5">
    <h1 class="heading"> why choose us ? </h1>
  <div class="row">
    <div class="col">
    <img src="https://i.ibb.co/pdss8MY/about-img.png" alt=""/>
    </div>
    <div class="col">
    <div class="content">
        <h3>Best food in the country</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis nihil!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro illo eos cumque deleniti iste alias, eum natus.</p>
        <div class="icons-container">
            <div class="icons">
                <i class="fas fa-shipping-fast"></i>
                <span>free delivery</span>
            </div>
            <div class="icons">
                <i class="fas fa-dollar-sign"></i>
                <span>easy payments</span>
            </div>
            <div class="icons">
                <i class="fas fa-headset"></i>
                <span>24/7 service</span>
            </div>
        </div>
        </div>
    </div>
  </div>
</div>
</section>

<section class="order" id="order">
    <h1 class="heading"> Free and Fast </h1>
    <form action="">
        <div class="inputBox">
            <div class="input">
                <span>Your Name</span>
                <input type="text" placeholder="enter your name"/>
            </div>
            <div class="input">
                <span>Your Number</span>
                <input type="number" placeholder="enter your number"/>
            </div>
        </div>
        <div class="inputBox">
            <div class="input">
                <span>Your Message</span>
                <textarea name="" placeholder="Write Your Message"  cols="20" rows="5"></textarea>
            </div>
        </div>
        <button className='btn btn-primary'>Message</button>
    </form>
</section>


<section class="footer">

    <div class="box-container">

        <div class="box">
            <h3>Locations</h3>
            <li>India</li>
            <li>Japan</li>
            <li>Russia</li>
            <li>USA</li>
            <li>France</li>
        </div>

        <div class="box">
            <h3>Contact Info</h3>
            <a style={{textDecoration:"none"}}>6295102811</a>
            <a href="www.facebook.com" style={{textDecoration:"none"}}>Facebook</a>
            <a href="www.instagram.com" style={{textDecoration:"none"}}>Instagram</a>
            <a href="www.linkedin.com" style={{textDecoration:"none"}}>Linkedin</a>
        </div>

    </div>

    <div class="credit"> Copyright @ 2023 by <span>Mr Biswajit Ghosh</span> </div>

</section>


    </div>
  )
}
