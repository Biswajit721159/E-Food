import React,{useState,useEffect,useContext, useDebugValue} from 'react'
import axios from "axios";
import "../App.css";
import { global } from "../App";
import swal from "sweetalert";
import { Link, json, useNavigate } from "react-router-dom";
export default function Index() {

const {Mobile,Function,child,update,Location} =useContext(global);


const [user, setuser] = useState([]);
const [product,setproduct]=useState([]);
const [currmybag,setcurrmybag]=useState([]);
const [iswishlist,setiswistlist]=useState([]);
const [review,setreview]=useState([])

const [price_low_high,setprice_low_high]=useState(false);
const [price_high_low,setprice_high_low]=useState(false);
const [briyani,setbriyani]=useState(false);
const [vage,setvage]=useState(false);
const [notvage,setnonvage]=useState(false);
const [name,setname]=useState("");


const [index,setindex]=useState("first");
const history=useNavigate();



useEffect(()=>{
  loadbag();
},[]);


useEffect(()=>{
  loadbag();
},[Mobile]);


useEffect(() => {
  searchproduct();
}, [name]);
useEffect(()=>{
  sort_assending();
},[price_low_high]);
useEffect(()=>{
  sort_decanding();
},[price_high_low]);
useEffect(()=>{
  searchbriyani();
},[briyani]);
useEffect(()=>{
  searchvage();
},[vage]);
useEffect(()=>{
  searchnonvage();
},[notvage]);


function loadbag()
{
  fetch('http://127.0.0.1:8000/product/',
  {
    method:'PATCH',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      location:Location,
      mobile:Mobile,
    })
  }
  ).then(response=>response.json()).then((product) =>{
    fetch('http://127.0.0.1:8000/mybag/').then(response=>response.json()).then((mybag) =>{
      fetch('http://127.0.0.1:8000/iswishlist/').then(response=>response.json()).then((love) =>{
        fetch('http://127.0.0.1:8000/Reviews/').then(responce=>responce.json()).then((review)=>{
          setcurrmybag(mybag);
          setuser(product)
          setiswistlist(love)
          setreview(review)
          setInTOproduct(product,mybag,love,review);
        })
      })
    })
  })
}


//sort by nonvage
function searchnonvage()
{
  if(notvage==false)
  {
    setInTOproduct(user,currmybag,iswishlist,review);
  }
  else
  {
    let arr=[];
    for(let i=0;i<product.length;i++)
    {
      if(product[i].vage!="vage")
      {
        arr.push(product[i]);
      }
    }
    setproduct([...arr]);
    sort_product_aviliable_not_avilible(arr);
  }
}

//sort by vage
function searchvage()
{
  if(vage==false)
  {
    setInTOproduct(user,currmybag,iswishlist,review);
  }
  else
  {
    let arr=[];
    for(let i=0;i<product.length;i++)
    {
      if(product[i].vage=="vage")
      {
        arr.push(product[i]);
      }
    }
    setproduct([...arr]);
    sort_product_aviliable_not_avilible(arr);
  }
}

//sort by briyani
function searchbriyani()
{
  if(product===undefined) return;
  if(briyani==false)
  {
    setInTOproduct(user,currmybag,iswishlist,review);
  }
  else
  {
    let name_pro="briyani";
    name_pro=name_pro.toLowerCase();
    let newproduct=[];
    for(let i=0;i<product.length;i++)
    {
        let s=product[i].product_name;
        s=s.toLowerCase();
        if (KMP(name_pro,s)===true || check_All_Charcter(name_pro,s)) 
        {
          newproduct.push(product[i]);
        }
    }
    setproduct([...newproduct]);
    sort_product_aviliable_not_avilible(newproduct);
  }
}

//high to low
function sort_decanding()
{
  if(product===undefined) return;
  if(price_high_low==false)
  {
    setInTOproduct(user,currmybag,iswishlist,review);
  }
  else
  {
    let arr=product;
    for(let i=0;i<arr.length;i++)
    {
      for(let j=i+1;j<arr.length;j++)
      {
        let a=change(arr[i].price);
        let b=change(arr[j].price);
        if(a < b)
        {
          let temp=arr[i];
          arr[i]=arr[j];
          arr[j]=temp;
        }
      }
    }
    setproduct([...arr]);
    sort_product_aviliable_not_avilible(arr);
  }
}

