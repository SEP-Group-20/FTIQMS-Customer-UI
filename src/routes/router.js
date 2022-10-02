import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import CustomerHome from "../views/customer/CustomerHome";
import MyVehicles from "../views/customer/MyVehicles";
import RegisterVehicle from "../views/customer/RegisterVehicle";
import Register from "../views/register/Register";
import Login from "../views/login/Login";
import NoPage from "../views/noPage/NoPage";
import Contact from '../views/contact/Contact';
import RequireAuth from '../utils/requireAuth';
import { CUSTOMER } from "../utils/RolesList";
import QRCodeView from "../views/customer/QRCode";
import VehicleDetails from "../views/customer/VehicleDetails";
import RequestFuel from "../views/customer/RequestFuel";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route path="/customer/home" element={<RequireAuth allowedRoles={[CUSTOMER]}><CustomerHome /></RequireAuth>} />
        <Route path="/customer/myVehicles" element={<RequireAuth allowedRoles={[CUSTOMER]}><MyVehicles /></RequireAuth>} />
        <Route path="/customer/requestFuel" element={<RequireAuth allowedRoles={[CUSTOMER]}><RequestFuel /></RequireAuth>} />
        <Route path="/customer/registerVehicle" element={<RequireAuth allowedRoles={[CUSTOMER]}><RegisterVehicle /></RequireAuth>} />
        <Route path="/customer/viewVehicle/:vid" element={<RequireAuth allowedRoles={[CUSTOMER]}><VehicleDetails /></RequireAuth>} />
        <Route path="/customer/qrcode" element={<RequireAuth allowedRoles={[CUSTOMER]}><QRCodeView /></RequireAuth>} />
        <Route exact path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}