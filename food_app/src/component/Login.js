import React, { useState ,useEffect,useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { global } from "../App";

export default function () {

const {Mobile,Function,child,update} =useContext(global);

const [mobile,setmobile]=useState("");
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
  fetch('http://127.0.0.1:8000/user/')
    .then(response=>response.json())
    .then((data) =>{
        setuser(data);
    })
};


function subnit()
{   
  if(password!=confarmpassword)
  {
    seterror(true)
    seterror_mess("Password and confarmpassword is not match")
  }
  else
  {
    let count=0;
    for(let i=0;i<user.length;i++)
    {
      if(user[i].mobile==mobile && user[i].password==password)
      {
        count++;
        break;
      }
    }
    if(count)
    {
      Function(mobile)
      history('/');
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
            type="number"
            class="form-control"
            id="validationCustom01"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e)=>setmobile(e.target.value)}
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
        <div class="col-md-3 mt-4">
          <button class="btn btn-primary" type="submit" onClick={subnit}>
            Procide to Go
          </button>
        </div>
        {error==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label  mt-1">{error_mess}</label>:""}
    </div>
  );
}
