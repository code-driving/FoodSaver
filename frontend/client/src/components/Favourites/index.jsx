import React from "react";
import FavouriteList from "./FavouriteList";

export default function index(props) {
  const { recipes, deleteRecipe } = props;

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
