import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
// import Login from "../views/login/Login";
import CustomerHome from "../views/customer/CustomerHome";
import Register from "../pages/Layout/Register/Register";
import Login from "../pages/Layout/Login/Login";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import NoPage from "../pages/Layout/NoPage/NoPage";
import Contact from '../pages/Layout/Contact/Contact';
import RequireAuth from '../utils/requireAuth';

export function Router(){
  return(
    <BrowserRouter>
          <Routes>
              <Route path="/customerHome" element={<CustomerHome/>}/>
              <Route exact path="/register" element={<Register/>} />
              <Route exact path='/login' element={<Login/>} />
              <Route exact path='/contact' element={<RequireAuth><Contact/></RequireAuth>} />
              <Route exact path='/unauthorized' element={<Unauthorized/>} />
              <Route exact path='*' element={<NoPage/>} />
          </Routes>
        </BrowserRouter>
  );
}