function change(s)
{
  if(typeof(s)==="number")
  {
    return s;
  }
  let x=0;
  for(let i=0;i<s.length;i++)
  {
    x=x*10+(s[i]-'0');
  }
  return x;
}

//sort by low to high
function sort_assending()
{
  if(product===undefined) return;
  if(price_low_high==false)
  {
    setInTOproduct(user,currmybag,iswishlist,review);
  }
  else
  {
    let arr=product;
    for(let i=0;i<arr.length;i++)
    {
      for(let j=i+1;j<arr.length;j++)
      {
        let a=change(arr[i].price)
        let b= change(arr[j].price)
        if(a > b)
        {
          let temp=arr[i];
          arr[i]=arr[j];
          arr[j]=temp;
        }
      }
    }
    setproduct([...arr]);
    sort_product_aviliable_not_avilible(arr);
  }
}

function KMP(searchproduct,product_name)
{
    let patt=solve1(searchproduct);
    let original=solve2(product_name);
    let n=patt.length;
    for(let i=0;i<original.length-n+1;i++)
    {
       let generate=original.substring(i,i+n);
       if(generate===patt) return true;
    }
    return false;
}

function check_All_Charcter(searchproduct,product_name){
  let s=product_name;
  let patt=searchproduct;
  let i=0;
  let j=0;
  let n=s.length;
  let m=patt.length;
  while(i<n && j<m)
  {
    if(patt[j]==s[i])
    {
      i++;j++;
    }
    else
    {
      i++;
    }
  }
  if(j==m)
  {
    return true;
  }
  return false;
}

function searchproduct()
{
  if(product===undefined) return
  if(user===undefined || iswishlist==undefined) return;
  else if(name.length===0)
  {
    setInTOproduct(user,currmybag,iswishlist,review);
  }
  else
  {
    setname(name.toLowerCase());
    let n=name.length;
    let newproduct=[];
    for(let i=0;i<user.length;i++)
    {
        let s=user[i].product_name;
        s=s.toLowerCase();
        if (KMP(name,s)===true || check_All_Charcter(name,s)) 
        {
          newproduct.push(user[i]);
        }
    }
    setproduct([...newproduct]);
    sort_product_aviliable_not_avilible(newproduct);
  }
}

function solve1(s)
{
  let res="";
  for(let i=0;i<s.length;i++)
  {
    if(s[i]>='a' && s[i]<'z')
    {
      res+=s[i];
    }
  }
  return res;
} 

function solve2(s)
{
  let res="";
  for(let i=0;i<s.length;i++)
  {
    if(s[i]>='a' && s[i]<'z')
    {
      res+=s[i];
    }
  }
  return res;
}

function find_rating_product_id(id,review)
{
        if(review==undefined) return 0;
        let arr=[]
        for(let i=0;i<review.length && review!=undefined;i++)
        {
            if(review[i].product_id==id)
            {
                let obj={
                    rating:"",
                }
                obj.rating=review[i].rating;
                arr.push(obj);
            }
        }
        let a=0,b=0,c=0,d=0,e=0;
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i].rating=="1")
            {
                a++;
            }
            else if(arr[i].rating=="2")
            {
                b++;
            }
            else if(arr[i].rating=="3")
            {
                c++;
            }
            else if(arr[i].rating=="4")
            {
                d++;
            }
            else
            {
                e++;
            }
        }
        let x=a+b+c+d+e;
        let y=0
        if(a!=0 || b!=0 || c!=0 || d!=0 || e!=0)
        {
            y=((a*1+b*2+c*3+d*4+e*5)/(x)).toFixed(1);
        }

        if(y=="NAN") y=0;
        return y;
}

function setInTOproduct(nums,currmybag,love,review)
{
  if(nums==undefined || currmybag==undefined|| love==undefined || review==undefined) return
  let ans=[];
  for(let i=0;i<nums.length;i++)
  {
    let obj={
      id:0,
      product_name:"",
      rating:"0",
      product_url:"",
      price:0,
      vage:"",
      offer:0,
      number_count:0,
      product_count:0,
      islove:false, 
    }
    obj.id=nums[i].id;
    obj.product_name=nums[i].product_name
    obj.product_url=nums[i].product_url;
    obj.price=nums[i].price;
    obj.vage=nums[i].product_type;
    obj.offer=nums[i].offer;
    obj.number_count=nums[i].number_count;
    obj.rating=find_rating_product_id(obj.id,review)
   
    for(let j=0;j<currmybag.length;j++)
    {
      if(Mobile==currmybag[j].mobile && nums[i].id==currmybag[j].product_id)
      {
        obj.product_count=currmybag[j].number_product;
      }
    }
    for(let k=0;k<love.length;k++)
    {
      if(love[k].mobile==Mobile && love[k].product_id==nums[i].id)
      {
        obj.islove=true
      }
    }
    ans.push(obj);
  }
  setproduct([...ans]);
  sort_product_aviliable_not_avilible(ans);
}

