import React, { Component, useEffect, useState } from 'react'
import {Navbar,Container,Nav,NavLink,Button} from 'react-bootstrap'
import '../App.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { AiOutlineLogout } from "react-icons/ai";
import {  Navigate } from 'react-router-dom'


import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link } from 'react-router-dom';
import { CollectionsBookmarkRounded } from '@mui/icons-material';
function Navbars() {

  const Logout=()=>{
    sessionStorage.setItem('userData','');
    sessionStorage.clear();
  }
  return (
    
    <Navbar className='navbar' sticky="top" expand="lg"  >
        <Navbar.Brand href="/home" className="p-2">
        <div className='menagerLogo'><RestaurantIcon />{'  '}Menager's Board</div>
        </Navbar.Brand>
        
        <Navbar.Toggle/>
        <Navbar.Collapse className="justify-content-end"  >
        <Nav >
            <Nav.Link className='items' as={Link} to={"/home"}>Home</Nav.Link>
            <Nav.Link className='items' as={Link} to={"/menu"}>Menu</Nav.Link>
            <Nav.Link className='items' as={Link} to={"/qrDownloads"} >Qr-Downloads</Nav.Link>
        </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end mr-2 ">
          <Navbar.Text>
            <Button className="mx-4 btn-bd-lgout" onClick={Logout} href='/' >LOGOUT  <AiOutlineLogout size='20'  value={{ style: { verticalAlign: 'middle' } }}/></Button>
          </Navbar.Text>
        </Navbar.Collapse>
    
    </Navbar>
  )
}

export default Navbars