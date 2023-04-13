import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Mybag from "./component/Mybag";
import Payment from "./component/Payment";
import Error from "./component/Error";
import Register from "./component/Register";
import Userdetail from "./component/Userdetail";
import MyOrder from "./component/MyOrder";
import Index from "./component/Index";
import Update_user from "./component/Update_user";
import TechnicalSupport from "./component/TechnicalSupport";
import About from "./component/About";
import Login from "./component/Login";
import { createContext, useState } from "react";
import Home from "./component/Home";

export const global = createContext();

function App() {
  const [mobile,setmobile]=useState("");
  const [update,setupdate]=useState("normal");
  function solve_Food(mobile)
  {
    setmobile(mobile);
  }
  function updateData(data)
  {
    setupdate(data);
  }

  return (
    <div className="App">
      <global.Provider value={{Mobile:mobile,Function:solve_Food,child:updateData,update}}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/index" element={<Index />}></Route>
            <Route path="Mybag" element={<Mybag />}></Route>
            <Route path="Mybag/:rupes/Payment" element={<Payment/>}></Route>
            <Route path="Register" element={<Register />}></Route>
            <Route path="Login" element={<Login />}></Route>
            <Route path="User/Dashboard" element={<Userdetail/>}></Route>
            <Route path="/MyOrder" element={<MyOrder/>}></Route>
            <Route path="/update/detail" element={<Update_user/>}></Route>
            {/* <Route path="Technical_Support" element={<TechnicalSupport/>}></Route>
            <Route path="About" element={<About />}></Route> */}
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </Router>
      </global.Provider>
    </div>
  );
}

export default App;
