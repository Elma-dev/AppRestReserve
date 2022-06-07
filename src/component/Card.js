import { Elements,CardElement,useStripe,useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { Button } from 'bootstrap'
import { Modal } from 'bootstrap'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const CheckoutForm=()=>{
  const stripe=useStripe();
  const elements=useElements();
  const Data=useLocation().state;
  const [show,setShow]=useState(false);
  

  console.log(Data.prixTot);

  

  const handleSubmit=async(event)=>{
      event.preventDefault()
      const { error,paymentMethod}=await stripe.createPaymentMethod({
        type:'card',
        card:elements.getElement(CardElement)
      })

      if(!error){
        const {id}=paymentMethod;
        try{
          let form=new FormData();
          form.append('id',id);
          form.append('amount',Data.prixTot)
          const {data}= await axios.post("http://localhost/reactTest/mysite/src/component/api/charge.php",form,{headers:{'Content-type':'multipart/form-data'}})
          if(data=="Valide"){
            let form =new FormData();
            form.append('id',Data.id);
            form.append('table',Data.table);
            form.append('nbrPlat',Data.nbrPlat);
            form.append('prixTot',Data.prixTot);
            form.append('payType',Data.payType);
            form.append('nomPlats',Data.nomPlats);
            axios.post("http://localhost/reactTest/mysite/src/component/api/command.php",form,{headers:{'Content-type':'multipart/form-data'}})
            .then(resp=>resp.data)
            .then(data=>{ 
              if(data=='Success'){
                navigate(`/rest${Data.id}/tab${Data.table}`);
              }
            }
          )
          }
        }catch(error){
          console.log(error)
        }
      }
    }
    let navigate=useNavigate();
    
    

  return (
    <>
    <form onSubmit={handleSubmit} className='container my-5 shadow-lg p-3 mb-5 bg-body rounded border-success border-bottom' style={{maxWidth:'auto'}}>
      <div className='p-3'>
        <CardElement/>
        <br/>
        <div className='d-grid'>
          <button type="submit" className='btn btn-success btn-sm' disabled={!stripe}>{Data.prixTot}DH</button>
        </div>
      </div>
    </form>
    
    </>
  )
}


const stripePromise=loadStripe("pk_test_51L7LjPEchne8mksrRQaKeFYbVFe1GoNawHbeGKWFTmrcHWIqxpmjzNFZE8CJVTcpE9x2FHtlwiAod5lP8242yJQZ00yMvYiehB")


export default function Card() {

  return (
    <>
    <Container>
      <Elements stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
    </Container>
    
    </>

  )
}
