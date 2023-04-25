import React, { useState,useEffect ,useContext } from "react";
import { Link } from "react-router-dom";
import { global } from "../App";
import { useNavigate } from "react-router-dom";


export default function Navbar() {


const {Username,Function} =useContext(global);
const history=useNavigate();

// console.log(Username)

useEffect(()=>{
    if (localStorage.getItem('user_name') !== null) {
        Function(localStorage.getItem('user_name'))
      }
},[])

function logout()
{
  localStorage.clear();
  Function("");
  history('/')
}

return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent mx-6">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"> 
                   <Link className="nav-link active" aria-current="page" to="/Dashboard" style={{ color:'green' }}><h4>x-Food</h4></Link>
                </li>
            </ul>
         </div>
          <div className="d-flex-col-lg-7"> 
            {Username.length!=0?<button className="btn btn-info btn-sm mx-2" onClick={logout} >Logout</button>:""}
          </div>
        </div>
      </nav>
    </>
  );
}