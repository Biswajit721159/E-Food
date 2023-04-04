import React, { useState,useEffect ,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";


export default function Navbar() {

  
//data from useContext


//console.log(update);

//product
const [userdata,setuserdata]=useState([]);//for user
const [product_count, setproduct_count] = useState(0);// only that user product
const [login,setlogin]=useState(false);


const [name,setname]=useState("");

useEffect(() => {
  loadproduct();   
  set_product();   
  workonproductcount();
},[]);

useEffect(()=>{
  loadproduct();    
  set_product();   
  workonproductcount();
},[]);


//product
const loadproduct = async () => {
  await axios.get("http://localhost/main/New%20folder/my_bag.php").then((result)=>{
    axios.get("http://localhost/main/New%20folder/user.php").then((res)=>{
        set_product(result.data.result);
        setuserdata(res.data.result); 
    })
  })
};

// user 

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
//   if(allproduct===undefined) 
//   {
//     setproduct_count(0);
//   }
//   else
//   {
//     let  data=0;
//     for(let i=0;i<allproduct.length;i++)
//     {
//       if(allproduct[i].mobile==Mobile)
//       {
//         data+=(stringToNumber(allproduct[i].number_product));
//       }
//     }
//     setproduct_count(data);
//   }
}

function stringToNumber(data)
{
  let ans=0;
  for(let i=0;i<data.length;i++)
  {
    ans=ans*10+(data[i]-'0');
  }
  return ans;
}

function check_valid(mobile)
{
  if(mobile.length==0)
  {
    return "zero";
  }
  for(let i=0;i<mobile.length;i++)
  {
      if(mobile[i]>='0' && mobile[i]<='9')
      {
      continue;
      }
      else
      {
      return  "not integer";
      }
  }
  if(mobile.length<10)
  {
    return "invalid";
  }
  
  for(let i=0;i<userdata.length;i++)
  {
      if(userdata[i].mobile==mobile)
      {
          //setdata(mobile);
          setname(userdata[i].name);
          return "find";
      }
  }
  return "not find";
}

function Login()
{
  swal("Write Typing Your Mobile Number:", {
    content: "input",
  })
  .then((value) => {
    let res=check_valid(value);
    if(res=="find")
    {
      swal(`Welcome`);
      setlogin(true);
      Function(value);
    }
    else if(res=="not integer")
    {
      swal(`Please Type Integer value`);
    }
    else if(res=="zero")
    {
      swal(`Please Type Something`);
    }
    else if(res=="invalid")
    {
      swal(`This Mobile Number Must be 10 digit`);
    }
    else if(res=="not find")
    {
      swal(`This Mobile Number is not Register`);
    }
  });
}

function logout(){
  Function("");
  setlogin(false);
}

return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent mx-6">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                   <Link className="nav-link active" aria-current="page" to="/" style={{ color:'green' }}><h4>x-Food</h4></Link>
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
            <Link to={'Register'}> <button className="btn btn-info ">Register</button></Link>
            <Link to={'Login'}> <button className="btn btn-info ">Login</button></Link>
            {/* {
              product_count===0?<Link to={'Mybag'}><button className="btn btn-success mx-2 mx-5" type="submit">Bag+0</button></Link>
              :<Link to={'Mybag'}><button className="btn btn-success mx-2  mx-4" type="submit">Bag{"+"+product_count}</button></Link>
            }
            {
              login==false?<button className="btn btn-info mx-2" onClick={Login}>Log in</button>:
              <Link to={`User/Dashboard`}><button className="btn btn-light" ><img src="https://i.ibb.co/7NB2cWh/icons8-user-48.png" style={{ height:40,width:40  }} alt="Wait"/></button></Link>
            }
            {login==true?<button className="btn btn-info mx-2" onClick={logout} >Logout</button>:""} */}
          </div>
        </div>
      </nav>
    </>
  );
}