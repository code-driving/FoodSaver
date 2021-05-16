import React from 'react';
import {Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core';
import ProductForm from "./modalForm";
import "./ProductForm.scss"


export default function Popup(props) {
 
  const {title, openPopUp, setopenPopUp, selectedName, EditProduct, EditSummary ,selected} = props
  let product_id = selected[0]


  const onSubmitEdit = (formData) => {
    EditProduct(formData);
  };

  const onSubmitconsume = (formData) => {
    EditSummary(formData);
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
        <ProductForm  product_id ={product_id} onSubmitEdit={onSubmitEdit}  onSubmitconsume={onSubmitconsume}/>
      </DialogContent>
      </div>
    </Dialog>
  );
}