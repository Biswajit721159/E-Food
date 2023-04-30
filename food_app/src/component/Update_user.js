import React,{useContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { global } from '../App';
import swal from "sweetalert";
import axios from "axios";

function Update_user() {

const {Mobile,Function,location}=useContext(global);

const [user,setuser]=useState([])

const [first_name,setfirst_name]=useState("");
const [last_name,setlast_name]=useState("");
const [address,setaddress]=useState("");
const [state,setstate]=useState("");
const [pin,setpin]=useState("");
const [city,setcity]=useState("");

const history=useNavigate();


useEffect(()=>{
   loaduser();
},[Mobile])

function loaduser(){

  fetch('http://127.0.0.1:8000/user/')
  .then(response=>response.json())
  .then((data) =>{
      setuser(data);
      finduser(data)
  })
  
}

function finduser(user)
{
    for(let i=0;i<user.length;i++)
    {
        if(user[i].mobile==Mobile)
        {
            setfirst_name(user[i].first_name)
            setlast_name(user[i].last_name)
            setaddress(user[i].address)
            setpin(user[i].pin)
            setstate(user[i].state)
            setcity(user[i].city);
        }
    }
}  

function solve_name(s)
{
    return true;
//   if(s.lenght<=5)
//   {
//     return false;
//   }
//   else 
//   {
//     for(let i=0;i<s.lenght;i++)
//     {
//       if( (s[i]>='a'  && s[i]<='z') || (s[i]>='A'  && s[i]<='Z') )
//       {
//         continue;
//       }
//       else
//       {
//         return false;
//       }
//     }
//     return true;
//   }
}

function solve_city(s)
{
    return true;
//   if(s.lenght<=3)
//   {
//     return false;
//   }
//   else
//   {
//     for(let i=0;i<s.lenght;i++)
//     {
//       if(s[i]>='a' && s[i]<='z')
//       {
//         continue;
//       }
//       else
//       {
//         return false;
//       }
//     }
//     return true;
//   }
}

function solve_pin(s)
{
    return true;
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

function solve_state(s)
{
    return true;
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

function subnit()
{
    let x=solve_name(first_name);
    let y=solve_state(state);
    let z=solve_pin(pin);
    let b=solve_city(address);
    if(Mobile.lenght===0)
    {
      swal('Please Log in !');
    }
    else if(x===true && y===true && z===true  && b===true)
    {
        fetch('http://127.0.0.1:8000/user/', 
        {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                mobile:Mobile,
                first_name:first_name,
                last_name:last_name,
                address:address,
                state:state,
                pin:pin,
                city:city,
            })
        })
        .then(response=>response.json())
        .then((result)=>{
            alert(result);
            loaduser()
            location(city)
            history('/User/Dashboard');
        },
        (error)=>{
            alert("Failed");
        })
    }
    else if(x===false)
    {
      swal("Sorry Your Name is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(b===false)
    {
      swal("Sorry Your city is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(y===false)
    {
      swal("Sorry Your State is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(z===false)
    {
      swal("Sorry Your Pin is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else
    {
      swal("Some Error in database please wait sometime?", {
        buttons: [, "OK"],
      });
    }
}
 

  return (
    <>
      <div className="container mt-5">
      <h3>Update Form</h3>
        <div class="col-md-4 mt-5">
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            placeholder="First name"
            value={first_name}
            onChange={(e)=>setfirst_name(e.target.value)}
          />
        </div>
        <div class="col-md-4 mt-3">
          <input
            type="text"
            class="form-control"
            id="validationCustom02"
            placeholder="Last Name"
            value={last_name}
            onChange={(e)=>setlast_name(e.target.value)}
          />
        </div>
        <div class="col-md-4 mt-3">
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            placeholder="Full Address"
            value={address}
            onChange={(e)=>setaddress(e.target.value)}
          />
        </div>
        <div class="col-md-4 mt-3">
          <select class="form-select" id="validationCustom04"  value={state} onChange={(e)=>setstate(e.target.value)}>
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
        </div>
        <div class="col-md-4 mt-3">
          <input
            type="text"
            class="form-control"
            id="validationCustom05"
            placeholder="Pin"
            value={pin}
            onChange={(e)=>setpin(e.target.value)}
          />
        </div>
        <div class="col-md-4 mt-3">
          <input
            type="text"
            class="form-control"
            id="validationCustom05"
            placeholder="City"
            value={city}
            onChange={(e)=>setcity(e.target.value)}
          />
        </div>
        <div class="col-12 mt-4">
          <button class="btn btn-primary" type="submit" onClick={subnit}>
            Update to Go
          </button>
        </div>
        </div>
    </>
  );
}

export default Update_user;
