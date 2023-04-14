import React from 'react'
import "../App.css";
import { Link } from "react-router-dom";
// import "../images";
export default function Home() {
  return (
    <div >
        <section class="home" id="home">
            <div class="swiper-container home-slider">
                <div class="swiper-wrapper wrapper">
                    <div class="swiper-slide slide">
                        <div class="content">
                            <span>Our Special Dish</span>
                            <h3>22% OFF</h3>
                            <p className='page'>Order Today</p>
                            <Link to="/register" class="btn btn-primary  mx-2">Register Now </Link>
                            <img className='image' src="https://i.ibb.co/WsvhYqS/home-img-2.png" alt=""/>
                           
                        </div>
                    </div>

                </div>
    </div>

</section>


<section class="about" id="about">

    <h3 class="sub-heading"> About us </h3>
    <h1 class="heading"> why choose us? </h1>

    <div class="row">

        <div class="image">
            <img src="https://i.ibb.co/pdss8MY/about-img.png" alt=""/>
        </div>

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
            <a href="#" class="btn btn-primary">learn more</a>
        </div>

    </div>

</section>



<section class="order" id="order">

    <h3 class="sub-heading"> Order now </h3>
    <h1 class="heading"> Free and Fast </h1>

    <form action="">

        <div class="inputBox">
            <div class="input">
                <span>your name</span>
                <input type="text" placeholder="enter your name"/>
            </div>
            <div class="input">
                <span>your number</span>
                <input type="number" placeholder="enter your number"/>
            </div>
        </div>
        <div class="inputBox">
            <div class="input">
                <span>your order</span>
                <input type="text" placeholder="enter food name"/>
            </div>
            <div class="input">
                <span>additional food</span>
                <input type="test" placeholder="extra with food"/>
            </div>
        </div>
        <div class="inputBox">
            <div class="input">
                <span>how musch</span>
                <input type="number" placeholder="how many orders"/>
            </div>
            <div class="input">
                <span>date and time</span>
                <input type="datetime-local"/>
            </div>
        </div>
        <div class="inputBox">
            <div class="input">
                <span>your address</span>
                <textarea name="" placeholder="enter your address" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="input">
                <span>your message</span>
                <textarea name="" placeholder="enter your message" id="" cols="30" rows="10"></textarea>
            </div>
        </div>

        <input type="submit" value="order now" class="btn btn-primary"/>

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
            <a href="#" style={{textDecoration:"none"}}>Facebook</a>
            <a href="#" style={{textDecoration:"none"}}>Instagram</a>
            <a href="#" style={{textDecoration:"none"}}>Linkedin</a>
        </div>

    </div>

    <div class="credit"> Copyright @ 2023 by <span>Mr Biswajit Ghosh</span> </div>

</section>


    </div>
  )
}
