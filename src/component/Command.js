import { Divider } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { Container ,Button,Form,Modal} from 'react-bootstrap'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import './command.css'
import logo from './iconRest.png'
import axios from 'axios'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function Command() {
    const data=useLocation().state
    const Comm=data.myCom;
    const [payType,setType]=useState(null);
    
    const totale=()=>{
      let totale=0;
          for(let i=0;i<Comm.length;i++){
              totale+=Comm[i].prix;
          }
      return totale;
    }
    const [tot,setTot]=useState(totale);
    const [show,setShow]=useState(false);
    const remove=(element)=>{
        for(let i=0;i<Comm.length;i++){
            if(Comm[i].nomPlat==element){
              setTot(tot-Comm[i].prix);
              Comm.splice(i,1);
              break;
            }
        }
    }

    const confirm=()=>{
      if(payType==='cache'){
        let nomPlats=[];
        for(let i=0;i<Comm.length;i++){
          nomPlats.push(Comm[i].nomPlat);
        }
        let form =new FormData();
        form.append('id',data.data.r);
        form.append('table',data.data.t);
        form.append('nbrPlat',Comm.length);
        form.append('prixTot',tot);
        form.append('payType',payType);
        form.append('nomPlats',nomPlats);

        axios.post("http://localhost/reactTest/mysite/src/component/api/command.php",form,{headers:{'Content-type':'multipart/form-data'}})
        .then(resp=>resp.data)
        .then(data=>{ 
          
          if(data=='Success'){
            setShow(true);
            }
          }
        )
      }
    }

    let navigate=useNavigate();
    const location=()=>{
      console.log('yes')
      navigate(-1);
    }
    
  return (
    <Container className='mt-5'> 
    
        <div className='rounded shadow-lg'>
            <div className='text-center'><img src={logo} alt='logo'/></div>
            <h3 className='text-center '>Your Command:</h3>
            <br/>
            
            <Container>
            {Comm.map((c,i)=>{
              return <React.Fragment key={i}>              
                <div id={i} className='mr-5  border-end border-start border-danger rounded monCat shadow-lg container '>
                  <img src={c.imgurl} className="rounded-circle p-2 m-1 border"/>
                  <div >
                    <h3 className='pt-5 '>{c.nomPlat}</h3>
                    <h5 className='text-danger'>{c.prix}DH</h5>
                  </div>
                  <p className='right'><CloseIcon style={{ color: "#dc3545" }} fontSize="large" onClick={()=>{remove(c.nomPlat);}}/></p>
                </div>
                <br/>
              </React.Fragment>

            })}
            <h4>Totale: <b className='text-danger'>{tot}DH</b></h4>
            <div className='d-flex justify-content-between pb-2'>
               
               <div  className='d-flex' >
               <h5 >Select Payment Type:</h5>
               <Form.Check
                  inline
                  label="CACHE"
                  value="cache"
                  name="g1"
                  type='radio'
                  className='checkButt'
                  onChange={(e)=>setType(e.target.value)}
                  
              />
               <Form.Check
                  inline
                  label="PAYPALE"
                  value="paypal"
                  name="g1"
                  type='radio'
                  className='checkButt'
                  onChange={(e)=>setType(e.target.value)}
              />
               </div>
               
               <Button variant='danger' disabled={(tot==0 || payType==null)} onClick={confirm} >Confirm</Button>
            </div>
          </Container>

          
          
          <Modal show={show} align='center' size='lg'  >
          
              <Modal.Body >
                <h1>Your Command Accepted</h1><br/>
                <h3>Please wait </h3>
                <CheckCircleIcon  sx={{ fontSize: 200 }}/>
                <br/><br/><br/><br/>

              </Modal.Body>
              <Modal.Footer direction="row" align="center">
                <Button  variant='outline-success' onClick={location}><CloseIcon/>Close</Button>
                
              </Modal.Footer>
              
          </Modal>
          
          
          
          
        </div>
    </Container>
  )
}

export default Command