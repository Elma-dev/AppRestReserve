import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Container, Row , Col, Form, Button,Modal ,Alert} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Navbars from './Navbars'
import {MdOutlinePostAdd} from 'react-icons/md'
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { EventRepeat } from '@mui/icons-material';
import axios from 'axios';
import { height } from '@mui/system';

export default function Menu() {
    const [statu,setStatu]=useState(false);
    const [data,setData]=useState(null);
    const [show,setShow]=useState(false);
    const [categoryName,setCategory]=useState(null);
    const [errormsg,setError]=useState(false);
    const [myMenu,setMenu]=useState(null);
    const [help,setHelp]=useState([])
    const [selectItems,setItems]=useState(null);
    const [modalShow,setMdShow]=useState(false);
    const [inputData,setInput]=useState({
        selectCateg:"",
        name:"",
        price:"",
        description:"",
        url:""

    });
    
    useLayoutEffect(()=>{
        if(sessionStorage.getItem('userData')){
            setData(JSON.parse(sessionStorage.getItem('userData')))
            let form=new FormData();
            form.append('id',(JSON.parse(sessionStorage.getItem('userData'))).id);
            axios.post("http://localhost/reactTest/mysite/src/component/api/client.php",form,{headers:{'Content-type':'multipart/form-data'}})
            .then(response=>response.data)
            .then(dt=>setMenu(dt));

            axios.post("http://localhost/reactTest/mysite/src/component/api/category.php",form,{headers:{'Content-type':'multipart/form-data'}})
            .then(response=>response.data)
            .then(category=>setItems(category));
        }else{
            setStatu(true);
        }
    },[])

    /*
    useEffect(()=>{
        if(sessionStorage.getItem('userData')){
            setData(JSON.parse(sessionStorage.getItem('userData')))
            let form=new FormData();
            form.append('id',(JSON.parse(sessionStorage.getItem('userData'))).id);
            

           axios.post("http://localhost/reactTest/mysite/src/component/api/category.php",form,{headers:{'Content-type':'multipart/form-data'}})
            .then(response=>response.data)
            .then(category=>setItems(category));
        }
    },[])*/

    const addCategorie=()=>{
        setShow(true);
        setCategory(null);
    }
    const handleClose = () => setShow(false);
    const handleClose2 = () => setMdShow(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputData.selectCateg==""|| inputData.name=="" ||inputData.price==""||inputData.description==""||inputData.url==""){
            setError(true);
        }
        else{
            let form=new FormData();
            form.append("nomCat",inputData.selectCateg);
            form.append("nomPlat",inputData.name);
            form.append("prix",inputData.price);
            form.append("description",inputData.description);
            form.append("url",inputData.url);
            axios.post("http://localhost/ReactTest/mysite/src/component/api/category.php",form,{headers:{'Content-type':'multipart/form-data'}})
            .then(window.location.reload())

            
        }
    }
    const handleChange=(e)=>{
        let inputChange=inputData;
        inputChange[e.target.name]=e.target.value;
        console.log(inputChange);
        setInput(inputChange);
    }

    const newCategory=()=>{
        let form=new FormData();
        form.append('id',data.id);
        form.append('nameCat',categoryName);
        axios.post("http://localhost/ReactTest/mysite/src/component/api/menu.php",form,{headers:{'Content-type':'multipart/form-data'}})
        .then(window.location.reload())
    }
    const editPlat=(m)=>{
        setMdShow(true);
        setInput(m);
    }

    const edit=()=>{
        console.log(inputData);
        let form=new FormData();
        form.append("descr",inputData.descr); 
        form.append("idPlat",inputData.idPlat); 
        form.append("imgurl",inputData.imgurl); 
        form.append("nomCat",inputData.nomCat); 
        form.append("nomPlat",inputData.nomPlat); 
        form.append("prix",inputData.prix); 
        axios.post("http://localhost/ReactTest/mysite/src/component/api/editPlat.php",form,{headers:{'Content-type':'multipart/form-data'}})
        .then(window.location.reload())
    }
    const deletePlat=(m)=>{
        document.getElementById(m.idPlat).remove();
        let form=new FormData();
        form.append("idPlat",m.idPlat);
        axios.post("http://localhost/ReactTest/mysite/src/component/api/category.php",form,{headers:{'Content-type':'multipart/form-data'}})
        
    }

    
  return (
      <>
      {statu? <Navigate to='/' /> :
        <>
            <Navbars/>
            <Container>
                <Row className='mt-2'>
                    <Col className="border shadow-lg m-1">
                        <Form className='p-2' onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label ><h5>Category</h5></Form.Label>
                                <div className='d-flex '>
                                <select name="selectCateg" defaultValue={'DEFAULT'}  className="form-select" onChange={(e)=>handleChange(e)}>
                                
                                <option value={'DEFAULT'} disabled  hidden>Select Category</option>
                                {selectItems==null?<></> :selectItems.map((m)=>{
                                    
                                        return(
                                            <option key={m.nomCat} value={m.nomCat}>{m.nomCat}</option>
                                        )
                                    
                                })}
                                </select>
                                
                                <Button variant="" onClick={addCategorie}><AddCircleOutlineIcon fontSize='medium' style={{ color: "mediumpurple" }}/></Button>
                                </div>
                                
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><h5>
                                    Name </h5>
                                </Form.Label>
                                <Form.Control name="name" type='text' placeholder='Enter Name' onChange={(e)=>handleChange(e)}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><h5>
                                    Price </h5>
                                </Form.Label>
                                <Form.Control name="price" type='number' placeholder='0 DH'  onChange={(e)=>handleChange(e)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><h5>
                                    Description </h5>
                                </Form.Label>
                                <Form.Control name="description" as='textarea' placeholder="Enter Your Description" minLength={100}  onChange={(e)=>handleChange(e)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><h5>
                                    Image Url </h5>
                                </Form.Label>
                                <Form.Control name="url" id="basic-url" placeholder="https://example.com" onChange={(e)=>handleChange(e)} >
                                </Form.Control> 
                            </Form.Group>
                            <div className='d-grid'><Button type="submit"  >+ADD</Button></div>
                        </Form>
                        {errormsg?
                            <Alert variant="danger">
                            <Alert.Heading>One Of The Input is Invalide! </Alert.Heading>
                            <p>
                                Please Correct The Following List:
                                 <li>
                                     all input most be full.
                                 </li>
                                 <li>
                                    Number of characters in the description entry (minimum 100)
                                 </li>
                            </p>
                            </Alert>
                        :<></>}
                        
                    </Col>

                    <Col className=" m-1">
                        <div> 
                            {myMenu==null|| selectItems==null?<></>:
                                (myMenu.map((m)=>{
                                    if(!help.includes(m.nomCat)){
                                        help.push(m.nomCat);
                                        return (
                                        <React.Fragment key={m.nomPlat}>
                                            <h4>{m.nomCat.toUpperCase()}</h4>
                                            <div id={m.idPlat} className=' border-end border-bottom border-primary rounded  shadow-lg container  p-0' style={{display:"flex" , marginLeft:"0px"}}>
                                                <img src={m.imgurl} className="" style={{width:"270px" ,height:"135px"}}/>
                                                <div className='p-1' >
                                                    <h3 className='pt-5 '>{(m.nomPlat).substr(0,14)}</h3>
                                                    <h5 className='text-danger'>{m.prix}DH</h5>
                                                </div>
                                                <p className='right'>
                                                    <Button variant="" onClick={()=>editPlat(m)}><EditIcon style={{ color: "mediumpurple" }} fontSize="medium" /></Button>
                                                    <Button variant="" onClick={()=>deletePlat(m)}><CloseIcon style={{ color: "mediumpurple" }} fontSize="medium"  /></Button>
                                                
                                                </p>
                                            </div>
                                            <br/>
                                            </React.Fragment>)
                                    }
                                    else
                                        return(
                                                <React.Fragment key={m.nomPlat}>
                                                <div id={m.idPlat}  className=' border-end border-bottom border-primary rounded  shadow-lg container p-0 ' style={{display:"flex" , marginLeft:"0px"}}>
                                                        <img src={m.imgurl} className="" style={{width:"270px",height:"135px"}}/>
                                                        <div className='p-1' >
                                                            <h3 className='pt-5 '>{(m.nomPlat).substr(0,14)}</h3>
                                                            <h5 className='text-danger'>{m.prix}DH</h5>
                                                        </div>
                                                        <p className='right'>
                                                            <Button variant="" onClick={()=>editPlat(m)}><EditIcon style={{ color: "mediumpurple" }} fontSize="medium" /></Button>
                                                            <Button variant="" onClick={()=>deletePlat(m)}><CloseIcon style={{ color: "mediumpurple" }} fontSize="medium" /></Button>
                                                        
                                                        </p>
                                                </div>
                                                <br/>
                                                </React.Fragment>
                                            )

                                    
                                
                                
                                
                                }
                                    
                                
                                ))
                            
                            }

                            
                        </div>
                        
                    
                    
                    
                    </Col>
                </Row>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header >
                    <Modal.Title>Add New Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label><h5>Name</h5></Form.Label>
                            <Form.Control type='text' placeholder='Enter Name of Category' onChange={(e)=>{setCategory(e.target.value)}}></Form.Control>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={newCategory} disabled={categoryName==null||categoryName.length<=3?true:false}>+ADD</Button>
                    </Modal.Footer>
                </Modal>
                
                <Modal
                    show={modalShow}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header >
                    <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                                <Form.Label>
                                    <h5>Name</h5>
                                </Form.Label>
                                <Form.Control defaultValue={inputData.nomPlat} name="nomPlat" type='text' placeholder='Enter Name' onChange={(e)=>handleChange(e)}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <h5>Price </h5>
                                </Form.Label>
                                <Form.Control defaultValue={inputData.prix} name="prix" type='number' placeholder='0 DH'  onChange={(e)=>handleChange(e)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <h5>Description </h5>
                                </Form.Label>
                                <Form.Control defaultValue={inputData.descr}  name="descr" as='textarea' placeholder="Enter Your Description" minLength={100}  onChange={(e)=>handleChange(e)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <h5>Image Url </h5>
                                </Form.Label>
                                <Form.Control defaultValue={inputData.imgurl} name="imgurl" id="basic-url" placeholder="https://example.com" onChange={(e)=>handleChange(e)} >
                                </Form.Control> 
                            </Form.Group>
                            
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                                Close
                    </Button>
                    <Button variant="primary" onClick={edit}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    
      }
    </>
    
  )
}
