import React,{useEffect, useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css';
import { global } from "../App";
export default function Adminlogin() {


const {Username,Function} =useContext(global);
const history=useNavigate();
const [username,setusername]=useState("");
const [password,setpassword]=useState("");
const [user,setuser]=useState([])
const [mess,setmess]=useState("")
const [check,setcheck]=useState(false)

useEffect(()=>{
    loaduser();
},[])


function loaduser()
{
    fetch('http://127.0.0.1:8000/admin_user/').then(response=>response.json()).then((res)=>{
        setuser(res)
    })
}

function login()
{
    let count=0;
    for(let i=0;i<user.length;i++)
    {
        if(user[i].username==username && user[i].password==password)
        {
            count++;
            break;
        }
    }
    if(count)
    {
        localStorage.clear();
        localStorage.setItem('user_name', username);
        Function(username)
        history('/Dashboard');
    }
    else
    {
        setmess("Invalid user");
        setcheck(true);
    }
}

  return (
   
    <div className="box">
        <div className="container">
            <div className="top">
                <span>Admin Login Panel</span>
                </div>
                    <div className="input-field">
                        <input type="text" className="input" value={username} onChange={(e)=>{setusername(e.target.value)}} placeholder="Username" required/>
                        <i className='bx bx-user' ></i>
                    </div>
                    <div className="input-field">
                        <input type="Password" className="input"  value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder="Password" required/>
                        <i className='bx bx-lock-alt'></i>
                    </div>
                    <div className="input-field">
                        <input type="submit" className="submit" onClick={login} />
                </div> 
                {
                    check==true?<h6 style={{color:"red" ,marginLeft:"35%",marginTop:"10%"}}>{mess}</h6>:""
                }
        </div>
    </div>
  )
}
