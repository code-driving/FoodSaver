import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesApi(ingredients) {
  const [recipe, setRecipe] = useState(null);
  console.log("recipe from hook", recipe);

  useEffect(() => {
    if (ingredients) {
      console.log("ingredients from ap", ingredients);
      // const API_KEY = process.env.REACT_APP_API_KEY;
      const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${ingredients}&number=9`;
      axios.get(url).then((res) => {
        setRecipe(res.data);
        console.log(res);
      });
    }
  }, [ingredients]);

  return recipe;
}
