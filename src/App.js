import React from "react";
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Details from './component/Details';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PlaceOrder from "./component/PlaceOrder/placeOrder";
import AddProduct from "./component/AddProduct/addProduct";
import ModifyProduct from './component/ModifyProduct/modifyProduct';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Navigate to="/login" />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/products' element={<Dashboard />} />
        <Route exact path='/placeOrder' element={<PlaceOrder />} />
        <Route exact path="/productDetails/:id" element={<Details />} />
        <Route exact path="/addProduct" element={<AddProduct />} />
        <Route exact path="/modifyProduct/:id" element={<ModifyProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
