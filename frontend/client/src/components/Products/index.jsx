import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

export default function Products(props) {
  const { products, setProducts } = props;
  const onSubmit = (formData) => {
    setProducts(formData);
  };

  //setProducts((prev) => ...prev, formData)

  return (
    <section>
      <ProductList products={products} />
      <ProductForm onSubmit={onSubmit} />
    </section>
  );
}
