import { React, Fragment } from "react";
import FavouriteItem from "./FavouriteItem";

export default function FavouriteList(props) {
  const { recipes, deleteRecipe } = props;
  const favouriteRecipes =
    Array.isArray(recipes) &&
    recipes.map((favourite, index) => (
      <FavouriteItem key={index} {...favourite} deleteRecipe={deleteRecipe} />
    ));

  return (
    <Fragment>
      <h1>My Favourite Recipes</h1>
      <div className="fav-list">{favouriteRecipes}</div>
    </Fragment>
  );
}
