import { useState } from "react";
import Form from "./Form";
import useRecipeApi from "../../hooks/useRecipesApi";
import RecipesList from "./RecipeList";
import "./Recipes.scss";
import ScrollToTop from "../ScrollToTop/index"

export default function Recipes(props) {
  const { ingredientsItems, setIngredientsItems } = props;
  const recipeData = useRecipeApi(ingredientsItems);

  const onSubmit = (formData) => {
    setIngredientsItems(formData.ingredients);
  };

  return (
    <section className="container">
      <Form onSubmit={onSubmit} />
      {recipeData && <RecipesList recipeData={recipeData} />}
      <ScrollToTop />
    </section>
  );
}
