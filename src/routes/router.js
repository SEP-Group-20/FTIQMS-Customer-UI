import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
// import Login from "../views/login/Login";
import CustomerHome from "../views/customer/CustomerHome";
import Register from "../pages/Layout/Register/Register";
import Login from "../views/login/Login";
import NoPage from "../pages/Layout/NoPage/NoPage";
import Contact from '../pages/Layout/Contact/Contact';
import RequireAuth from '../utils/requireAuth';
import { CUSTOMER } from "../utils/RolesList";
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customerHome" element={<RequireAuth allowedRoles={[CUSTOMER]}><CustomerHome /></RequireAuth>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}