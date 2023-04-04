import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Mybag from "./component/Mybag";
import Payment from "./component/Payment";
import Error from "./component/Error";
import Register from "./component/Register";
import Userdetail from "./component/Userdetail";
import MyOrder from "./component/MyOrder";
import Index from './component/Index';
import Update_user from "./component/Update_user";
import TechnicalSupport from "./component/TechnicalSupport";
import About from "./component/About";
import Login from './component/Login';

function App() {
  return (
    <div className="App">
     <Router>
        <Navbar/>
         <Routes>
           <Route path="/" element={ <Index/>}></Route>
           <Route path="Mybag" element={<Mybag />}></Route>
           <Route path="Mybag/:rupes/Payment" element={<Payment/>}></Route>
           <Route path="Register" element={<Register/>}></Route>
           <Route path="Login" element={<Login/>}></Route>
           <Route path="User/Dashboard" element={<Userdetail/>}></Route>
           <Route path="/MyOrder" element={<MyOrder/>}></Route>
           <Route path="/update/detail" element={<Update_user/>}></Route>
           <Route path="Technical_Support" element={<TechnicalSupport/>}></Route>
           <Route path="About" element={<About/>}></Route>
           <Route path="*" element={<Error />}></Route>
         </Routes>
      </Router>
    </div>
  );
}

export default App;
