
import './App.css';
import Home from './component/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import { color } from '@mui/system';
import Navbars from './component/Navbars'
import Tables  from './component/Tables'
import Login from './component/Login';
import {Userinfo}  from './component/context/Userinfo';
import { useState } from 'react';
import QrTable  from './component/QrTable';
import Client from './component/Client';
import Command from './component/Command';
import Menu from './component/Menu';



function App() {
  const [User,setUser]=useState({});
  return (
    
      <BrowserRouter>
        <Userinfo.Provider value={{User,setUser}}>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/qrDownloads" element={<QrTable />} />
          <Route path="/table/:id" element={<Tables/>} />
          <Route path="/rest:r/tab:t" element={<Client/>} />
          <Route path="/command" element={<Command/>} />
        </Routes>
        </Userinfo.Provider> 
      </BrowserRouter>
       
  );
}

export default App;
