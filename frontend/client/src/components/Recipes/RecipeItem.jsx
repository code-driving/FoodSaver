import React from 'react'

export default function RecipeItem(props) {
  return (
    <div>
      <img src={props.image} alt={props.alt}></img>
      <h1>{props.title}</h1>   
    </div>
  )
}
