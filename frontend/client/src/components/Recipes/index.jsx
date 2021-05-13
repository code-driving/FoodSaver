import { useState } from "react";
import Form from "./Form";
import useRecipeApi from "../../hooks/useRecipesApi";
import RecipesList from "./RecipeList";
import "./Recipes.scss";

//this is the component responsible for handling data (recipes) received from api call. Create a useRecipeData hook to fetch the data (axios request)
//we will need onSubmit as a prop to handle recipe submit event. This could be a button in RecipeList

export default function Recipes(props) {
  // const [ ingredientsItems, setIngredientsItems ] = useState("")
  const { ingredientsItems, setIngredientsItems } = props;
  const recipeData = useRecipeApi(ingredientsItems);

  const onSubmit = (formData) => {
    setIngredientsItems(formData.ingredients);
  };

  return (
    <section className="container">
      <Form onSubmit={onSubmit} />
      {recipeData && <RecipesList recipeData={recipeData} />}
    </section>
  );
}
