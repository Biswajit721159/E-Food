import React,{useContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { global } from '../App';
import { Link, useParams } from 'react-router-dom'

export default function Successfull() {
  const {Mobile,Function,location}=useContext(global);

  return (
    
        <div class="container">
            <div class="jumbotron">
                <h1>Your Order is Successfully added</h1>
                <p>Please Go to Myorder page for further actions</p>
                <div class="buttonlog">
                    <Link to="/Myorder"><button type="button" class="btn btn-primary" >Myorder</button></Link>
                </div>
            </div>
        </div>
  )
}
