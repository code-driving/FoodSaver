import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


export default function FavouriteItem(props) {
const { recipes, deleteRecipe } = props

  return (
    <>
      <h1>Recipe Details</h1>
      <Link to={`/recipes/${props.recipe_id}`}><ul>{props.recipie_name}</ul></Link>
      <button onClick={() => deleteRecipe(props.recipe_id)}>delete</button>
    </>
  )
}
