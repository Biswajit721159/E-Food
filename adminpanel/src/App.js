import './App.css';
import Adminlogin from './component/Adminlogin';
import Dashboard from './component/Dashboard';
import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Manage_product from './component/Manage_product';
export const global = createContext();


function App() {

  const [Username,setusername]=useState("");
  function solve_username(username)
  {
    setusername(username); 
  }

  return (
    <div className="App">
      <global.Provider value={{Username:Username,Function:solve_username}}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Adminlogin />}></Route>
            <Route path='/Dashboard' element={<Dashboard/>}></Route>
            <Route path='/product_info' element={<Manage_product/>}></Route>
          </Routes>
        </Router>
      </global.Provider>
    </div>
  );
}

export default App;
