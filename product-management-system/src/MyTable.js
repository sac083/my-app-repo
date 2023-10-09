import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-bootstrap';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

function MyTable() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
      pName : "",
      pPrice : "",
      pDesc : ""

    })

    useEffect(() => {
     fetchApi();
    }, []);
    
    let fetchApi = async ()=>{
const res = await axios.get("https://p-9x7e.onrender.com/products/products")
const data = res.data.data;
setData(data);
return data;
    }
  return (
    <div> <TableContainer className='my-10' component={Paper}>
    <Table style={{gap :"1px"}} sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead  style={{backgroundColor : "#ffdab9",borderRadius :"5px"}}>
        <TableRow>
        <TableCell style={{borderRadius :"10px"}} align="center">Product ID</TableCell>
          <TableCell style={{borderRadius :"10px"}} align="center">Product Name</TableCell>
          <TableCell style={{borderRadius :"10px"}} align="center">Product Price</TableCell>
          <TableCell style={{borderRadius :"10px"}} align="center">Product Description</TableCell>
          <TableCell style={{borderRadius :"10px"}} align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody style={{backgroundColor : "#f0f8ff"}}>
        {data.map((element) => (
          <TableRow
            key={element._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell style={{borderRadius :"20px"}} align="center">{element._id}</TableCell>
            <TableCell style={{borderRadius :"20px"}} align="center">{element.pName}</TableCell>
            <TableCell style={{borderRadius :"20px"}} align="center">{element.pPrice}</TableCell>
            <TableCell style={{borderRadius :"20px"}} align="center">{element.pDesc}</TableCell>
            <TableCell style={{borderRadius :"20px"}} align="center"><EditProduct element = {element} fetchApi ={fetchApi}/><DeleteProduct id={element._id} fetchApi={fetchApi}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Button type='text' variant='contained' onClick={()=>{setOpen(true)}}>Add Products</Button>
  {open &&(
    <AddProduct 
    open = {open}
    setOpen = {setOpen}
    form = {form}
    setForm = {setForm}
    fetchApi = {fetchApi}
    error = {error}
    setError = {setError}/>
  )}
  </div>
  )
}

export default MyTable