function sort_product_aviliable_not_avilible(product)
{
  if(product===undefined)
  {
    return ;
  }
  else
  {
    let arr=[];
    for(let i=0;i<product.length;i++)
    {
      if(product[i].number_count!=0)
      {
        arr.push(product[i]);
      }
    }
    for(let i=0;i<product.length;i++)
    {
      if(product[i].number_count==0)
      {
        arr.push(product[i]);
      }
    }
    setproduct([...arr]);
  }
}

function checkTheProductIsAllReadyExit(id)
{
  let ans=-1;
  if(currmybag===undefined) return ans;
  else
  {
    for(let i=0;i<currmybag.length;i++)
    {
      if(currmybag[i].mobile==Mobile && currmybag[i].product_id==id)
      {
        return currmybag[i].number_product;
      }
    }
    return ans;
  }
}

function chengeToInteger(data)
{
  if(typeof(data)=="number") return data;
  let ans=0;
  for(let i=0;i<data.length;i++)
  {
    ans=ans*10+(data[i]-'0');
  }
  return ans;
}

function anyproduct_exit()
{
   if(currmybag==undefined) return false;
   else
   {
    for(let i=0;i<currmybag.length;i++)
    {
      if(currmybag[i].mobile==Mobile)
      {
        return true;
      }
    }
    return false;
   }
}

function checking_aviliblity(id,count)
{
  if(product==undefined) return;
  else
  {
    for(let i=0;i<product.length;i++)
    {
      if(product[i].id==id && product[i].number_count>=count)
      {
        return true;
      }
    }
  }
  return false;
}

function ADD_TO_INCREMENT(id)
{
  if(Mobile.length==0)
  {
    swal(`Please Login `);
    history('/Login');
  }
  else
  {
    let mybag={ mobile: "", product_id: -1, number_product: 0};
    let ans=checkTheProductIsAllReadyExit(id);
    if(ans!=-1)
    {
        mybag.product_id=id;
        mybag.mobile=Mobile;
        mybag.number_product=chengeToInteger(ans)+1;
        let check=checking_aviliblity(id,mybag.number_product)
        if(check)
        {
            fetch('http://127.0.0.1:8000/mybag/', 
            {
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  mobile:Mobile,
                  product_id:id,
                  number_product:mybag.number_product
                })
            })
            .then(response=>response.json())
            .then((result)=>{
                alert(result);
                loadbag()
                if(index!="incre_first")
                {
                  setindex("incre_first");
                  child("incre_first");
                }
                else if(index!="incre_second")
                {
                  setindex("incre_second");
                  child("incre_second");
                }
            },
            (error)=>{
                alert("Failed");
            })
          }
          else
          {
            alert("sorry you are not allow to added!!")
          }
    }
    else
    {
        let check=anyproduct_exit();
        if (check==false)
        {
          mybag.product_id=id;
          mybag.mobile=Mobile;
          mybag.number_product=1;

          fetch('http://127.0.0.1:8000/mybag/', 
          {
              method:'POST',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  mobile:Mobile,
                  product_id:id,
                  number_product:1
              })
          })
          .then(response=>response.json())
          .then((result)=>{
              alert(result);
              loadbag()
              if(index!="incre_first")
              {
                setindex("incre_first");
                child("incre_first");
              }
              else if(index!="incre_second")
              {
                setindex("incre_second");
                child("incre_second");
              }
          },
          (error)=>{
              alert("Failed");
          })
        }
        else
        {
            if(window.confirm('Are you sure to replace this product ?'))
            {
                  fetch('http://127.0.0.1:8000/mybag/', {
                    method:'DELETE',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                      },
                      body:JSON.stringify({
                        mobile:Mobile,
                        product_id:id,
                      })
                  }).then(response=>response.json())
                  .then((result)=>
                  {
                      mybag.product_id=id;
                      mybag.mobile=Mobile;
                      mybag.number_product=1;
            
                      fetch('http://127.0.0.1:8000/mybag/', 
                      {
                          method:'POST',
                          headers:{
                              'Accept':'application/json',
                              'Content-Type':'application/json'
                          },
                          body:JSON.stringify({
                              mobile:Mobile,
                              product_id:id,
                              number_product:1
                          })
                      })
                      .then(response=>response.json())
                      .then((result)=>
                      {
                          alert(result);
                          loadbag()
                          if(index!="incre_first")
                          {
                            setindex("incre_first");
                            child("incre_first");
                          }
                          else if(index!="incre_second")
                          {
                            setindex("incre_second");
                            child("incre_second");
                          }
                      },
                    (error)=>{
                        alert("Failed");
                    })
                  },(error)=>{
                      alert("Failed");
                  })
            }



        }
    }   
  }
}

