import React, { Fragment, useEffect } from "react";


// in this component we will ma over our props.products and will render ProductItem component

//we will use Sorting & Selecting table from Material-ui
//we will be using Button from material-ui
//When we click on the checkbox we can:

    //1.delete the item 
    //2.or search for recipes . We need to add SEARCH RECIPE button 

//onDelete, onSubmit

export default function ProductList(props) {
  
  const { products } = props
  //map over products here, check if this is an Array

  return (
    <div>Material ui table</div>
    //button
  )
}
