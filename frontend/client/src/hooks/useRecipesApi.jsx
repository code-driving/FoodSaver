import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesApi(ingredients) {
  const [recipe, setRecipe] = useState(null);
  console.log("recipe from hook", recipe);

  useEffect(() => {
    if (ingredients) {
      console.log("ingredients from ap", ingredients);

      const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=&ingredients=${ingredients}&number=9`;
      axios.get(url).then((res) => {
        setRecipe(res.data);
        console.log(res);
      });
    }
  }, [ingredients]);

  return recipe;
}