function ADD_TO_DECREMENT(id)
{
  if(Mobile.length==0)
  {
    swal(`Please Login `);
    history('/Login');
  }
  else
  {
        let mybag={ mobile: "", product_id: 0, number_product: 0};
        let ans=checkTheProductIsAllReadyExit(id);
        if(ans!=-1 && ans!=0)
        {
            mybag.product_id=id;
            mybag.mobile=Mobile;
            mybag.number_product=chengeToInteger(ans)-1;
            if(mybag.number_product!=-1)
            {
                fetch('http://127.0.0.1:8000/mybag/', 
                {
                    method:'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                      mobile:Mobile,
                      product_id:id,
                      number_product:mybag.number_product
                    })
                })
                .then(response=>response.json())
                .then((result)=>{
                    alert(result);
                    loadbag()
                    if(index!="decre_first")
                    {
                      setindex("decre_first");
                      child("decre_first");
                    }
                    else if(index!="decre_second")
                    {
                      setindex("decre_second");
                      child("decre_second");
                    }
                },
                (error)=>{
                    alert("Failed");
                })
            }
            else
            {
              
              swal('Sorry You are not Allow!');
            }
        }
        else
        {
            swal('Sorry This Product is not to your bag!');
        }
   }
}

function check_alreadylove_list(id)
{
  if(iswishlist==undefined) return false;
  else
  {
    for(let i=0;i<iswishlist.length;i++)
    {
      if(iswishlist[i].product_id==id && iswishlist[i].mobile==Mobile)
      {
        return true;
      }
    }
    return false;
  }
}

