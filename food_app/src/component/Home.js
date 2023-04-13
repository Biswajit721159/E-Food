import React from 'react'
import "../App.css";
// import "../images";
export default function Home() {
  return (
    <div >
        <section class="home" id="home">
            <div class="swiper-container home-slider">
                <div class="swiper-wrapper wrapper">
                    <div class="swiper-slide slide">
                        <div class="content">
                            <span>our special dish</span>
                            <h3>spicy noodles</h3>
                            <p className='page'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque?</p>
                            <a href="/register" class="btn btn-primary  mx-2">Register Now</a>
                            <div class="image"><img src="https://i.ibb.co/WsvhYqS/home-img-2.png" alt=""/>
                        </div>
                        </div>
                    </div>

                </div>


    </div>

</section>
    </div>
  )
}
