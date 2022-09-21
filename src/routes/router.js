import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import Login from "../views/login/Login";
import CustomerHome from "../views/customer/CustomerHome";

export function Router(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/customerHome" element={<CustomerHome/>}/>
      </Routes>
    </BrowserRouter>
  );
}