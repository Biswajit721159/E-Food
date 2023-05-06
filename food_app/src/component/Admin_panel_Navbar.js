import React, { useState,useEffect ,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { global } from "../App";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

const {Admin_data,Setadmin_data} =useContext(global);

const history=useNavigate();


function logout(){
  localStorage.clear();
  Setadmin_data([])
  history('/')
}

return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent mx-6">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
                <li className="nav-item"> 
                   <Link className="nav-link active" aria-current="page" to="product_add" style={{ color:'green' }}><h5>Add Product</h5></Link>
                </li>
            </ul>
         </div>
          <div className="d-flex-col-lg-7"> 
            {/* {Mobile.length!=10?<Link to={'Register'}><button className="btn btn-info mx-2">Register</button></Link>:""}
            {Mobile.length!=10?<Link to={'Login'}><button className="btn btn-info mx-2">Login</button></Link>:""}
            {
              Mobile.length==10?
                 product_count===0?
                    <Link to={'Mybag'}><button className="fas fa-shopping-cart mx-2 mx-4"  style={{ height:33,width:60,backgroundColor:"light" }} type="submit">+0</button></Link>
                   :<Link to={'Mybag'}><button className="fas fa-shopping-cart mx-2 mx-4" style={{ height:33,width:60,backgroundColor:"white" }} type="submit">{"+"+product_count}</button></Link>
              :""
            }
            {
              Mobile.length==10?<Link to="/lovelist" className="fas fa-heart mx-2 my-2" style={{color:"red",textDecoration:"none" ,fontSize:"25px",marginTop:"20px"}}></Link>:""
            }
            {
              Mobile.length==10?<Link to={`User/Dashboard`}><button className="btn btn-light" ><img src="https://i.ibb.co/7NB2cWh/icons8-user-48.png" style={{ height:33,width:33 }} alt="Wait"/></button></Link>:""
            }*/}
            {Admin_data.email.length!=0?<button className="btn btn-info btn-sm mx-2" onClick={logout} >Logout</button>:""} 
          </div>
        </div>
      </nav>
    </>
  );
}