import React from 'react';
import {Dialog, DialogTitle, DialogContent, Button} from '@material-ui/core';
import ProductForm from "./ProductForm";


export default function Popup(props) {
 
  const {title, children,openPopUp,setopenPopUp} = props

  const onSubmit = (formData) => {
    // setProduct(formData);
  };
  return (
    <Dialog open={openPopUp} maxWidth="md">
      <DialogTitle>
        <div style ={{display: 'flex'}}>
          <div style ={{flexGrow:1}} >Enter new values to edit</div>
          <Button onClick={() => {setopenPopUp(false)}} variant="contained" color="secondary">
            X
          </Button>
        </div>
      </DialogTitle>
      
      <DialogContent>
        <ProductForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}