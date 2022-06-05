import React, { useLayoutEffect } from 'react'
import { Col, Container, Row,Form,Button,Alert } from 'react-bootstrap'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import user from './user.png'
import image1 from './img1.svg'
import { useState,useRef,useEffect,useContext } from 'react'
import axios from 'axios';
import { Userinfo } from './context/Userinfo'
import { ReactSession } from 'react-client-session';


function Login() {

    const  [email,setEmail]=useState('');
    const [password,setPass]=useState('');
    const [success,setSuccess]=useState(false);
    const [statu,setStatu]=useState(false);
    const {User,setUser}=useContext(Userinfo);
    const [alert,setAlert]=useState(null);
    
    /*useLayoutEffect(()=>{
        if(sessionStorage.getItem('userData')){
        console.log("Mode loggin 2");
        }
        else {setStatu(true); console.log("true log")}
    },[])*/

    const handleSubmit=(e)=>{
        e.preventDefault();

        let formData=new FormData();
        formData.append('email',email)
        formData.append('password',password);
        axios.post('http://localhost/ReactTest/mysite/src/component/api/login.php',formData,{headers:{'Content-type':'multipart/form-data'}})
        .then(response=>{
            if(response.data.status) {
                setSuccess(true)
                sessionStorage.setItem('userData',JSON.stringify(response.data[0]))
                /*setUser(response.data[0]);*/
                
            }
            else {
                setSuccess(false);
                setAlert(
                    <Alert variant='danger' className='text-center mt-2'>
                        YOUR PASSWORD IS INCORRECT!!!
                    </Alert>
                )
            
            };
        }).catch(response=>console.log(response))  

    }

    

  return (
    <>
    {
        (success || sessionStorage.getItem('userData')) ?<Navigate to='/home'/>:
        <Container >
            {alert?alert:""}
            <Row>
                <Col lg={4} md={6} sm={12} className='mtop text-center'>
                    <img className="imguser mb-3 " src={user}/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value) } value={email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)} value={password} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='w-100'>
                            Login
                        </Button>
                        <div>
                            <small><NavLink to="/" style={{color:'black',textDecoration:'none'}}>Forgotten password?</NavLink></small>
                        </div>
                    </Form>   

                
                </Col>
                <Col lg={8} md={6} sm={12}>
                    <img className='w-100' src={image1}/>
                </Col>
            </Row>
        </Container>
    }
    </>    
  )
}

export default Login