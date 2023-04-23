import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { global } from "../App";

export default function Payment() {

  const {Mobile,Function,location}=useContext(global);

  //const [user,setuser]=useState([]);
  const [product, setproduct] = useState([]);
  const [order,setorder]=useState([]);
  const [currentbag,setcurrentbag]=useState([]);
  const [id,setid]=useState(-1);
  const [cost, setcost] = useState(0);
  const history=useNavigate();
  
  const [card,setcard]=useState("");
  const[namecard,setnamecard]=useState("");
  const [expiry,setexpity]=useState("");
  const [cvv,setcvv]=useState("");
  const [save_card,setsave_card]=useState(false)

  useEffect(() => {
    loadproduct();
  }, [Mobile]);

  function loadproduct() {
    fetch('http://127.0.0.1:8000/product/').then(response=>response.json()).then((product) =>{
      fetch('http://127.0.0.1:8000/mybag/').then(response=>response.json()).then((mybag) =>{
        fetch('http://127.0.0.1:8000/card_info/').then(response=>response.json()).then((card_info)=>{
          setproduct(product);
          set_beg(mybag,product);
          find_card_info(card_info);
        })
      })
    })
  }

  function findcost(currentbag,product) 
  {
      let cost=0;
      if(currentbag===undefined) return;
      else if(product==undefined) return;
      let ans=[];
      for(let i=0;i<currentbag.length;i++)
      {
          let data=0;
          for(let j=0;j<product.length;j++)
          {
              if(product[j].id==currentbag[i].product_id && product[j].number_count!=0)
              {
                  let price=change(product[j].price);
                  let offer=change(product[j].offer);
                  let product_count=change(currentbag[i].number_product);
                  data=product_count*price;
                  data=data-((data*offer)/100);

                  let obj={
                    mobile:Mobile,
                    product_id:product[j].id,
                    price:data,
                    number_product:currentbag[i].number_product,
                    date:"",
                  }
                  ans.push(obj); 
              }
          }
          cost+=data;
      }
      setcost(cost);
      setorder([...ans]);
  }

  function set_beg(nums,product)
  {
    if(Mobile.length==0)
    {
      return
    }
    else if(nums==undefined || product==undefined) return
    else
    {
      let ans=[];
      for(let i=0;i<nums.length;i++)
      {
        if(nums[i].mobile==Mobile)
        {
          ans.push(nums[i]);
          setid(nums[i].product_id);
        }
      }
      setcurrentbag([...ans]);
      findcost(ans,product);
    }
  }

  function find_card_info(nums)
  {
    if(Mobile.length!=10) return;
    else
    {
      for(let i=0;i<nums.length;i++)
      {
        if(nums[i].mobile==Mobile)
        {
          setcard(nums[i].card_number)
          setnamecard(nums[i].name)
          setexpity(nums[i].expiry)
          setcvv(nums[i].cvv)
          setsave_card(true)
        }
      }
    }
  }

  function change(s)
  {
    if(typeof(s)==="number")
    {
      return s;
    }
    if(s==undefined) return 0;
    let x=0;
    for(let i=0;i<s.length;i++)
    {
      x=x*10+(s[i]-'0');
    }
    return x;
  }

  function check_card(name)
  {
    if(name.length!==12)
    {
      return false;
    }
    else
    {
      for(let i=0;i<name.length;i++)
      {
        if(name[i]>='0' && name[i]<='9')
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

  function check_cvv(name)
  {
    if(name.length!==4)
    {
      return false;
    }
    else
    {
      for(let i=0;i<name.length;i++)
      {
        if(name[i]>='0' && name[i]<='9')
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

  function check_expiry(name)
  {
    if(name.length!==5)
    {
      return false;
    }
    else 
    {
      let a=name[0];
      let b=name[1];
      let c=name[2];
      let d=name[3];
      let e=name[4];
      if(c!=='/')
      {
        return false;
      }
      else if(a>='0' && a<='9'&& b>='0' && b<='9' && d>='0' && d<='9' && e>='0' && e<='9' )
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }

  function check_name(name)
  {
    if(name.length<7)
    {
      return false;
    }
    else
    {
      let count=0;
      for(let i=0;i<name.length;i++)
      {
        if((name[i]>='a' && name[i]<='z')||(name[i]>='A' && name[i]<='Z'))
        {
          continue;
        }
        else if(name[i]==' ')
        {
          count++;
        }
        else
        {
          return false;
        }
      }
      if(count==1)
      {
        return true;
      }
      else
      {
        return false;
      }
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
          return (product[i].number_count)
        }
      }
    }
    return 0;
  }

  const put_data = async(input) => {
      let count_product=checking_aviliblity(input.product_id,input.number_product)
      if(count_product>0)
      {  
        console.log(count_product)
        fetch('http://127.0.0.1:8000/order/', 
        {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                mobile:Mobile,
                product_id:input.product_id,
                price:input.price,
                number_product:input.number_product,
                date:input.date
            })
        })
        .then(response=>response.json())
        .then((result)=>
        {
            alert(result)
            if(save_card==false)
            {
              if(window.confirm('Are you save the card detail ?'))
              {
                fetch('http://127.0.0.1:8000/card_info/',
                {
                  method:"POST",
                  headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                        mobile:Mobile,
                        card_number:card,
                        name:namecard,
                        expiry:expiry,
                        cvv:cvv
                  })
                }).then(response=>response.json()).then((res)=>{
                  alert(res)
                },(error)=>{
                  alert(error)
                })
              }
            }
            else 
            {
                fetch('http://127.0.0.1:8000/card_info/',
                {
                  method:"PUT",
                  headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                        mobile:Mobile,
                        card_number:card,
                        name:namecard,
                        expiry:expiry,
                        cvv:cvv
                  })
                })
            }
            fetch('http://127.0.0.1:8000/product/',
            {
              method:"PUT",
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  id:input.product_id,
                  number_count:count_product-input.number_product,
              })
            })
        },
        (error)=>{
          alert(error)
        })
        history(`/MyOrder`);
      }
      else
      {
        alert("sorry please reduce the number of product count !!");
        history('/Mybag');
      }  
  }

  function pay() 
  {
    if(Mobile.length!=10)
    {
      swal("Please login");
      return;
    }
    const a=check_card(card);
    const b=check_name(namecard);
    const c=check_expiry(expiry);
    const d=check_cvv(cvv);
   
    if(a===true && b===true && c===true && d===true )
    {
        if(order===undefined)
        {
              return;
        }
        for(let i=0;i<order.length;i++)
        {
              const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
              const current = new Date();
              const date = `${ monthNames[current.getMonth()]} ${current.getDate()}`;
              order[i].date=date;
              if(order[i].number_product!=0)
              {
                put_data(order[i]);
              }
        }
    }
    else if(a===false)
    {
      swal("Sorry Card Number is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(b===false)
    {
      swal("Sorry Card Name is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(c===false)
    {
      swal("Sorry Card Expiry is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else if(d===false)
    {
      swal("Sorry Card CVV is incorrect ?", {
        buttons: [, "OK"],
      });
    }
    else
    {
      swal("Sorry Your Card detail  is incorrect ?", {
        buttons: [, "OK"],
      });
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="h3 mb-5 mt-5"> Safe Payment</h1>
        <div className="col-lg-7" style={{backgroundColor:'yellow'}}>
          <div className="accordion" id="accordionPayment">
            <div className="accordion-item mb-3">
              <div
                id="collapseCC"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionPayment"
              >
                <div className="accordion-body">
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input type="text" className="form-control" placeholder="" value={card} onChange={(e)=>setcard(e.target.value)} />
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-label">Name on card</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={namecard} onChange={(e)=>setnamecard(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Expiry date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                          value={expiry} onChange={(e)=>setexpity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">CVV Code</label>
                        <input type="text" className="form-control" value={cvv} onChange={(e)=>setcvv(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={pay}>
                      Pay {cost}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
