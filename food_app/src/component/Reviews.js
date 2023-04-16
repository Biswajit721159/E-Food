import React, { useState ,useContext} from 'react'
import { Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import { global } from "../App";
import { useNavigate } from "react-router-dom";

export default function Reviews() {
 
  const history=useNavigate()
  const {Mobile,Function,child,update,Location} =useContext(global);
  const [reviews,setreviews]=useState("");
  const[rating,setrating]=useState("Over All Rating Out of 5");

  let { id } = useParams();

  function submit()
  {
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
          product_id:id,
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
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="col-md-3 mt-4">
          <button className="btn btn-primary" type="submit" onClick={submit}>
            Submit Feedback
          </button>
        </div>
     
    </div>
  );
}
