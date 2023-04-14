import React, { useState,useEffect ,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { global } from "../App";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

  
//data from useContext
const {Mobile,Function,child,update,location} =useContext(global);

//console.log(update);

//product
const [userdata,setuserdata]=useState([]);//for user
const [product_count, setproduct_count] = useState(0);// only that user product
const history=useNavigate();
// const [login,setlogin]=useState(false);


const [name,setname]=useState("");

useEffect(() => {
  loadproduct();   
  set_product();   
  workonproductcount();
},[Mobile]);

useEffect(()=>{
  loadproduct();    
  set_product();   
  workonproductcount();
},[update]);


//product
const loadproduct = async () => {
  // await axios.get("http://localhost/main/New%20folder/my_bag.php").then((result)=>{
  //   axios.get("http://localhost/main/New%20folder/user.php").then((res)=>{
  //       set_product(result.data.result);
  //       setuserdata(res.data.result); 
  //   })
  // })
  
    fetch('http://127.0.0.1:8000/mybag/').then(response=>response.json()).then((mybag) =>{
      // setcurrmybag(mybag);
      set_product(mybag)
    })
};

// user 

function stringToNumber(data)
{
  if (typeof(data)=="number") return data;
  let ans=0;
  for(let i=0;i<data.length;i++)
  {
    ans=ans*10+(data[i]-'0');
  }
  return ans;
}

function workonproductcount(){
//   if(Mobile.length!=10)
//   {
//     setproduct_count(0);
//   }
//   if(update=="incre_first" || update=="incre_second")
//   {
//     setproduct_count(product_count+1);
//   }
//   else if(update=="decre_first" || update=="decre_second")
//   {
//     setproduct_count(product_count-1);
//   }
}

function set_product(allproduct)
{
  if(allproduct===undefined) 
  {
    setproduct_count(0);
  }
  else
  {
    let  data=0;
    for(let i=0;i<allproduct.length;i++)
    {
      if(allproduct[i].mobile==Mobile)
      {
        data+=(stringToNumber(allproduct[i].number_product));
      }
    }
    setproduct_count(data);
  }
}

function logout(){
  Function("");
  history('/Login')
  location("");
}

return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent mx-6">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"> 
                   <Link className="nav-link active" aria-current="page" to="/index" style={{ color:'green' }}><h4>x-Food</h4></Link>
                </li>
                {/* <li className="nav-item mx-3 mt-1">
                   <Link className="nav-link active" aria-current="page" to="/Technical_Support" style={{ color:'green' }} ><h6>Support</h6></Link>
                </li>
                <li className="nav-item mx-2 mt-1">
                   <Link className="nav-link active" aria-current="page" to="/About" style={{ color:'green' }} ><h6>About</h6></Link>
                </li> */}
            </ul>
         </div>
          <div className="d-flex-col-lg-7"> 
            {Mobile.length!=10?<Link to={'Register'}> <button className="btn btn-info mx-2">Sign Up</button></Link>:""}
            {Mobile.length!=10?<Link to={'Login'}> <button className="btn btn-info mx-2">Login</button></Link>:""}
            {
              Mobile.length==10?
                 product_count===0?
                    <Link to={'Mybag'}><button className="fas fa-shopping-cart mx-2 mx-5"  style={{ height:33,width:55 }} type="submit">+0</button></Link>
                   :<Link to={'Mybag'}><button className="fas fa-shopping-cart mx-2  mx-4" style={{ height:33,width:55 }} type="submit">{"+"+product_count}</button></Link>
              :""
            }
            {
              Mobile.length==10?<Link to="#" className="fas fa-heart mx-2 my-2" style={{color:"red",textDecoration:"none" ,fontSize:"25px",marginTop:"20px"}}></Link>:""
            }
            {
              Mobile.length==10?<Link to={`User/Dashboard`}><button className="btn btn-light" ><img src="https://i.ibb.co/7NB2cWh/icons8-user-48.png" style={{ height:33,width:33 }} alt="Wait"/></button></Link>:""
            }
            {Mobile.length==10?<button className="btn btn-info mx-2" onClick={logout} >Logout</button>:""}
          </div>
        </div>
      </nav>
    </>
  );
}