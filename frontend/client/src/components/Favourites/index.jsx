import React from "react";
import FavouriteList from "./FavouriteList";
import ScrollToTop from "../ScrollToTop/index"

export default function index(props) {
  const { recipes, deleteRecipe } = props;

  return (
    <div>
      <section>
        {recipes && (
          <FavouriteList recipes={recipes} deleteRecipe={deleteRecipe} />
        )}
        <ScrollToTop />
      </section>
    </div>
  );
}
