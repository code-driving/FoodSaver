import { useState } from "react";
import useRecipeDetails from "../../hooks/useRecipeDetails";

//this is the component responsible for handling data (recipes) received from api call. Create a useRecipeData hook to fetch the data (axios request)
//we will need onSubmit as a prop to handle recipe submit event. This could be a button in RecipeList

export default function RecipeDetail(props) {
  const [details, setDetails] = useState();
  let recipie_id = props.match.params.id;
  const recipeDetails = useRecipeDetails(recipie_id);
  console.log("aaaaaa", recipeDetails);

  return (
    <section>
      Details
      <h1>{recipeDetails && "hi"}</h1>
    </section>
  );
}
