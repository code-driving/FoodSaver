import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import ProductForm from "./modalForm";
import "./ProductForm.scss";

export default function Popup(props) {
  const {
    title,
    openPopUp,
    setopenPopUp,
    selectedName,
    EditProduct,
    EditSummary,
    selected,
    selectedItemDate,
    setOpenPopUp
  } = props;
  let product_id = selected[0];

  const onSubmitEdit = (formData) => {
    EditProduct(formData);
  };

  const onSubmitconsume = (formData) => {
    EditSummary(formData);
  };

  return (
    <Dialog open={openPopUp} maxWidth="md">
      <DialogTitle className="dialog">
        <div className="modalTop">
          <div className="popupHeading" style={{ flexGrow: 1 }}>
            Edit or Consume {selectedName[0]}
          </div>
          <Button
            onClick={() => {
              setopenPopUp(false);
            }}
            variant="contained"
            color="secondary"
          >
            X
          </Button>
        </div>
      </DialogTitle>
      <div className="modalMiddle">
        <DialogContent dividers>
          <ProductForm
            product_id={product_id}
            onSubmitEdit={onSubmitEdit}
            onSubmitconsume={onSubmitconsume}
            selectedName={selectedName}
            selectedItemDate={selectedItemDate}
            setOpenPopUp={setOpenPopUp}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
}
