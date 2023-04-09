import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function () {


const [name,setname]=useState("");
const[first_name,setfirst_name]=useState("");
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
        console.log(data);
    })
};

let error=[false,false,false,false,false,false,false];
let message=["","","","","","",""]

function solve_name(s)
{
  if(s.length<=5)
  {
    return false;
  }
  else 
  {
    for(let i=0;i<s.length;i++)
    {
      if( (s[i]>='a'  && s[i]<='z') || (s[i]>='A'  && s[i]<='Z') || (s[i]==' ') )
      {
        continue;
      }
      else
      {
        return false;
      }
    }
    let word="";
    let count=0;
    for(let i=0;i<s.length;i++)
    {
      if(s[i]==' ')
      {
        if(word.length)  
        {
          setfirst_name(word);
          count++;
        }
        word="";
      }
      else
      {
        word+=s[i];
      }
    }
    if(word.length)
    {
      count++;
      setlast_name(word)
    }
    if(count>2)
    {
      return false;
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
           return false;
        }
    }
    return true;
}

function solve_address(s)
{
  if(s.lenght<=3)
  {
    return false;
  }
  else
  {
    for(let i=0;i<s.lenght;i++)
    {
      if(s[i]>='a' && s[i]<='z')
      {
        continue;
      }
      else
      {
        return false;
      }
    }
    return true;
  }
}

function solve_pin(s)
{
  if(s.length!==6)
  {
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
      else{
        return false;
      }
    }
    return true;
  }
}

function solve_mobile(s)
{
  if(s.length!==10)
  {
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
        return false;
      }
    }
    return true;
  }
}

function solve_state(s)
{
  if(s.lenght<=2)
  {
    return false;
  }
  else
  {
    for(let i=0;i<s.lenght;i++)
    {
      if(s[i]>='a' && s[i]<='z')
      {
        continue;
      }
      else
      {
        return false;
      }
    }
    return true;
  } 
}

function checkpassword(password)
{

}

function checkpasssword_confarmpassword(password,confarmpassword)
{

}

function subnit()
{
  // console.log(name)
  // console.log(mobile)
  // console.log(password)
  // console.log(confarmpassword)
  // console.log(address)
  // console.log(pin)
  // console.log(state)
    let a=solve_name(name);
    let b=solve_mobile(mobile);
    let c=finalcheck(mobile)
    let d=checkpassword(password)
    let e=checkpasssword_confarmpassword(password,confarmpassword)
    let f=solve_state(state);
    let g=solve_pin(pin);
    let h=solve_address(address);

    if(a==true && b==true && c==true && d==true && e==true && f==true && g==true && h==true)
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
            alert(result);
        },
        (error)=>{
            alert("Failed");
        })
        history('/Login');
    }
}


  return (
    <div className="container mt-5">
      <h3>Register Form</h3>
        <div className="col-md-4 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="First name and Last Name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            required
          />
          {error[0]==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{message[0]}</label>:""}
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
          {error[1]==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{message[1]}</label>:""}
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
          {error[2]==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{message[2]}</label>:""}
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
          {error[3]==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{message[3]}</label>:""}
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
          {error[4]==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{message[4]}</label>:""}
        </div>
        <div className="col-md-4 mt-3">
          <select className="form-select"  value={state} onChange={(e)=>setstate(e.target.value)}>
            <option selected disabled value="">
            State...
            </option>
            <option>West bengal</option>
            <option>Delhi</option>
            <option>Bihar</option>
            <option>UP</option>
            <option>Goa</option>
            <option>Odisha</option>
            <option>Jharkhand</option>
            <option>Mumbai</option>
          </select>
          {error[5]==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{message[5]}</label>:""}
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
          {error[6]==true?<label for="exampleFormControlInput1" style={{color:"red"}} className="form-label mx-5">{message[6]}</label>:""}
        </div>
        <div className="col-md-3 mt-4">
          <button className="btn btn-primary" type="submit" onClick={subnit}>
            Procide to Go
          </button>
        </div>
     
    </div>
  );
}
