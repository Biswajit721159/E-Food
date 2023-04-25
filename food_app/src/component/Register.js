import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function () {


const [first_name,setfirst_name]=useState("");
const [last_name,setlast_name]=useState("");
const [address,setaddress]=useState("");
const [state,setstate]=useState("");
const [pin,setpin]=useState("");
const [mobile,setmobile]=useState("");
const [password,setpassword]=useState("")
const [confarmpassword,setconfarmpassowrd]=useState("")
const history=useNavigate();


const [user,setuser]=useState([]);

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

//error section

const [messagefirst_name,setmessagefirst_name]=useState("")
const [error_first_name,seterror_first_name]=useState(false)

const [messagelast_name,setmessagelast_name]=useState("")
const [error_last_name,seterror_last_name]=useState(false)

const [messagemobile,setmessagemobile]=useState("")
const [error_mobile,seterror_mobile]=useState(false)

const [messagepassword,setmessagepassword]=useState("")
const [error_password,seterror_password]=useState(false)

const [messageconpassword,setmessageconpassword]=useState("")
const [error_conpassword,seterror_conpassword]=useState(false)

const [messageaddress,setmessageaddress]=useState("")
const [error_address,seterror_address]=useState(false)

const [messagestate,setmessagestate]=useState("")
const [error_state,seterror_state]=useState(false)

const [messagepin,setmessagepin]=useState("")
const [error_pin,seterror_pin]=useState(false)

function solve_first_name(s)
{
  if(s.length<=2)
  {
    setmessagefirst_name("First_name is too small")
    seterror_first_name(true)
    return false;
  }
  else
  {
    for(let i =0;i<s.length;i++)
    {
      if((s[i]>='a' && s[i]<='z') || (s[i]>='A' && s[i]<='Z'))
      {
        continue;
      }
      else
      {
        setmessagefirst_name("First_name is aplhanumatic")
        seterror_first_name(true)
        return false;
      }
    }
  }
  return true;
}

function solve_last_name(s)
{
  if(s.length<=2)
  {
    setmessagelast_name("Last_name is too small")
    seterror_last_name(true)
    return false;
  }
  else
  {
    for(let i=0;i<s.length;i++)
    {
      if((s[i]>='a' && s[i]<='z') || (s[i]>='A' && s[i]<='Z'))
      {
        continue;
      }
      else
      {
        setmessagelast_name("Last_name is aplhanumatic")
        seterror_last_name(true)
        return false;
      }
    }
  }
  return true;
}

function solve_mobile(s)
{
  if(s.length!==10)
  {
    setmessagemobile("Mobile Number Must be 10 digit")
    seterror_mobile(true)
    return false;
  }
  else 
  {
    for(let i=0;i<s.length;i++)
    {
      if(s[i]>='0' && s[i]<='9')
      {
        continue;
      }
      else
      {
        setmessagemobile("Mobile Number Must be 10 digit")
        seterror_mobile(true)
        return false;
      }
    }
    return true;
  }
}

function finalcheck(s)
{
    for(let i=0;i<user.length;i++)
    {
        if(user[i].mobile==mobile)
        {
          setmessagemobile("Mobile Number is already exit")
          seterror_mobile(true)
        }
    }
    return true;
}

function checkpassword(password)
{
  if(password.length<=5)
  {
    setmessagepassword("Password is too small")
    seterror_password(true)
    return false;
  }
  else
  {
    return true;
  }
}

function checkpasssword_confarmpassword(password,confarmpassword)
{
  if(password!=confarmpassword)
  {
    setmessageconpassword("Confarm password not same as password")
    seterror_conpassword(true)
    return false;
  }
  return true;
}

function solve_address(s)
{
  if(s.length<=3)
  {
    setmessageaddress("Address is too small")
    seterror_address(true)
    return false;
  }
  else if(s.length>=300)
  {
    setmessageaddress("Address is Must be in 30 latter")
    seterror_address(true)
  }
  return true;
}

function solve_pin(s)
{
  if(s.length!==6)
  {
    setmessagepin("Invalid pin Number")
    seterror_pin(true)
    return false;
  }
  else
  {
    for(let i=0;i<s.length;i++)
    {
      if(s[i]>='0' && s[i]<='9')
      {
        continue;
      }
      else
      {
        setmessagepin("Invalid pin Number")
        seterror_pin(true)
        return false;
      }
    }
    return true;
  }
}

function solve_state(s)
{
  if(s=="Select")
  {
    setmessagestate("Please select a State")
    seterror_state(true)
    return false;
  }
  if(s.length==0)
  {
    setmessagestate("Please select a State")
    seterror_state(true)
    return false;
  }
  return true;
}

function subnit()
{
    let a=solve_first_name(first_name);
    let b=solve_last_name(last_name);
    let c=solve_mobile(mobile);
    let d=finalcheck(mobile)
    let e=checkpassword(password)
    let f=checkpasssword_confarmpassword(password,confarmpassword)
    let g=solve_state(state);
    let h=solve_pin(pin);
    let i=solve_address(address);

    if(a==true && b==true && c==true && d==true && e==true && f==true && g==true && h==true && i==true)
    {
        fetch('http://127.0.0.1:8000/user/', 
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                first_name:first_name,
                last_name:last_name,
                mobile:mobile,
                password:password,
                address:address,
                state:state,
                pin:pin,
            })
        })
        .then(response=>response.json())
        .then((result)=>{
          if(result=="Added Successfully")
          {
            localStorage.clear();
            localStorage.setItem('user_token', mobile);
            Function(mobile)
            history('/Login');
            swal(result);
          }
        },
        (error)=>{
          swal(`We are find some Error`);
        })
    }
}


  return (
    <div className="container mt-3">
      <h3>Register Form</h3>
        <div className="col-md-4 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={first_name}
            onChange={(e)=>setfirst_name(e.target.value)}
            required
          />
          {error_first_name==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagefirst_name}</label>:""}
        </div>
        <div className="col-md-4 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={last_name}
            onChange={(e)=>setlast_name(e.target.value)}
            required
          />
          {error_last_name==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagelast_name}</label>:""}
        </div>
        <div className="col-md-4 mt-3 ">
          <input
            type="number"
            className="form-control"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e)=>setmobile(e.target.value)}
            required
          />
         {error_mobile==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagemobile}</label>:""}
        </div>
        <div className="col-md-4 mt-3 ">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            required
          />
          {error_password==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagepassword}</label>:""}
        </div>
        <div className="col-md-4 mt-3 ">
          <input
            type="password"
            className="form-control"
            placeholder="Confarm Password"
            value={confarmpassword}
            onChange={(e)=>setconfarmpassowrd(e.target.value)}
            required
          />
          {error_conpassword==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageconpassword}</label>:""}
        </div>
        <div className="col-md-4 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full Address"
            value={address}
            onChange={(e)=>setaddress(e.target.value)}
            required
          />
          {error_address==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messageaddress}</label>:""}
        </div>
        <div className="col-md-4 mt-3">
          <select className="form-select"  value={state} onChange={(e)=>setstate(e.target.value)}>
            <option selected disabled value="">
            State...
            </option>
            <option>West bengal</option>
            <option>Kolkata</option>
            <option>Delhi</option>
            <option>Bihar</option>
            <option>UP</option>
            <option>Goa</option>
            <option>Odisha</option>
            <option>Jharkhand</option>
            <option>Mumbai</option>
          </select>
          {error_state==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagestate}</label>:""}
        </div>
        <div className="col-md-4 mt-3">
          <input
            type="text"
            className="form-control"
            id="validationCustom05"
            placeholder="Pin"
            value={pin}
            onChange={(e)=>setpin(e.target.value)}
            required
          />
          {error_pin==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{messagepin}</label>:""}
        </div>
        <div className="col-md-3 mt-4">
          <button className="btn btn-primary" type="submit" onClick={subnit}>
            Procide to Go
          </button>
        </div>
     
    </div>
  );
}
