import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import {Button} from 'react-bootstrap'
import Navbars from './Navbars'
import { Navigate, useParams } from 'react-router-dom'
import { Userinfo } from './context/Userinfo'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';


function Tables() {
  const [statu,setStatu]=useState(false);
  const {user,setUser}=useContext(Userinfo);
  const {id}=useParams();
  const [data,setData]=useState(null);
  const [dataTemp,setDataTemp]=useState(null)
  useLayoutEffect(()=>{
    if(sessionStorage.getItem('userData')){
     console.log("Login success");
    }
    else {setStatu(true);}
  },[]
  )

  useLayoutEffect(()=>{
    let formData=new FormData();
    formData.append('idTable',id);
    formData.append('id',JSON.parse(sessionStorage.getItem('userData')).id);
    
    axios.post("http://localhost/ReactTest/mysite/src/component/api/table.php",formData,{headers:{'Content-type':'multipart/form-data'}})
    .then(Response=>Response.data)
    .then(respdata=>{
      if(respdata.length>0){
        setData(respdata);  
        setDataTemp(respdata);
      } 
    });
  },[])

  
  const Accepte=(idCommande)=>{
    let formData=new FormData();
    formData.append('idCommande',idCommande);
    formData.append('idTable',id);
    formData.append('id',JSON.parse(sessionStorage.getItem('userData')).id);
    axios.post("http://localhost/ReactTest/mysite/src/component/api/table.php",formData,{headers:{'Content-type':'multipart/form-data'}})
    .then(window.location.reload())
  }

  const Active=(e)=>{
    let formData=new FormData();
    formData.append('active',e.target.checked)
    formData.append('idTable',id);
    formData.append('id',JSON.parse(sessionStorage.getItem('userData')).id);
    axios.post("http://localhost/ReactTest/mysite/src/component/api/table.php",formData,{headers:{'Content-type':'multipart/form-data'}})
    .then(window.location.reload())

  }

  const Search=(value)=>{
    if(dataTemp.filter(manager=>manager.date.includes(value)).length>0){
      setData(dataTemp.filter(manager=>manager.date.includes(value)))
    }
    else
      setData(dataTemp)
    if(value.length==0)
      setData(dataTemp)
  }
  return (
    <>
    {statu?<Navigate to='/'/> :
      <>
      <Navbars/>
      <div className='container mt-2 '>    
        <div ><h1 className='text-center'>Table {id} Statut</h1></div>
        <div className="form-check form-switch d-flex justify-content-between">
            <div>
            <input className="form-check-input shadow-lg border border-primary " type="checkbox" id="actived" checked={data?!!data[0].active:!!null} onChange={(e)=>Active(e)}/>
            <label className="form-check-label " htmlFor="actived">Actived Table {id}</label>
            </div>
            <div className='d-flex '>
              <input type='search' placeholder='Search' className="form-control rounded" onChange={e=>Search(e.target.value)}/>
              <span className="input-group-text border-0"  >
                <i><SearchIcon  style={{color:'rgb(136, 106, 197)'}}/></i>
              </span>
            </div>
        </div>
        <br></br>
        <div>History:</div>
        <Table striped  hover className='shadow-lg '>
          <thead className='theadbg text-center' key={"he"}>
            <tr key="head">
              <th key="nbr text-right">Number Of Command</th>
              <th key="plat">Plats</th>
              <th key="dt">Date</th>
              <th key="pr">Price</th>
              <th key="cache">Cache</th>
            </tr>
          </thead>
          <tbody key={"ha"} className='text-center'>

            {data?data.map((d,i)=>(d.accepte==1?
            <tr key={i}>
              <td key={i+100}>{d.idCommande}</td>
               <td key={i+20}>
                {
                  d.details.split(',').map((detail)=>(<div key={detail} className='text-center'>{detail}</div>))
                }
              
              </td>
              <td key={i+101}>{d.date}</td>
              <td key={i+102}>{d.prixTotal}DH</td>
              <td key={i+103}>{d.cache?"Yes":"No"}</td>
              </tr>:null)
            ):null}
          </tbody>
        </Table>
        <br></br>
        <div>Commands:</div>

        <Table striped  hover className='shadow-lg  ' >
          <thead className='bg-success '>
            <tr>
              <th className='text-center'>Plat</th>
              <th className='text-center'>Number Of Plats </th>
              <th className='text-center'>Price</th>
              <th className='text-center'>Accept</th>
            </tr>
          </thead>
          <tbody>

          {data?data.map((d,i)=>(d.accepte==0? <tr key={i.toString()+"i"}>
              {d.details.split(',').map((detail)=>console.log(detail))}
              <td key={i+20}>
                {
                  d.details.split(',').map((detail)=>(<div key={detail} className='text-center'>{detail}</div>))
                }
              
              </td>
              <td key={i+21}  className='text-center'>{d.nbrPlats}</td>
              <td key={i+22}  className='text-center'>{d.prixTotal}DH</td>
              <td key={i+23}  className='text-center'><Button variant="outline-success" onClick={()=>Accepte(d.idCommande)}>Yes</Button>{' '}</td>
              </tr>:null)
          ):null}
          </tbody>
        </Table>
      </div>
      </>
      
    }
    </>
  )
}

export default Tables