import { useState } from 'react'
import RecipeList from './RecipeList'

//this is the component responsible for handling data (recipes) received from api call. Create a useRecipeData hook to fetch the data (axios request)
//we will need onSubmit as a prop to handle recipe submit event. This could be a button in RecipeList

export default function Recipes(props) {
  //const { product, setProduct } = props
  //const { recipeData, setRecipeData } = useRecipeData(product)
  
  // onSubmit = (formData) => {
  //   setProduct(formData.product)
  //   setRecipeData(formData.product)
  // }
  
  //setProduct((prev) => ... prev, formData.product)
  // setRecipeData((prev) => ...formData.product)
  return (
    <section>
    hello from Recipes
      {/* <RecipeList product={product} recipeData={recipeData} onSubmit={onSubmit} /> */}
    </section>
  )
}