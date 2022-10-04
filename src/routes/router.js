import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
// import Login from "../views/login/Login";
import CustomerHome from "../views/customer/CustomerHome";
import MyVehicles from "../views/customer/MyVehicles";
import RegisterVehicle from "../views/customer/RegisterVehicle";
import Register from "../pages/Layout/Register/Register";
import Login from "../views/login/Login";
import NoPage from "../pages/Layout/NoPage/NoPage";
import Contact from '../pages/Layout/Contact/Contact';
import RequireAuth from '../utils/requireAuth';
import { CUSTOMER } from "../utils/RolesList";
import QRCodeView from "../views/customer/QRCode";
import AccountDetails from '../views/customer/ViewAccountDetails'
export function Router() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route exact path="/register" element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route path="/customer/home" element={<RequireAuth allowedRoles={[CUSTOMER]}><CustomerHome /></RequireAuth>} />
        <Route path="/customer/myVehicles" element={<RequireAuth allowedRoles={[CUSTOMER]}><MyVehicles /></RequireAuth>} />
        <Route path="/customer/registerVehicle" element={<RequireAuth allowedRoles={[CUSTOMER]}><RegisterVehicle /></RequireAuth>} />
        <Route path="/customer/qrcode" element={<RequireAuth allowedRoles={[CUSTOMER]}><QRCodeView /></RequireAuth>} />
        <Route path="/customer/qrcode" element={<RequireAuth allowedRoles={[CUSTOMER]}><QRCodeView /></RequireAuth>} />
        <Route path="/customer/viewAccount" element={<AccountDetails/>} />
        <Route exact path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}