function love(id)
{
  if(check_alreadylove_list(id)==true)
  {
    fetch('http://127.0.0.1:8000/iswishlist/',
    {
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        mobile:Mobile,
        product_id:id
      })
    }).then(response=>response.json())
    .then((result)=>{
      alert(result)
      loadbag()
    },
    (error)=>{
      alert("Failed")
    })
  }
  else
  {
      fetch('http://127.0.0.1:8000/iswishlist/', 
      {
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            mobile:Mobile,
            product_id:id,
          })
      })
      .then(response=>response.json())
      .then((result)=>{
          alert(result);
          loadbag()
      },
      (error)=>{
          alert("Failed");
      })
  }
}

  return (
    <>
    
<div className="container" >
<div className="container" >
        
<div className="row">
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={price_low_high} onChange={(e)=>setprice_low_high(e.target.checked)}  id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault" >
                  Price Low to High
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={price_high_low} onChange={(e)=>setprice_high_low(e.target.checked)} value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Price High to Low
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={briyani} onChange={(e)=>setbriyani(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Briyani
                </label>
              </div>
        </div>
        
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={vage} onChange={(e)=>setvage(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Vage Food
                </label>
              </div>
        </div>
        <div className="container col-sm mt-1">
              <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" checked={notvage} onChange={(e)=>setnonvage(e.target.checked)} id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Non Vage Food
                </label>
              </div>
        </div>
        <div className="container col-sm mt-2">
          <div className="container">
          <input
                type="text"
                className="form-control"
                value={name} onChange={(e)=>setname(e.target.value)} autoComplete='off'  placeholder="Search Food"
              />
          </div>
        </div>
</div>
    </div >
      <div className="row mt-5">
        {product !== undefined && product.length!==0
          ? product.map((item, ind) => (
            
            <div className="card-shadow mt-4 mx-4" style={{ width: 200 }} key={ind}>
            {
              item.number_count!=0? 
                item.islove==true?
                <button  className="fas fa-heart"  onClick={()=>love(item.id)} style={{backgroundColor:"#F7173B",borderRadius:"18px"}}></button>:
                <button  className="fas fa-heart"  onClick={()=>love(item.id)} style={{borderRadius:"18px"}}></button>
              : 
              <button  className="fas fa-heart" style={{backgroundColor:"light", borderRadius:"18px"}} disabled></button>
            }
            <Link to={`/product_id/${item.id}`}>
              <img
                src={item.product_url}
                className="card-img-top"
                style={{ width: 200, height: 150,marginLeft:0,marginTop:10 }}
                alt="Please Wait"
              />
            </Link>
            <div className="card-body">
              <h6 className="card-title">{item.product_name}</h6>
              <div className="row">
                <div className="container col">
                   <h5 className="card-text" style={{color:'orange'}}>{item.offer}% OFF</h5>
                </div>
                <div className="container col">
                   <h5 className="card-text" style={{color:'gray'}}><s>₹{item.price}</s></h5> 
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  {
                   item.rating >= "1.0" && item.rating<="2.5" ? (
                      <button className='btn btn-danger btn-sm' style={{fontSize:"13px"}} ><span className="fa fa-star checked"></span>{item.rating}</button>
                    ) : item.rating >"2.5" && item.rating<="3.5" ? (
                      <button className='btn btn btn-sm' style={{fontSize:"13px",backgroundColor:"#F3CB89"}} ><span className="fa fa-star checked"></span>{item.rating}</button>
                    ) : item.rating >"3.5" && item.rating<="4.0" ? (
                      <button className='btn btn-success btn-sm' style={{fontSize:"13px"}} ><span className="fa fa-star checked"></span>{item.rating}</button>
                    ) : item.rating >"4.0" && item.rating<="5.0"? (
                      <button className='btn btn-info btn-sm' style={{fontSize:"13px",backgroundColor:"#8BDD8A"}} ><span className="fa fa-star checked"></span>{item.rating}</button>
                    ) : (
                      <button className='btn btn btn-sm' style={{fontSize:"13px",backgroundColor:"#D6D7F6"}} ><span className="fa fa-star checked"></span>{item.rating}</button> 
                    )
                  }
                </div>
                <div className='col'>
                  {
                    item.number_count!=0?<strong>{item.number_count} Left</strong>:<strong style={{color:"#E2E2F4"}}>{item.number_count} Left</strong>
                  }
                </div>
              </div>
              {
                 item.number_count==0?
                 <div className="row">
                    <div className="container col-sm">
                    <h5 className="card-text" style={{color:'lightgray'}}>Closed</h5>
                    </div>
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100))}</h5>
                    </div>
                </div>
                 :
                 <div className="row">
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'green'}}>Available</h5>
                    </div>
                    <div className="container col-sm">
                       <h5 className="card-text" style={{color:'tomato'}}>₹{(item.price-((item.price*item.offer)/100))}</h5>
                    </div>
                </div>
                 
              }
              {
                

                item.number_count==0?

                item.product_count==0?
                <button className="btn btn-secondary rounded-pill btn-sm mt-2" disabled >
                 <button className="btn btn-secondary rounded-pill btn-sm mx-3"> - </button>
                     ADD
                  <button className="btn btn-secondary rounded-pill btn-sm mx-3"> + </button>
               </button>
               :
               <button className="btn btn-secondary rounded-pill btn-sm mt-2" disabled >
                 <button className="btn btn-secondary rounded-pill btn-sm mx-3"> - </button>
                     {item.product_count} 
                 <button className="btn btn-secondary rounded-pill btn-sm mx-3"> + </button>
             </button>

               :

               item.product_count==0?
               <button className="btn btn-primary rounded-pill btn-sm mt-2" >
                 <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item.id)}> - </button>
                     ADD
                  <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item.id)}> + </button>
               </button>
               :
               <button className="btn btn-primary rounded-pill btn-sm mt-2">
                 <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_DECREMENT(item.id)}> - </button>
                     {item.product_count} 
                 <button className="btn btn-primary rounded-pill btn-sm mx-3" onClick={()=>ADD_TO_INCREMENT(item.id)}> + </button>
             </button>




              }
            </div>
          </div>
            ))
          : <h2 className="col-md-12 text-center" id="notfound">Product Not Found  ! </h2>}
      </div>
    </div>
    </>
  )
}
