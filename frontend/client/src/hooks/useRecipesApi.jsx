import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesApi(ingredients) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (ingredients) {
      console.log("ingredients from ap", ingredients);

      const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=5be0c499db2a441086810136bbdeca6b&ingredients=${ingredients}&number=9`;
      axios.get(url).then((res) => {
        setRecipe(res.data);
        console.log(res);
      });
    }
  }, [ingredients]);

  return recipe;
}
