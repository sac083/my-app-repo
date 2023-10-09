import { IconButton, Stack } from '@mui/material'
import axios from 'axios'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteProduct(props) {
 
    let deleteApi = async ()=>{
        const result = await axios.delete(`https://p-9x7e.onrender.com/products/delete-product/${props.id}`)
        if(result.data.error){
alert(result.data.message)
        }
        else{
          alert(result.data.message)
        }
        console.log(result)
        props.fetchApi();
      }
      
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete" onClick={() =>{deleteApi()
      }}>
        <DeleteIcon />
      </IconButton></Stack>
  )
}

export default DeleteProduct