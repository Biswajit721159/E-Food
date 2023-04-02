import React,{useState} from 'react'

export default function TechnicalSupport() {


  const [firstname,setfirstname]=useState("");
  const [lastname,setlastname]=useState("");
  const [mobile,setmobile]=useState("");
  const [message,setmessage]=useState("");

  function submit(){
    console.log(firstname);
    console.log(lastname);
    console.log(mobile);
    console.log(message);
  }

  return (
    <div className='container mt-5'>
      <div className="container">
          <h4>Contact US:</h4>
          <div className="input-group mb-3 mt-4">
              <span className="input-group-text">First and last name</span>
              <input type="text" aria-label="First name" placeholder="Enter first Name" value={firstname} onChange={(e)=>{setfirstname(e.target.value)}} className="form-control" />
              <input type="text" aria-label="Last name" placeholder="Enter last Name" value={lastname} onChange={(e)=>{setlastname(e.target.value)}} className="form-control"/>
          </div>
          <div>
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Mobile Number</label>
                <input type="email" htmlFor="exampleFormControlTextarea1" className="form-control" value={mobile} onChange={(e)=>{setmobile(e.target.value)}} placeholder="Enter your mobile number" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1"  className="form-label">Writing Here</label>
                <textarea className="form-control" value={message} onChange={(e)=>{setmessage(e.target.value)}}></textarea>
              </div>
              <button type="button" onClick={submit} className="btn btn-primary"> Send Message</button>
          </div>
      
    </div>
  )
}
