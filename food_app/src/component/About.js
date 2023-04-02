import React from 'react'
import "../App.css";

export default function About() {
  return (
    <div className='container mt-5'>
        <section class="about" id="about">
            <div class="row">
                <div class="content">
                    <p>Best food in the country</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, sequi corrupti corporis quaerat voluptatem ipsam neque labore modi autem, saepe numquam quod reprehenderit rem? Tempora aut soluta odio corporis nihil!</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nemo. Sit porro illo eos cumque deleniti iste alias, eum natus.</p>
                    <div class="icons-container">
                        <div class="icons">
                            <i class="fas fa-shipping-fast"></i>
                            <span>Free delivery</span>
                        </div>
                        <div class="icons">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Easy Payments</span>
                        </div>
                        <div class="icons">
                            <i class="fas fa-headset"></i>
                            <span>24/7 Service</span>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    </div>
  )
}
