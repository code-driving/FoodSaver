import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

export default function Products(props) {
  const { products, setProduct } = props;
  const onSubmit = (formData) => {
    setProduct(formData);
  };

  return (
    <section>
      <ProductList products={products} />
      <ProductForm onSubmit={onSubmit} />
    </section>
  );
}
