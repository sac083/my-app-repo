import React, { useState } from 'react'
import LoginButton from './LoginButton'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { Button } from '@mui/material'

function RegisterSuccess() {
  const [userdata, setuserdata] = useState({
    email : "",
    password : ""
  })

  let handleChange =(e)=>{
const {name, value} = e.target;
setuserdata({...userdata, [name]:value})
  }
    let navigate=useNavigate()
    let takeToHome = ()=>{
      let emailLs = localStorage.getItem("email");
      let passwordLs = localStorage.getItem("password")
     if(userdata.email===emailLs && userdata.password===passwordLs){
navigate('/omdb')
     }
     else{
      alert("Entered Email and Password is not valid")
     }
    }

   let navigateToRegister = ()=>{
    navigate('/')
   }

  return (
    <div className='reg-con'>
       <h2>Login</h2>
        <Form className='lgn-form'>
          <div>
        <label className='form-label'>Email</label>
        <br/>
        <input className='lgn-input' name='email' value={userdata.email} onChange={handleChange} type='email' placeholder='Enter Email'/>
        <br/><br/>
        </div>
        <div>
        <label className='form-label'>Password</label>
        <br/>
        <input className='lgn-input' name='password' value={userdata.password} onChange={handleChange} type='password' placeholder='Password'/>
        <br/>
        <br/>
        </div>
        <div><Button type='submit' onClick={takeToHome} variant='contained'>Login</Button></div>
        </Form>
        <LoginButton onClick={navigateToRegister} text='Back' />
        </div>
  )
}

export default RegisterSuccess