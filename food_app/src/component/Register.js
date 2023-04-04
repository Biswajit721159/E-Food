import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function () {


const [name,setname]=useState("");
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

const loaduser = async () => {
let result = await axios.get("http://localhost/main/New%20folder/user.php");
setuser(result.data.result);
};


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


let [input, setinput] = useState({
    name: "",
    city: "",
    state:"",
    pin:"",
    mobile:"",
    password:"",
});


function solve_name(s)
{
  if(s.lenght<=5)
  {
    return false;
  }
  else 
  {
    for(let i=0;i<s.lenght;i++)
    {
      if( (s[i]>='a'  && s[i]<='z') || (s[i]>='A'  && s[i]<='Z') )
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

function solve_city(s)
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

function subnit()
{
  // console.log(name)
  // console.log(mobile)
  // console.log(password)
  // console.log(confarmpassword)
  // console.log(address)
  // console.log(pin)
  // console.log(state)
    // let x=solve_name(name);
    // let y=solve_state(state);
    // let z=solve_pin(pin);
    // let a=solve_mobile(mobile);
    // let b=solve_city(address);
    // if(x===true && y===true && z===true && a===true && b===true)
    // {
    //   if(finalcheck(mobile)==true){
        input.name = name;
        input.state = state;
        input.address = address;
        input.pin = pin;
        input.mobile=mobile;
        input.password=password;
        console.log(input)
        const ans=axios.post("http://127.0.0.1:8000/user/?format=json", input); 
        console.log(ans)
        history('/Login');

      //}
    //   else{
    //     swal("This Mobile Number is already exit ?", {
    //       buttons: [, "OK"], 
    //     });
    //   }
    // }
    // else if(x===false)
    // {
    //   swal("Sorry Your Name is incorrect ?", {
    //     buttons: [, "OK"],
    //   });
    // }
    // else if(a===false)
    // {
    //   swal("Sorry Your Mobile Number Must be 10 digit ?", {
    //     buttons: [, "OK"],
    //   });
    // }
    // else if(b===false)
    // {
    //   swal("Sorry Your city is incorrect ?", {
    //     buttons: [, "OK"],
    //   });
    // }
    // else if(y===false)
    // {
    //   swal("Sorry Your State is incorrect ?", {
    //     buttons: [, "OK"],
    //   });
    // }
    // else if(z===false)
    // {
    //   swal("Sorry Your Pin is incorrect ?", {
    //     buttons: [, "OK"],
    //   });
    // }
    // else
    // {
    //   swal("Some Error in database please wait sometime?", {
    //     buttons: [, "OK"],
    //   });
    // }
}


  return (
    <div className="container mt-5">
      <h3>Register Form</h3>
        <div class="col-md-4 mt-5">
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            placeholder="First name and Last Name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            required
          />
        </div>
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
        <div class="col-md-4 mt-3">
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            placeholder="Full Address"
            value={address}
            onChange={(e)=>setaddress(e.target.value)}
            required
          />
        </div>
        <div class="col-md-4 mt-3">
          <select class="form-select" id="validationCustom04"  value={state} onChange={(e)=>setstate(e.target.value)}>
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
        </div>
        <div class="col-md-4 mt-3">
          <input
            type="text"
            class="form-control"
            id="validationCustom05"
            placeholder="Pin"
            value={pin}
            onChange={(e)=>setpin(e.target.value)}
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
