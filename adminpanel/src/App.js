
import './App.css';
import Adminlogin from './component/Adminlogin';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>
          <Routes>
            <Route path="/" element={<Adminlogin />}></Route>
            <Route path='/Dashboard' element={<Dashboard/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
