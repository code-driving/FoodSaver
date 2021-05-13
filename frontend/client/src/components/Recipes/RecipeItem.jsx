import React from 'react'
import { Link } from 'react-router-dom'

import "./Recipes.scss";

export default function RecipeItem(props) {
  let missedIng=props.missedIngredients.map(ingredients=> (<li> {ingredients['name']}</li>))
  let usedIng=props.usedIngredients.map(ingredients=> (<li> {ingredients['name']}</li>))
  let unusedIng= props.unusedIngredients.map(ingredients=> (<li> {ingredients['name']}</li>))
  return (
    <div className='item'>
      <Link to={`/recipes/${props.id}`}>
      <img src={props.image} alt={props.alt} ></img>
      <h6>{props.title}</h6> </Link> 
     <hr/> 
     <ul> 
      {usedIng}
      {missedIng}
     </ul>
    </div>
  )
}
