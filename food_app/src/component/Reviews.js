import React, { useState ,useContext, useEffect} from 'react'
import { Routes, Route, useParams, useSearchParams,Link } from 'react-router-dom';
import { global } from "../App";
import { useNavigate } from "react-router-dom";

export default function Reviews() {
 
  const history=useNavigate()
  const {Mobile,Function,child,update,Location} =useContext(global);

  const [reviews,setreviews]=useState("");
  const[rating,setrating]=useState("Over All Rating Out of 5");
  let [file,setfile]=useState("")



  const [already_given_reviews,setalready_given_reviews]=useState(true)
  let { order_id,product_id } = useParams();

  const [img,setimg]=useState([])

  const [review_table,setreview_table]=useState([])

  useEffect(()=>{
    loadproduct();
  },[Mobile])

  function loadproduct()
  {
    fetch('http://127.0.0.1:8000/Reviews/').then(responce=>responce.json()).then((res)=>{
      setreview_table(res)
      check_already_exit(res)
    })
    fetch('http://127.0.0.1:8000/image_detail_api/').then(responce=>responce.json()).then((res)=>{
      setimg(res)
      console.log(res)
    })
  }
  
  function check_already_exit(nums)
  {
    for(let i=0;i<nums.length;i++)
    {
      if(nums[i].order_id==order_id && nums[i].product_id==product_id && nums[i].mobile==Mobile)
      {
        setalready_given_reviews(false)
        break;
      }
    }
  }

  function submit()
  {

    if(Mobile.length!=10)
    {
      history('/Login')
    }
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const current = new Date();
    const date = `${ monthNames[current.getMonth()]} ${current.getDate()}`;
     fetch('http://127.0.0.1:8000/Reviews/',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          mobile:Mobile,
          product_id:product_id,
          order_id:order_id,
          rating:rating,
          review:reviews,
          time_created:date,
      })
     })
     .then(response=>response.json())
     .then((result)=>{
       alert(result);
       history('/Myorder')
     },
     (error)=>{
       alert(`We are find some Error`);
     })
  }

  return (
    <>

{/* {
  <div>
      <h1>{img.length}</h1>
      {
          img.map((data,ind)=>(
            <div>
              <h1>{data.product_id}</h1>
               <h2>{data.image_id}</h2>
               <h2>{data.image}</h2>
               <Link to={data.image}>go</Link>
            </div>
          ))
        }
  </div>

        
} */}


    {
    already_given_reviews ==true
    ?
    <div className="container mt-3">
      <h3>Reviews Form</h3>
        <div className="col-md-4 mt-3">
          <textarea
            type="textarea"
            className="form-control"
            placeholder="Write Your Reviews"
            value={reviews}
            onChange={(e)=>setreviews(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4 mt-3">
          <select className="form-select" value={rating} onChange={(e)=>setrating(e.target.value)} >
            <option>Over All Rating out of 5</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        {/* <div className='mt-3'> 
             <input type="file" name="image_url" value={file} accept="image/jpeg,image/png,image/gif" onChange={(e) => {setfile(e.target.value)}}/>
         </div> */}
        <div className="col-md-3 mt-4">
          <button className="btn btn-primary" type="submit" onClick={submit}>
            Submit Feedback
          </button>
        </div>
    </div>
    :
    <h2 className="col-md-12 text-center" id="notfound">Review is already given</h2>
   }
  </>
  );
}
