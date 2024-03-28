import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Create from './components/create';
import Update from './components/update';
import Order from './components/order';
import ConfirmOrdersList from './components/confirmOrdersList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
      <Route path='/order/:id' element={<Order/>}></Route>
      <Route path='/confirmorders' element={<ConfirmOrdersList/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
