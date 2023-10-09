import { Box, Button, Fab, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
// import EditIcon from '@mui/icons-material/Edit';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from '@mui/system';
import axios from 'axios';
function EditProduct({element,fetchApi}) {

  const [openEdit, setOpenEdit] = useState(false);
  const [updateValue, setUpdateValue] = useState({element});

  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 4,
  };
      
  let editProductFunction = async()=>{
const res = await axios.put(`https://p-9x7e.onrender.com/products/edit-product/${element._id}`,updateValue)
setOpenEdit(false);
if(res.data.error){
  alert(res.data.message)
}
else{
  alert(res.data.message)
}
setOpenEdit(false);
fetchApi();
  }
  return (
    <div>
         <Modal
        open={openEdit}
        
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 390 }}>
        <Stack
            component="form"
            sx={{
              width: "45ch",
            }}
            spacing={2}
            noValidate
            autoComplete="off"
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter Product Name"
              variant="outlined"
              size="small"
              value={updateValue.pName}
              onChange={(e) => {
                setUpdateValue({ ...updateValue, pName: e.target.value });
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter Product Price"
              variant="outlined"
              size="small"
              value={updateValue.pPrice}
              onChange={(e) => {
                setUpdateValue({ ...updateValue, pPrice: e.target.value });
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter Product Description"
              variant="outlined"
              size="small"
              value={updateValue.pDesc}
              onChange={(e) => {
                setUpdateValue({ ...updateValue, pDesc: e.target.value });
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                // disabled={error}
                onClick={() => {
                  editProductFunction();
                }}
                variant="outlined"
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  setOpenEdit(false);
                }}
                
                variant="outlined"
              >
                Cancel
              </Button>
            </div>
            {/* {error && <p style={{ color: "red" }}>data required</p>} */}
          </Stack>
        </Box>
      </Modal>
        <div><Button onClick={()=>{setOpenEdit(true); setUpdateValue(element)}}
><EditIcon/></Button></div></div>
  )
}
export default EditProduct