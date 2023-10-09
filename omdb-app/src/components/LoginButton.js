import { Button } from '@mui/material'
import React from 'react'

function LoginButton({onClick,text}) {
  return (
    <div><Button onClick={onClick} className='login-button' variant='contained' type='button'>{text}</Button></div>
  )
}

export default LoginButton