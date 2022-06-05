import React, { useLayoutEffect, useState } from 'react'
import { Container,Card,Button,Row,Col} from 'react-bootstrap'
import logo from './iconRest.png'
import './client.css'
import burger from './burger.jpg'
import {Link, useParams} from 'react-router-dom'
import add from './add.png'
import order from './order.png'
import axios from 'axios'



function Client() {
  const [counter,setCount]=useState(0);
  const data=useParams();
  const [menu,setMenu]=useState(null);
  const [myCom,setmyCom]=useState([])
  
  const command=(e)=>{
    setCount(counter+1)
    myCom.push(e);
  }
  
  useLayoutEffect(()=>{
    let form=new FormData();
    form.append('id',data.r);
    axios.post("http://localhost/reactTest/mysite/src/component/api/client.php",form,{headers:{'Content-type':'multipart/form-data'}})
    .then(Response=>Response.data)
    .then(respData=>setMenu(respData))
  },[])

  
  let catego=[];
  

  
  return (
    <>{counter?<div className='fixed-top '>
      
      <Link to='/command' state={{data,myCom}} ><img className='rounded-circle bg-danger  m-2 cell' src={order}/></Link>
      <span className="position-absolute top-0  translate-middle badge rounded-pill bg-success mt-3">{counter}</span>
    </div>:<></>}
    
    <Container>
      <div className='m-2 rounded shadow-lg text-center text-white header ' >
        <div className='p-2'>
          <div><img src={logo} alt='logo'/></div>
          <h1 >Restaurant Fadwa</h1>
          <div><h3>- MENU -</h3></div>
        </div>
      </div>
      
      <div className='mt-4' >
        {menu?
          <Row >
            
            {menu.map((e,i)=>{
                if(!catego.includes(e.nomCat)){
                  catego.push(e.nomCat)
                  return (
                    <React.Fragment key={i}>
                      
                      <h3 className='pt-3' key={e.nomCat}>#{e.nomCat}</h3>
                      <Col lg={3} md={6} sm={12} className='mb-1 ' key={e.nomPlat} >
                        <Card style={{ width: '19rem', borderBottom:'1px red solid'}}>
                        <Card.Img variant="top" src={e.imgurl} style={{height:'159px',width:'100%'}} />
                          <Card.Body >
                            <Card.Title>{e.nomPlat}</Card.Title>
                            <Card.Text >
                              {e.descr.length<100?(e.descr.slice(0,e.descr.length))+(' '.repeat(100-e.descr.length)):e.descr.slice(0,100)}
                            </Card.Text>
                            
                            <div className='text-end'><h6 className='text-start text-danger'>{e.prix}DH</h6><Link to="" onClick={()=>command(e)}><img src={add} alt='img'/></Link></div>
                            
                            
                          </Card.Body>
                        </Card>
                      </Col>
                    </React.Fragment>)
                }
                else{
                  return (
                  <Col lg={3} md={6} sm={12} className='mb-1 ' key={e.nomPlat} >
                    <Card style={{ width: '19rem', borderBottom:'1px red solid'}}>
                    <Card.Img variant="top" src={e.imgurl} style={{height:'159px',width:'100%'}} />
                      <Card.Body >
                        <Card.Title>{e.nomPlat}</Card.Title>
                        <Card.Text >
                          {e.descr.length<100?(e.descr.slice(0,e.descr.length))+(' '.repeat(100-e.descr.length)):e.descr.slice(0,100)}
                        </Card.Text>
                        
                        <div className='text-end'><h6 className='text-start text-danger'>{e.prix}DH</h6><Link to="" onClick={()=>command(e)}><img src={add} alt='img'/></Link></div>
                        
                        
                      </Card.Body>
                    </Card>
                  </Col>
                  )
                }
                }
            )
            }
            
          
            

          </Row>
        :<></>  
        }
      </div>

    </Container>
    </>
    
  )
}

export default Client