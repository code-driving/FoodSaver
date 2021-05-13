import React from 'react'
import RecipeListItem from './RecipeItem'

import "./Recipes.scss";

export default function RecipeList(props) {
  let allRecipes = props.recipeData.map(recipe => <RecipeListItem key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} alt ={"image of dish"}
      missedIngredients={recipe.missedIngredients} usedIngredients={recipe.usedIngredients} unusedIngredients={recipe.unusedIngredients}/>)  
  
  return (
    <div className='list'>
      {allRecipes}
    </div>
  )
}
