import React from 'react'
import FavouriteItem from './FavouriteItem'

export default function FavouriteList(props) {
  const { recipes, deleteRecipe } = props;
  
  const favouriteRecipes = Array.isArray(recipes) && recipes.map((favourite) => <FavouriteItem key={favourite.title} {...favourite} deleteRecipe={deleteRecipe}/>)
  
  return (
    <div>
      {favouriteRecipes}
    </div>
)}
