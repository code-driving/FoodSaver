import React from "react";
import FavouriteList from "./FavouriteList";

export default function index(props) {
  const { recipes, deleteRecipe } = props;
  console.log("recipes from index", recipes);
  return (
    <div>
      <section>
        {recipes && (
          <FavouriteList recipes={recipes} deleteRecipe={deleteRecipe} />
        )}
      </section>
    </div>
  );
}
