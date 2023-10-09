import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';

function Login() {
  let initialData ={
    name : "",
    email : "",
    password : "",
    number : ""
}
  const [formData, setformData] = useState(initialData)
  const [error, seterror] = useState(
    {
      name : "",
      email : "",
      password : "",
      number : ""
  }
  )

  let navigate = useNavigate();

  let handleInputChange = (e)=>{
const {name, value} = e.target;

setformData({...formData, [name] : value})
seterror({ ...error, [name]: "" });
console.log(value)
  }

  let validateFunction =(e)=>{
e.preventDefault()
let updateErrors = {...error}
let err =false;
if(formData.name.trim()===''){
updateErrors.name = 'Name is required'
err=true
}
else{
  updateErrors.name=''
}

if(!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
  updateErrors.email='Email is not valid'
  err=true
}
else{
  updateErrors.email=''
}
if(formData.password.length<8){
  updateErrors.password='Password minimum length should be 8'
  err=true
}
else{
  updateErrors.password=''
}
if(formData.number.length===10){
  updateErrors.number=''
}
else{
  updateErrors.number='Enter valid phone number'
  err=true
}
seterror(updateErrors)
if(err===false){
console.log(formData)
localStorage.setItem("name",formData.name)
localStorage.setItem("email",formData.email)
localStorage.setItem("password",formData.password)
localStorage.setItem("number",formData.number)

navigate('/registerSuccess')
}
}
  
  return (
    <div className='container'>
      <div className='login-button-div'><LoginButton onClick={validateFunction} text='Login'/></div>
      <div>
         <Form onSubmit={validateFunction} className='form'>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label><br/>
        <Form.Control name='name' className='input-field' type="text" value={formData.name} onChange={handleInputChange} placeholder="Enter Name" />
  
      </Form.Group>
      <div className='error'>{error.name}</div><br/>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label><br/>
        <Form.Control name='email' className='input-field' type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" />
        
      </Form.Group>
      <div className='error'>{error.email}</div><br/>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label><br/>
        <Form.Control name='password' className='input-field' type="password" onChange={handleInputChange} placeholder="Password" />
        
      </Form.Group>
       <div className='error'>{error.password}</div><br/>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Number</Form.Label><br/>
        <Form.Control name='number' size='10' className='input-field' type='number' value={formData.number} onChange={handleInputChange} placeholder="Mobile Number" />
        
      </Form.Group>
      <div className='error'>{error.number}</div><br/>

      <Button type='submit' variant="contained">Submit</Button>
    </Form>
    </div>
    </div>
  )
}

export default Login