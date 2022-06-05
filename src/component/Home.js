import React, { useState,useEffect, useLayoutEffect,useContext} from 'react'
import { Link,NavLink, Navigate } from 'react-router-dom'
import table from './restaurant.png'
import Navbars from './Navbars'
import { Navbar } from 'react-bootstrap'
import { Userinfo } from './context/Userinfo'
import { ReactSession } from 'react-client-session';
import axios from 'axios'



const Home = () => {
    const [active,setActive]=useState(null);
    const [statu,setStatu]=useState(false);
    const {User,setUser}=useContext(Userinfo);
    const [data,setData]=useState()
    
  useLayoutEffect(()=>{
    if(sessionStorage.getItem('userData')){
      setData(JSON.parse(sessionStorage.getItem('userData')))
      let formData=new FormData();
      formData.append('idHome',JSON.parse(sessionStorage.getItem('userData')).id);
      axios.post("http://localhost/ReactTest/mysite/src/component/api/table.php",formData,{headers:{'Content-type':'multipart/form-data'}})
      .then(resp=>resp.data)
      .then(data=>setActive(data))
    }
    else {setStatu(true);}
  },[]
  )

  
  return (
    <>
    {
      
      statu?<Navigate to='/'/> :
    <>
    <Navbars/>
    <div className='container tabl'>
    {data? Array(data.nbrTable).fill().map((_,i)=>
          <NavLink key={i}  className="navlink" to={`/table/${i+1}`}>
          <div className='cont'>
              <img className={`rounded-circle border ${active!=null?(active[i].active? "border-success" : "border-danger"):''}` } src={table} alt="Circle image"></img>
              <div className='container textimage' >T{i+1}</div>
          </div>
          </NavLink>
      ) : ""
      }
    </div>
    </>
    }</>
  )
}

export default Home