import React from 'react';
import {Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core';
import ProductForm from "./modalForm";
import "./ProductForm.scss"


export default function Popup(props) {
 
  const {title, openPopUp, setopenPopUp, selectedName} = props

  const onSubmit = (formData) => {
    // setProduct(formData);
  };

  return (
    <Dialog open={openPopUp} maxWidth="md">
      <DialogTitle >
        <div className="modalTop">
          <div style ={{flexGrow:1}} >Edit or Consume {selectedName[0]}</div>
          <Button onClick={() => {setopenPopUp(false)}} variant="contained" color="secondary">
            X
          </Button>
        </div>
      </DialogTitle>
      <div className='modalMiddle'>
      <DialogContent dividers>
        <ProductForm onSubmit={onSubmit} />
      </DialogContent>
      </div>
      <div className="modalBottom">
        <Button variant="contained" color="secondary">Edit Ingredient</Button>
        <div className="modalBottom1">
        <Button  variant="contained" color="secondary" >Use Ingredient</Button>
        </div>
    </div>
    </Dialog>
  );
}