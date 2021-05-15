import { useState, Fragment, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Favourite from './Favourite.scss'
=======
import { Link } from "react-router-dom";
>>>>>>> main

export default function FavouriteItem(props) {
  const { recipes, deleteRecipe } = props;

  return (
    <>
<<<<<<< HEAD
      <Link to={`/recipes/${props.recipe_id}`}><ul style={{color: 'orange', margin: '1.5rem 0 1.5rem', fontSize: '1.4rem'}}>{props.recipie_name}</ul>
      
      <img className="favourite_detail" src={props.imagesrc} alt={"food image"}></img>
      </Link>
      <button style={{marginTop: '1.5rem'}} onClick={() => deleteRecipe(props.recipe_id)}>delete</button>
=======
      <h1>Recipe Details</h1>
      <Link to={`/recipes/${props.recipe_id}`}>
        <ul>{props.recipie_name}</ul>
        <img src={props.imagesrc} alt={"food image"} class="recipe-image"></img>
      </Link>
      <button onClick={() => deleteRecipe(props.recipe_id)}>del</button>
>>>>>>> main
    </>
  );
}
