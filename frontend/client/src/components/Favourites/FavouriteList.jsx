import React from "react";
import FavouriteItem from "./FavouriteItem";

export default function FavouriteList(props) {
  const { recipes, deleteRecipe } = props;
  console.log("recipes from fav list -->", recipes);
  const favouriteRecipes =
    Array.isArray(recipes) &&
    recipes.map((favourite, index) => (
      <FavouriteItem key={index} {...favourite} deleteRecipe={deleteRecipe} />
    ));

  return <div>{favouriteRecipes}</div>;
}
