import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeItem(props) {
  return (
    <div>
      <img src={props.image} alt={props.alt}></img>
     <Link to={`/recipes/${props.id}`}> <h1>{props.title}</h1> </Link>  
    </div>
  )
}
