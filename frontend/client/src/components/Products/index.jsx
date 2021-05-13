import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function Products(props) {
  const { products, setProduct, deleteProduct, setIngredientsItems } = props;
  const onSubmit = (formData) => {
    setProduct(formData);
  };

  return (
    <section>
      <ProductList
        products={products}
        deleteProduct={deleteProduct}
        numSelected={props.numSelected}
        setIngredientsItems={setIngredientsItems}
      />
      <ProductForm onSubmit={onSubmit} />
    </section>
  );
}
