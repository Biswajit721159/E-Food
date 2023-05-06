import React, { useState ,useEffect,useContext } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { global } from "../App";

export default function () {

const {Mobile,Function,child,update,location,Setadmin_data} =useContext(global);

const [email,setemail]=useState("");
const [password,setpassword]=useState("")
const [confarmpassword,setconfarmpassowrd]=useState("")
const history=useNavigate();
const [user,setuser]=useState([]);

const [error,seterror]=useState(false);
const [error_mess,seterror_mess]=useState("");

useEffect(()=>{
  loaduser();
},[])

function loaduser()
{
  fetch('http://127.0.0.1:8000/Restaurant_user/')
    .then(response=>response.json())
    .then((data) =>{
        setuser(data);
    })
};

function login()
{   
  if(password!=confarmpassword)
  {
    seterror(true)
    seterror_mess("Password and confarmpassword is not match")
  }
  else
  {
    let count=0;
    let data={
      first_name:"",
      last_name:"",
      password:"",
      email:"",
      address:"",
      pin:"",
      Restaurant_name:"",
      city:"",
      state:"",
    };
    for(let i=0;i<user.length;i++)
    {
      if(user[i].email==email && user[i].password==password)
      {
        count++;
        data.first_name=user[i].first_name
        data.last_name=user[i].last_name
        data.password=user[i].password
        data.email=user[i].email
        data.address=user[i].address
        data.pin=user[i].pin
        data.Restaurant_name=user[i].Restaurant_name
        data.city=user[i].city
        data.state=user[i].state
        break;
      }
    }
    if(count)
    {
      localStorage.clear();
      console.log(data)
      localStorage.setItem('Restaurant_user_token', JSON.stringify(data));
      Setadmin_data(data)
      history('/Admin_front_page');
    }
    else
    {
      seterror(true)
      seterror_mess("Invalid user")
    }
  }
}


  return (
    <div className="container mt-5">
      <h3>Login Form</h3>
        <div class="col-md-4 mt-3 ">
          <input
            type="email"
            class="form-control"
            id="validationCustom01"
            placeholder="Email id"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            required
          />
        </div>
        <div class="col-md-4 mt-3 ">
          <input
            type="password"
            class="form-control"
            id="validationCustom01"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            required
          />
        </div>
        <div class="col-md-4 mt-3 ">
          <input
            type="password"
            class="form-control"
            id="validationCustom01"
            placeholder="Confarm Password"
            value={confarmpassword}
            onChange={(e)=>setconfarmpassowrd(e.target.value)}
            required
          />
        </div>
        <div class="col-md-3 mt-3">
          <button class="btn btn-primary" type="submit" onClick={login}>
            Procide to Go
          </button>
        </div>
        <div className="row mt-3">
            <div className="col">
                <Link to={'/Admin_Register'} className="mt-5" style={{textDecoration:"none"}}>Register</Link>
            </div>
            <div className="col">
                <Link to={'/forgot_password'} className="mt-5" style={{textDecoration:"none"}}>Forgot Password</Link>
            </div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
        </div>
        {error==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label  mt-1">{error_mess}</label>:""}
    </div>
  );
}
