import React, { useLayoutEffect, useRef, useState } from 'react'
import Navbars from './Navbars'
import QRCode from "qrcode.react";
import {Row,Col,Container,Button} from 'react-bootstrap'
import restaurantQr from './restaurantQR.png'
import { Navigate } from 'react-router-dom';


export default function QrTable() {
  const [data,setData]=useState(null);
  const [statu,setStatu]=useState(false);
  useLayoutEffect(()=>{
    if(sessionStorage.getItem('userData')){
      setData(JSON.parse(sessionStorage.getItem('userData')))
    }
    else {setStatu(true);}
  },[]
  )


  const qrRef=useRef("");
  const downloadQr=()=>{
  
    let canvas=qrRef.current.querySelector("canvas");
    let image=canvas.toDataURL("imag/png");
    let anchor=document.createElement("a");
    anchor.href=image;
    anchor.download="qr.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  
  return (
    <>
    {statu?<Navigate to='/'/> :
      <>
        <Navbars/>
        <div className='mt-3'>
          <Container>
            {data?
            <Row>
              {Array(data.nbrTable).fill().map((_,i)=>
                <Col lg={3} md={4} sm={6} key={`a${i}`}>
                <div className='border border-primary mb-2 border-3 shadow-lg' >
                  <div className='text-center p-1' ref={qrRef} >
                    <QRCode 
                      id={`qr${i}`}
                      value={`http://localhost:3000/rest${data.id}/tab${i+1}`} 
                      bgColor='white'
                      size={200}
                      fgColor='black'
                      level='L'
                      //imageSettings={{src:restaurantQr,excavate:true,width:500*0.1,height:500*0.1}}
                    />
                  </div>
                  <div className='text-center pb-1'><Button className=" shadow-lg" variant="primary" onClick={downloadQr}>Table{i+1}</Button></div>
                </div>
                </Col>
              )}
              
            </Row> : ""
          }
          </Container>
        </div>
      </>
       
    }
    </>
  )
}

