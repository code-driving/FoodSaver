import React, { Fragment, useEffect } from "react";
import ProductForm from "./ProductForm";

export default function ProductList(props) {
  return (
    <Fragment>
      <article>
        <ProductForm 
          name={props.name}
          onSubmit={onSubmit}
        />
      </article>
    </Fragment>
  )
}
