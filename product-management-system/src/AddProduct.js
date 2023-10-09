import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

function AddProduct({
  open,
  setOpen,
  form,
  setForm,
  fetchApi,
  error,
  setError,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  let addProductFunction = async () => {
    let res = await axios.post(
      "https://p-9x7e.onrender.com/products/add-product",form);
    console.log(res);
    if (res.data.error) {
      alert(res.data.message);
    } else {
      alert(res.data.message);
    }
    setOpen(false);
    fetchApi();
  };

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
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
              onChange={(e) => {
                setForm({ ...form, pName: e.target.value });
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter Product Price"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setForm({ ...form, pPrice: e.target.value });
              }}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter Product Description"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setForm({ ...form, pDesc: e.target.value });
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                disabled={error}
                onClick={() => {
                  addProductFunction();
                }}
                variant="outlined"
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                
                variant="outlined"
              >
                Cancel
              </Button>
            </div>
            {error && <p style={{ color: "red" }}>data required</p>}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProduct;
