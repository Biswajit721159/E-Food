import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function () {

const [mobile,setmobile]=useState("");
const [password,setpassword]=useState("")
const [confarmpassword,setconfarmpassowrd]=useState("")
const history=useNavigate();


const [user,setuser]=useState([]);
  useEffect(()=>{
    loaduser();
  },[])

const loaduser = async () => {
// let result = await axios.get("http://localhost/main/New%20folder/user.php");
// setuser(result.data.result);
};



function subnit()
{
  
  // console.log(mobile)
  // console.log(password)
  // console.log(confarmpassword)
    
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
     
    </div>
  );
}
