
import './App.css';
import Adminlogin from './component/Adminlogin';
import Dashboard from './component/Dashboard';
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
export const global = createContext();


function App() {
  const [mobile,setmobile]=useState("");
  function solve_mobile(mobile)
  {
    setmobile(mobile);
  }
  return (
    <div className="App">
      <global.Provider value={{Mobile:mobile,Function:solve_mobile}}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Adminlogin />}></Route>
            <Route path='/Dashboard' element={<Dashboard/>}></Route>
          </Routes>
        </Router>
      </global.Provider>
    </div>
  );
}

export default App;
