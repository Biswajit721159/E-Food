import React from 'react'
import '../App.css';

export default function Adminlogin() {
  return (
   
    <div className="box">
        <div className="container">
            <div className="top">
                <span>Admin Login Panel</span>
            </div>
            <form action="" method="POST">
                <div className="input-field">
                    <input type="text" className="input" name="username" placeholder="Username" required/>
                    <i className='bx bx-user' ></i>
                </div>
                <div className="input-field">
                    <input type="Password" className="input" name="password" placeholder="Password" required/>
                    <i className='bx bx-lock-alt'></i>
                </div>
                <div className="input-field">
                    <input type="submit" className="submit" value="Login"/>
                </div>
            </form>  
        </div>
    </div>
  )
}
